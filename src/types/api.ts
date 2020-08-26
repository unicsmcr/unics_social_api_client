export enum APIAccountStatus {
	Unverified = 0,
	Verified = 1,
	Restricted = 2
}

export enum APIAccountType {
	User = 0,
	Admin = 1
}

export interface RegisterData {
	forename: string;
	surname: string;
	password: string;
	email: string;
}

export interface AuthenticateData {
	email: string;
	password: string;
}

export interface ProfileData {
	course?: string;
	yearOfStudy?: string;
	profilePicture?: string;
	instagram?: string;
	facebook?: string;
	twitter?: string;
}

export interface EventCreationData {
	title: string;
	startTime: string | Date;
	endTime: string | Date;
	description: string;
	external: string;
}

export type EventEditData = { id: string } & Partial<EventCreationData>;

export interface GetMessageData {
	channelID: string;
	messageID: string;
}

export interface APIAuthenticateResponse {
	token: string;
}

export interface APIUser {
	id: string;
	forename: string;
	surname: string;
	accountStatus: APIAccountStatus;
	accountType: APIAccountType;
	profile?: {
		course: string;
		yearOfStudy: number;
		profilePicture?: string;
		instagram?: string;
		facebook?: string;
		twitter?: string;
	};
}

export interface APIEvent {
	id: string;
	title: string;
	startTime: string;
	endTime: string;
	description: string;
	external: string;
	channelID: string;
}

export interface ProcessedAPIEvent {
	id: string;
	title: string;
	startTime: Date;
	endTime: Date;
	description: string;
	external: string;
	channelID: string;
}

export interface APIMessage {
	id: string;
	channelID: string;
	authorID: string;
	content: string;
	time: string;
}

export interface ProcessedAPIMessage {
	id: string;
	channelID: string;
	authorID: string;
	content: string;
	time: Date;
}

export interface APIChannel {
	id: string;
}

export interface APIEventChannel extends APIChannel {
	event: APIEvent;
	type: 'event';
}

export interface APIDMChannel extends APIChannel {
	users: string[];
	type: 'dm';
}
