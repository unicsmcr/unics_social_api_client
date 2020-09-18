import { ProfileUploadData, Course, Year, Visibility } from '../../types/api';

export const validUploadData: ProfileUploadData[] = [
	{
		avatar: false,
		course: Course.COMPUTER_SCIENCE,
		yearOfStudy: Year.ONE,
		instagram: 'doraemi12',
		facebook: 'thatjohndoe',
		twitter: 'undefined',
		linkedin: 'https://www.linkedin.com/in/john-doe',
		visibility: Visibility.Public
	},
	{
		avatar: false,
		course: Course.ARTIFICIAL_INTELLIGENCE,
		yearOfStudy: Year.MASTERS,
		instagram: 'bobross1234',
		facebook: 'undefined',
		twitter: 'bobobobo',
		linkedin: 'https://www.linkedin.com/in/bob-ross',
		visibility: Visibility.Public
	}
];

export const invalidInstagramHandles: ProfileUploadData[] = [
	{
		avatar: false,
		course: Course.COMPUTER_SCIENCE,
		yearOfStudy: Year.ONE,
		instagram: '!!!notvalid',
		facebook: 'thatjohndoe',
		twitter: 'undefined',
		visibility: Visibility.Public
	},
	{
		avatar: false,
		course: Course.ARTIFICIAL_INTELLIGENCE,
		yearOfStudy: Year.MASTERS,
		instagram: '..bob',
		facebook: 'undefined',
		twitter: 'bobobobo',
		visibility: Visibility.Public
	}
];

export const invalidFacebookHandles: ProfileUploadData[] = [
	{
		avatar: false,
		course: Course.COMPUTER_SCIENCE,
		yearOfStudy: Year.ONE,
		instagram: 'john2468',
		facebook: ':)',
		twitter: 'undefined',
		visibility: Visibility.Public
	},
	{
		avatar: false,
		course: Course.ARTIFICIAL_INTELLIGENCE,
		yearOfStudy: Year.MASTERS,
		instagram: 'bobross234',
		facebook: ':p_invalid',
		twitter: 'bobobobo',
		visibility: Visibility.Public
	}
];
