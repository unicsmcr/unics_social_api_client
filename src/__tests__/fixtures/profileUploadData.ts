import { ProfileUploadData, Course, Year, APIAccountStatus, APIAccountType } from '../../types/api';
import FormData from 'form-data';

export const uploadData: ProfileUploadData[] = [
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
