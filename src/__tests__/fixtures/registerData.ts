import { RegisterData } from '../../types/api';


export const validData: RegisterData[] = [
	{
		forename: 'John',
		password: 'password that is really long!',
		surname: 'Doe',
		email: 'testing1@student.manchester.ac.uk'
	},

	{
		forename: 'Bob',
		password: 'bob12345678',
		surname: 'Ross',
		email: 'bobross@student.manchester.ac.uk'
	}

];

export const invalidEmail: RegisterData[] = [
	{
		forename: 'Test',
		password: 'password that is really long!',
		surname: 'User',
		email: 'user123@student.wrongemail.ac.uk'
	},
	{
		forename: 'Jake',
		password: 'password that is really long!',
		surname: 'Peralta',
		email: 'testing1234@wrong.email.ac.uk'
	}
];

export const invalidPassword: RegisterData[] = [
	{
		forename: 'SpongeBoB',
		password: 'weak',
		surname: 'Squarepants',
		email: 'sea@student.manchester.ac.uk'
	},
	{
		forename: 'jack',
		password: 'smol!',
		surname: 'Sparrow',
		email: 'kraken@student.manchester.ac.uk'
	}
];
