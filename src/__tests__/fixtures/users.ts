import { APIUser, Course, Year } from '../../types/api';
export const users: APIUser[] = [
	{
		id: '123456',
		forename: 'John',
		surname: 'Doe',
		accountStatus: 1,
		accountType: 0,
		profile: {
			course: Course.COMPUTER_SCIENCE,
			yearOfStudy: Year.ONE
		}
	},
	{
		id: '1a2b3c4d5e',
		forename: 'Bob',
		surname: 'Ross',
		accountStatus: 1,
		accountType: 0,
		profile: {
			course: Course.ARTIFICIAL_INTELLIGENCE,
			yearOfStudy: Year.MASTERS
		}
	}
];
