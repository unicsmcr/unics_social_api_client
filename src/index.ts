import { RegisterData, AuthenticateData, APIAuthenticateResponse, APIUser, APIEvent, EventCreationData, EventEditData, GetMessageData, APIMessage, APIDMChannel, ProfileUploadData, APIEventChannel, APIReport, ReportDataToCreate, APINote, NoteType } from './types/api';
import axios, { AxiosResponse } from 'axios';
import { GatewayClient } from './gateway';
import FormData from 'form-data';
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

	public destroy() {
		this.token = undefined;
		if (this.gateway) {
			this.gateway.destroy();
			this.gateway = undefined;
		}
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

	public verifyEmail(token: string) {
		return axios.get(`${this.apiBase}/verify`, {
			...this.baseConfig,
			headers: {
				...this.baseConfig.headers,
				Authorization: token
			}
		});
	}

	public async resendVerificationEmail(email: string): Promise<void> {
		await axios.post(`${this.apiBase}/resendVerificationEmail`, { email }, this.baseConfig);
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

	public async getPublicUsers(): Promise<APIUser[]> {
		const response: AxiosResponse<{users: APIUser[] }> = await axios.get(`${this.apiBase}/users`, this.baseConfig);
		return response.data.users;
	}

	public async getMe(): Promise<APIUser> {
		const response: AxiosResponse<{ user: APIUser }> = await axios.get(`${this.apiBase}/users/@me`, this.baseConfig);
		return response.data.user;
	}

	public async editProfile(data: ProfileUploadData): Promise<APIUser> {
		const formData = new FormData();
		const props: (keyof ProfileUploadData)[] = ['avatar', 'course', 'yearOfStudy', 'instagram', 'facebook', 'twitter', 'linkedin', 'visibility'];

		for (const key of props) {
			if (data.hasOwnProperty(key)) formData.append(key, (key === 'avatar' && typeof data[key] === 'boolean') ? String(data[key]) : data[key]);
		}

		/*
			In Node-land, formData.getBoundary is a defined function, and in browser this is undefined and not really required.
		*/
		const contentTypeExtra = (formData.getBoundary as any) ? ` boundary=${formData.getBoundary()}` : '';

		const response: AxiosResponse<{ user: APIUser }> = await axios.put(`${this.apiBase}/users/@me/profile`, formData, {
			...this.baseConfig,
			headers: {
				...this.baseConfig.headers,
				'Content-Type': `multipart/form-data;${contentTypeExtra}`
			}
		});
		return response.data.user;
	}

	public async forgotPassword(email: string): Promise<void> {
		await axios.post(`${this.apiBase}/forgot_password`, { email }, this.baseConfig);
	}

	public async resetPassword({ token, newPassword }: { token: string; newPassword: string }): Promise<void> {
		await axios.post(`${this.apiBase}/reset_password`, { password: newPassword }, {
			...this.baseConfig,
			headers: {
				...this.baseConfig.headers,
				Authorization: token
			}
		});
	}

	/*
		Event Routes
	*/

	public async getEvents(): Promise<APIEvent[]> {
		const response: AxiosResponse<{ events: APIEvent[] }> = await axios.get(`${this.apiBase}/users/@me/profile`, this.baseConfig);
		return response.data.events;
	}

	public async createEvent(data: EventCreationData): Promise<APIEvent> {
		if (data.startTime instanceof Date) data.startTime = data.startTime.toISOString();
		if (data.endTime instanceof Date) data.endTime = data.endTime.toISOString();
		const formData = new FormData();

		for (const [key, value] of Object.entries(data)) {
			formData.append(key, (key === 'image' && typeof value === 'boolean') ? String(value) : value);
		}

		/*
			In Node-land, formData.getBoundary is a defined function, and in browser this is undefined and not really required.
		*/
		const contentTypeExtra = (formData.getBoundary as any) ? ` boundary=${formData.getBoundary()}` : '';

		const response: AxiosResponse<{ event: APIEvent }> = await axios.post(`${this.apiBase}/events`, formData, {
			...this.baseConfig,
			headers: {
				...this.baseConfig.headers,
				'Content-Type': `multipart/form-data;${contentTypeExtra}`
			}
		});
		return response.data.event;
	}

	public async editEvent(data: EventEditData): Promise<APIEvent> {
		if (data.startTime instanceof Date) data.startTime = data.startTime.toISOString();
		if (data.endTime instanceof Date) data.startTime = data.endTime.toISOString();
		const formData = new FormData();

		for (const [key, value] of Object.entries(data)) {
			formData.append(key, (key === 'image' && typeof value === 'boolean') ? String(value) : value);
		}

		/*
			In Node-land, formData.getBoundary is a defined function, and in browser this is undefined and not really required.
		*/
		const contentTypeExtra = (formData.getBoundary as any) ? ` boundary=${formData.getBoundary()}` : '';

		const response: AxiosResponse<{ event: APIEvent }> = await axios.patch(`${this.apiBase}/events/${data.id}`, formData, {
			...this.baseConfig,
			headers: {
				...this.baseConfig.headers,
				'Content-Type': `multipart/form-data;${contentTypeExtra}`
			}
		});
		return response.data.event;
	}

	/*
		Channel Routes
	*/

	public async getChannels(): Promise<(APIDMChannel|APIEventChannel)[]> {
		const response: AxiosResponse<{ channels: (APIDMChannel|APIEventChannel)[] }> = await axios.get(`${this.apiBase}/channels`, this.baseConfig);
		return response.data.channels;
	}

	public async createDMChannel(userID: string): Promise<APIDMChannel> {
		const response: AxiosResponse<{ channel: APIDMChannel }> = await axios.post(`${this.apiBase}/users/${userID}/channel`, this.baseConfig);
		return response.data.channel;
	}

	/*
		Message Routes
	*/

	public async getMessage(data: GetMessageData): Promise<APIMessage> {
		const response: AxiosResponse<{ message: APIMessage }> = await axios.get(`${this.apiBase}/channels/${data.channelID}/messages/${data.messageID}`, this.baseConfig);
		return response.data.message;
	}

	public async getMessages({ channelID, before }: { channelID: string; before?: Date }): Promise<APIMessage[]> {
		const extra = before ? `?before=${before.toISOString()}` : '';
		const response: AxiosResponse<{ messages: APIMessage[] }> = await axios.get(`${this.apiBase}/channels/${channelID}/messages${extra}`, this.baseConfig);
		return response.data.messages;
	}

	public async createMessage(data: Pick<APIMessage, 'content' | 'channelID'>): Promise<APIMessage> {
		const response: AxiosResponse<{ message: APIMessage }> = await axios.post(`${this.apiBase}/channels/${data.channelID}/messages`, { content: data.content }, this.baseConfig);
		return response.data.message;
	}

	public async deleteMessage(data: GetMessageData): Promise<void> {
		await axios.delete(`${this.apiBase}/channels/${data.channelID}/messages/${data.messageID}`, this.baseConfig);
	}

	/* Report */
	public async reportUser(data: ReportDataToCreate): Promise<APIReport> {
		const response: AxiosResponse<{ report: APIReport }> = await axios.post(`${this.apiBase}/users/${data.reportedUserID}/report`, {
			description: data.description
		}, this.baseConfig);
		return response.data.report;
	}

	/* Discord */
	public async getDiscordOAuth2URL() {
		const response: AxiosResponse<{ url: string }> = await axios.get(`${this.apiBase}/users/@me/discord/authorize`, this.baseConfig);
		return response.data.url;
	}

	public async linkDiscordAccount({ code, state }: { code: string; state: string }) {
		await axios.post(`${this.apiBase}/users/@me/discord/link`, { code, state }, this.baseConfig);
	}

	/* Notes */
	public async getNotes(): Promise<APINote[]> {
		const response: AxiosResponse<{ notes: APINote[] }> = await axios.get(`${this.apiBase}/users/@me/notes`, this.baseConfig);
		return response.data.notes;
	}

	public async createNote(userID: string, noteType: NoteType): Promise<APINote> {
		const response: AxiosResponse<{ note: APINote }> = await axios.put(`${this.apiBase}/users/@me/notes/${userID}`, { noteType }, this.baseConfig);
		return response.data.note;
	}

	public async deleteNote(userID: string): Promise<void> {
		await axios.delete(`${this.apiBase}/users/@me/notes/${userID}`, this.baseConfig);
	}
}
