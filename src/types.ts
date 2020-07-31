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
