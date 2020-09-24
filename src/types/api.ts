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

export interface ProfileUploadData {
	course: Course;
	yearOfStudy: Year;
	avatar?: File|boolean;
	instagram?: string;
	facebook?: string;
	twitter?: string;
	linkedin?: string;
	visibility: Visibility;
}

export interface ProfileData {
	course: Course;
	yearOfStudy: Year;
	avatar?: string;
	instagram?: string;
	facebook?: string;
	twitter?: string;
	linkedin?: string;
	visibility: Visibility;
}

export enum Course {
	ARTIFICIAL_INTELLIGENCE = 'Artificial Intelligence',
	COMPUTER_SCIENCE_AND_MATHEMATICS = 'Computer Science and Mathematics',
	COMPUTER_SCIENCE = 'Computer Science',
	HUMAN_COMPUTER_INTERACTION = 'Human Computer Interaction',
	COMPUTER_SYSTEMS_ENGINEERING = 'Computer Systems Engineering',
	SOFTWARE_ENGINEERING = 'Software Engineering'
}

export enum Year {
	ONE = 'First Year',
	TWO = 'Second Year',
	THREE = 'Final Year Bachelors',
	FOUNDATION = 'Foundation Year',
	MASTERS = 'Masters Year',
	INDUSTRIAL = 'Industrial Year',
	PHD = 'PhD Student'
}

export enum Visibility {
	Private = 0,
	Public = 1
}

export interface EventCreationData {
	title: string;
	startTime: string | Date;
	endTime: string | Date;
	description: string;
	external: string;
	image?: File|boolean;
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
	profile?: ProfileData;
}

export interface APIPrivateUser extends APIUser {
	email: string;
}

export interface APIEvent {
	id: string;
	title: string;
	startTime: string;
	endTime: string;
	description: string;
	external: string;
	image: boolean;
	channelID: string;
}

export interface APIMessage {
	id: string;
	channelID: string;
	authorID: string;
	content: string;
	time: string;
}

export interface APIChannel {
	id: string;
	lastUpdated: string;
}

export interface APIEventChannel extends APIChannel {
	event: APIEvent;
	type: 'event';
}

export interface APIVideoIntegration {
	id: string;
	creationTime: string;
	endTime: string;
	users?: {
		id: string;
		accessToken: string;
	}[];
}

export interface APIDMChannel extends APIChannel {
	users: string[];
	type: 'dm';
	video?: APIVideoIntegration;
}

export interface APIReport {
	id: string;
	reportedUserID: string;
	reportingUserID: string;
	currentTime: string;
	description: string;
}

export type ReportDataToCreate = Omit<APIReport, 'reportingUserID' | 'id' | 'currentTime'>;
