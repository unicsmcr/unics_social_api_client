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
            // instagram: string,
            // facebook: string,
            // twitter: string
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
            // instagram: string,
            // facebook: string,
            // twitter: string
        }
    }
];
