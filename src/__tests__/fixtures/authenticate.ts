import { AuthenticateData } from '../../types/api';
export const validData: AuthenticateData[] = [
	{
		email: 'john.doe@student.manchester.ac.uk',
		password: 'john123'
	},
	{
		email: 'bob.ross@student.manchester.ac.uk',
		password: 'bob123'
	}
];

export const invalidData: AuthenticateData[] = [
	{
		email: 'wrong.entry@wrong.com',
		password: 'wrong123'
	}
];

export const token = 'eyJHbGci0eyJpZCI6IjBiNjQfPQ6l94-Py_tpKL';

