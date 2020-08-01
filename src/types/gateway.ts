import { APIMessage } from '.';

export enum GatewayPacketType {
	Identify = 'IDENTIFY',
	Hello = 'HELLO',
	MessageCreate = 'MESSAGE_CREATE',
	MessageDelete = 'MESSAGE_DELETE'
}

export interface GatewayPacket {
	type: GatewayPacketType;
	data?: string | Record<string, unknown>;
}

export interface IdentifyGatewayPacket extends GatewayPacket {
	type: GatewayPacketType.Identify;
	data: {
		token: string;
	};
}

export interface HelloGatewayPacket extends GatewayPacket {
	type: GatewayPacketType.Hello;
}

export interface MessageCreateGatewayPacket extends GatewayPacket {
	type: GatewayPacketType.MessageCreate;
	data: {
		message: APIMessage;
	};
}

export interface MessageDeleteGatewayPacket extends GatewayPacket {
	type: GatewayPacketType.MessageDelete;
	data: {
		messageID: string;
		channelID: string;
	};
}
