import { APIUser, Course, Year, APIAccountStatus, APIAccountType } from '../../types/api';
export const users: APIUser[] = [
	{
		id: '123456',
		forename: 'John',
		surname: 'Doe',
		accountStatus: APIAccountStatus.Verified,
		accountType: APIAccountType.User,
		profile: {
			course: Course.COMPUTER_SCIENCE,
			yearOfStudy: Year.ONE

		}
	},
	{
		id: '1a2b3c4d5e',
		forename: 'Bob',
		surname: 'Ross',
		accountStatus: APIAccountStatus.Verified,
		accountType: APIAccountType.User,
		profile: {
			course: Course.ARTIFICIAL_INTELLIGENCE,
			yearOfStudy: Year.MASTERS
		}
	}
];
