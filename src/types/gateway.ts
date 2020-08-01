export enum GatewayPacketType {
	Identify = 'IDENTIFY',
	Hello = 'HELLO'
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
