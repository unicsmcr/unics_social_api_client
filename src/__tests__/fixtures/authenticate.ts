import { AuthenticateData } from '../../types/api';
export const valid_data: AuthenticateData[] = [
	{
		email: 'john.doe@student.manchester.ac.uk',
		password: 'john123'
	},
	{
		email: 'bob.ross@student.manchester.ac.uk',
		password: 'bob123'
	}
];

export const invalid_data: AuthenticateData[] = [
	{
		email: 'wrong.entry@wrong.com',
		password: 'wrong123'
	}
];

