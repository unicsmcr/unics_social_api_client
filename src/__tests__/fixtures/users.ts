import { APIUser, Course, Year, APIAccountStatus, APIAccountType, Visibility } from '../../types/api';
export const users: APIUser[] = [
	{
		id: '123456',
		forename: 'John',
		surname: 'Doe',
		accountStatus: APIAccountStatus.Verified,
		accountType: APIAccountType.User,
		profile: {
			course: Course.COMPUTER_SCIENCE,
			yearOfStudy: Year.ONE,
			instagram: 'doraemi12',
			facebook: 'thatjohndoe',
			twitter: undefined,
			linkedin: 'https://www.linkedin.com/in/john-doe',
			visibility: Visibility.Public
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
			yearOfStudy: Year.MASTERS,
			instagram: 'bobross1234',
			facebook: undefined,
			twitter: 'bobobobo',
			linkedin: 'https://www.linkedin.com/in/bob-ross',
			visibility: Visibility.Public
		}
	}
];
