import { APIEvent, EventCreationData } from '../../types/api';
export const validEvents: APIEvent[] = [
	{
		id: '100',
		title: 'Corona Protest',
		startTime: 'September 9, 2020 20:00:00',
		endTime: 'September 9, 2020 22:00:00',
		description: 'Protesting Corona is the only way to stop its spread. Lets stand closer than 1m apart and protest!',
		external: '---',
		image: false,
		channelID: '10'
	},
	{
		id: '101',
		title: 'John Latham Appreciation Day',
		startTime: 'September 10, 2020 09:00:00',
		endTime: 'September 9, 2020 23:59:59',
		description: 'We love our favourite Java professor, Professor John Latham. This a day to remember him since he has retired now!',
		external: '---',
		image: false,
		channelID: '10'
	}
];

export const invalidEvents: APIEvent[] = [
	{
		id: '100',
		title: 'Invalid Event',
		startTime: '',
		endTime: '',
		description: 'Invalid Description?',
		external: '---',
		image: false,
		channelID: '10'
	}
];

/* Event Creation Data */

export const validCreateEvent: EventCreationData = {
	title: 'Corona Protest',
	startTime: 'September 9, 2020 20:00:00',
	endTime: 'September 9, 2020 22:00:00',
	description: 'Protesting Corona is the only way to stop its spread. Lets stand closer than 1m apart and protest!',
	external: '---',
	image: false
};

export const invalidCreateEvent: EventCreationData = {
	title: '',
	startTime: '',
	endTime: '',
	description: '',
	external: '',
	image: false
};

/* Token for headers */

export const apiToken = 'eyJHbGci0eyJpZCI6IjBiNjQfPQ6l94-Py_tpKL';
