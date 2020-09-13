import NodeWebSocket from 'ws';
import { APIClient } from '.';
import { EventEmitter } from 'events';
import { GatewayPacket, IdentifyGatewayPacket, GatewayPacketType, JoinDiscoveryQueuePacket, QueueOptions, LeaveDiscoveryQueuePacket, PongGatewayPacket, ClientTypingPacket } from './types/gateway';

const isBrowser = Boolean(typeof window !== 'undefined' && window.WebSocket);

enum State {
	Destroyed,
	Active
}

export class GatewayClient extends EventEmitter {
	private ws!: WebSocket | NodeWebSocket;
	private readonly apiClient: APIClient;
	private readonly useWss: boolean;
	private _inDiscoveryQueue: boolean;
	private lifetimeState: State;
	private connectTimeout?: NodeJS.Timeout;

	public constructor(apiClient: APIClient, useWss = false) {
		super();
		this.apiClient = apiClient;
		this.useWss = useWss;
		this._inDiscoveryQueue = false;
		this.lifetimeState = State.Active;
		this.connect();

		this.on(GatewayPacketType.Ping, () => {
			this.send<PongGatewayPacket>({
				type: GatewayPacketType.Pong,
				data: {
					timestamp: Date.now()
				}
			}).catch(err => this.emit('error', err));
		});
	}

	public destroy() {
		this.lifetimeState = State.Destroyed;
		if (this.connectTimeout) clearTimeout(this.connectTimeout);
		this.ws.close();
	}

	public get status() {
		return this.ws.readyState;
	}

	public get inDiscoveryQueue() {
		return this.status === this.ws.OPEN && this._inDiscoveryQueue;
	}

	public async joinDiscoveryQueue(options: QueueOptions) {
		await this.send<JoinDiscoveryQueuePacket>(
			{
				type: GatewayPacketType.JoinDiscoveryQueue,
				data: {
					options
				}
			}
		);
		this._inDiscoveryQueue = true;
	}

	public async leaveDiscoveryQueue() {
		await this.send<LeaveDiscoveryQueuePacket>(
			{
				type: GatewayPacketType.LeaveDiscoveryQueue
			}
		);
	}

	public async sendTypingPacket(channelID: string) {
		await this.send<ClientTypingPacket>(
			{
				type: GatewayPacketType.ClientTyping,
				data: {
					channelID
				}
			}
		);
	}

	private connect() {
		const WebSocketClass = isBrowser ? window.WebSocket : NodeWebSocket;
		this.ws = new WebSocketClass(`${this.useWss ? 'wss' : 'ws'}${this.apiClient.apiBase.replace(/^https?/, '')}/gateway`);
		this.ws.onopen = this.onOpen.bind(this);
		this.ws.onmessage = this.onMessage.bind(this);
		this.ws.onclose = this.onClose.bind(this);
	}

	private async send<T extends GatewayPacket>(packet: T) {
		return new Promise((resolve, reject) => {
			if (isBrowser) {
				this.ws.send(JSON.stringify(packet));
			} else {
				(this.ws as NodeWebSocket).send(JSON.stringify(packet), err => err ? reject(err) : resolve());
			}
		});
	}

	private onMessage(event: NodeWebSocket.MessageEvent) {
		if (typeof event.data !== 'string') {
			if (Buffer.isBuffer(event.data)) {
				event.data = event.data.toString();
			} else if (Array.isArray(event.data)) {
				event.data = Buffer.concat(event.data).toString();
			} else {
				this.emit('error', new Error('Received ArrayBuffer - unsupported'));
				return;
			}
		}
		try {
			const packet: GatewayPacket = JSON.parse(event.data);
			this.emit(packet.type, packet.data);
		} catch (error) {
			this.emit('error', error);
		}
	}

	private onClose(event: NodeWebSocket.CloseEvent) {
		if (this.lifetimeState === State.Destroyed) {
			/**
			 * Emitted when the client has disconnected and will not attempt to reconnect as the gateway has been marked
			 * as being destroyed. This only occurs when APIClient#destroy() is called.
			 * @event GatewayClient#destroyed
			 */
			this.emit('destroyed');
		} else {
			/**
			 * Emitted when the client will try to reconnect to the gateway (with a 3 second backoff)
			 * @event GatewayClient#reconnecting
			 */
			this.emit('reconnecting', event);
			this.connectTimeout = setTimeout(() => this.connect(), 3e3);
		}
	}

	private onOpen() {
		if (!this.apiClient.token) {
			this.emit('error', new Error('Token is not set!'));
			return;
		}
		this.send({
			type: GatewayPacketType.Identify,
			data: {
				token: this.apiClient.token
			}
		} as IdentifyGatewayPacket)
			.catch(error => this.emit('error', error));
	}
}
