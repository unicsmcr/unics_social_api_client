import { RegisterData, AuthenticateData, APIAuthenticateResponse, APIUser, ProfileData } from './types';
import axios, { AxiosResponse } from 'axios';

export class APIClient {
	private token?: string;
	private readonly apiBase: string;

	public constructor(data: { token?: string; apiBase: string }) {
		this.token = data.token;
		this.apiBase = data.apiBase;
	}

	public get isAuthorized() {
		return Boolean(this.token);
	}

	private get baseConfig() {
		return this.isAuthorized ? { headers: { Authorization: this.token } } : {};
	}

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
}
