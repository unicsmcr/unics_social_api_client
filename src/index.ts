import { RegisterData, AuthenticateData, APIAuthenticateResponse, APIUser, ProfileData, APIEvent, ProcessedAPIEvent, EventCreationData, EventEditData, GetMessageData, ProcessedAPIMessage, APIMessage } from './types/api';
import axios, { AxiosResponse } from 'axios';
import { GatewayClient } from './gateway';
export * from './types/';

export class APIClient {
	public token?: string;
	public readonly apiBase: string;
	public gateway?: GatewayClient;
	public readonly useWss: boolean;

	public constructor(data: { token?: string; apiBase: string; useWss?: boolean }) {
		this.token = data.token;
		this.apiBase = data.apiBase;
		this.useWss = data.useWss ?? false;
	}

	public get isAuthorized() {
		return Boolean(this.token);
	}

	private get baseConfig() {
		return this.isAuthorized ? { headers: { Authorization: this.token } } : {};
	}

	/*
		Gateway
	*/

	public initGateway(useWss = this.apiBase.startsWith('https')) {
		if (this.gateway) return;
		this.gateway = new GatewayClient(this, useWss);
	}

	/*
		User Routes
	*/

	public register(data: RegisterData) {
		return axios.post(`${this.apiBase}/register`, data, this.baseConfig);
	}

	public verifyEmail(confirmationId: string) {
		return axios.get(`${this.apiBase}/verify?confirmationId=${confirmationId}`, this.baseConfig);
	}

	public async authenticate(data: AuthenticateData) {
		const response: AxiosResponse<APIAuthenticateResponse> = await axios.post(`${this.apiBase}/authenticate`, data, this.baseConfig);
		this.token = response.data.token;
		return this.token;
	}

	public async getUser(id: string): Promise<APIUser> {
		const response: AxiosResponse<{ user: APIUser }> = await axios.get(`${this.apiBase}/users/${id}`, this.baseConfig);
		return response.data.user;
	}

	public getMe(): Promise<APIUser> {
		return this.getUser('@me');
	}

	public async editProfile(data: ProfileData): Promise<APIUser> {
		const response: AxiosResponse<{ user: APIUser }> = await axios.put(`${this.apiBase}/users/@me/profile`, data, this.baseConfig);
		return response.data.user;
	}

	/*
		Event Routes
	*/

	public async getEvents(): Promise<ProcessedAPIEvent[]> {
		const response: AxiosResponse<{ events: APIEvent[] }> = await axios.get(`${this.apiBase}/users/@me/profile`, this.baseConfig);
		return response.data.events.map(event => ({
			...event,
			startTime: new Date(event.startTime),
			endTime: new Date(event.endTime)
		}));
	}

	public async createEvent(data: EventCreationData): Promise<ProcessedAPIEvent> {
		if (data.startTime instanceof Date) data.startTime = data.startTime.toISOString();
		if (data.endTime instanceof Date) data.startTime = data.endTime.toISOString();

		const response: AxiosResponse<{ event: APIEvent }> = await axios.post(`${this.apiBase}/events`, data, this.baseConfig);
		return {
			...response.data.event,
			startTime: new Date(response.data.event.startTime),
			endTime: new Date(response.data.event.endTime)
		};
	}

	public async editEvent(data: EventEditData): Promise<ProcessedAPIEvent> {
		if (data.startTime instanceof Date) data.startTime = data.startTime.toISOString();
		if (data.endTime instanceof Date) data.startTime = data.endTime.toISOString();

		const response: AxiosResponse<{ event: APIEvent }> = await axios.patch(`${this.apiBase}/events/${data.id}`, data, this.baseConfig);
		return {
			...response.data.event,
			startTime: new Date(response.data.event.startTime),
			endTime: new Date(response.data.event.endTime)
		};
	}

	/*
		Message Routes
	*/

	public async getMessage(data: GetMessageData): Promise<ProcessedAPIMessage> {
		const response: AxiosResponse<{ message: APIMessage }> = await axios.get(`${this.apiBase}/channels/${data.channelID}/messages/${data.messageID}`, this.baseConfig);
		return {
			...response.data.message,
			time: new Date(response.data.message.time)
		};
	}

	public async getMessages(channelID: string): Promise<ProcessedAPIMessage[]> {
		const response: AxiosResponse<{ messages: APIMessage[] }> = await axios.get(`${this.apiBase}/channels/${channelID}`, this.baseConfig);
		return response.data.messages.map(message => ({
			...message,
			time: new Date(message.time)
		}));
	}

	public async createMessage(data: Pick<APIMessage, 'content' | 'channelID'>): Promise<ProcessedAPIMessage> {
		const response: AxiosResponse<{ message: APIMessage }> = await axios.post(`${this.apiBase}/channels/${data.channelID}/messages`, { content: data.content }, this.baseConfig);
		return {
			...response.data.message,
			time: new Date(response.data.message.time)
		};
	}

	public async deleteMessage(data: GetMessageData): Promise<void> {
		await axios.delete(`${this.apiBase}/channels/${data.channelID}/messages/${data.messageID}`, this.baseConfig);
	}
}
