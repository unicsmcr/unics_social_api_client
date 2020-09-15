import { ProfileUploadData, Course, Year } from '../../types/api';

export const validUploadData: ProfileUploadData[] = [
	{
		avatar: false,
		course: Course.COMPUTER_SCIENCE,
		yearOfStudy: Year.ONE,
		instagram: 'doraemi12',
		facebook: 'thatjohndoe',
		twitter: 'undefined'
	},
	{
		avatar: false,
		course: Course.ARTIFICIAL_INTELLIGENCE,
		yearOfStudy: Year.MASTERS,
		instagram: 'bobross1234',
		facebook: 'undefined',
		twitter: 'bobobobo'
	}
];

export const invalidInstagramHandles: ProfileUploadData[] = [
	{
		avatar: false,
		course: Course.COMPUTER_SCIENCE,
		yearOfStudy: Year.ONE,
		instagram: '!!!notvalid',
		facebook: 'thatjohndoe',
		twitter: 'undefined'
	},
	{
		avatar: false,
		course: Course.ARTIFICIAL_INTELLIGENCE,
		yearOfStudy: Year.MASTERS,
		instagram: '..bob',
		facebook: 'undefined',
		twitter: 'bobobobo'
	}
];

export const invalidFacebookHandles: ProfileUploadData[] = [
	{
		avatar: false,
		course: Course.COMPUTER_SCIENCE,
		yearOfStudy: Year.ONE,
		instagram: 'john2468',
		facebook: ':)',
		twitter: 'undefined'
	},
	{
		avatar: false,
		course: Course.ARTIFICIAL_INTELLIGENCE,
		yearOfStudy: Year.MASTERS,
		instagram: 'bobross234',
		facebook: ':p_invalid',
		twitter: 'bobobobo'
	}
];
