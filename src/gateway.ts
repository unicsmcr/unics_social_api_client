import WebSocket from 'ws';
import { APIClient } from '.';
import { EventEmitter } from 'events';
import { GatewayPacket, IdentifyGatewayPacket, GatewayPacketType } from './types/gateway';

export class GatewayClient extends EventEmitter {
	private ws!: WebSocket;
	private readonly apiClient: APIClient;
	private readonly useWss: boolean;

	public constructor(apiClient: APIClient, useWss = false) {
		super();
		this.apiClient = apiClient;
		this.useWss = useWss;
		this.connect();
	}

	public get status() {
		return this.ws.readyState;
	}

	private connect() {
		this.ws = new WebSocket(`${this.useWss ? 'wss' : 'ws'}//${this.apiClient.apiBase.replace(/^https?/, '')}/gateway`);
		this.ws.onopen = this.onOpen.bind(this);
		this.ws.onmessage = this.onMessage.bind(this);
		this.ws.onclose = this.onClose.bind(this);
	}

	private async send(packet: GatewayPacket) {
		return new Promise((resolve, reject) => {
			this.ws.send(JSON.stringify(packet), err => err ? reject(err) : resolve());
		});
	}

	private onMessage(event: WebSocket.MessageEvent) {
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

	private onClose(event: WebSocket.CloseEvent) {
		this.emit('reconnecting', event);
		this.connect();
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
