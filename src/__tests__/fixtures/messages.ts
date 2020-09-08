import { APIMessage } from '../../types/api';
export const messages: APIMessage[] = [
	{
		id: '1000',
		channelID: '1',
		authorID: '123456',
		content: 'Doesn\'t UNICS have the best developers???',
		time: 'September 7, 2020 20:30:00'
	},
	{
		id: '1001',
		channelID: '1',
		authorID: '1a2b3c4d5e',
		content: 'It TOTALLY does!!',
		time: 'September 8, 2020 09:45:00'
	},
	{
		id: '1002',
		channelID: '1',
		authorID: '1a2b3c4d5e',
		content: 'Quarantining is the worst!',
		time: 'September 8, 2020 09:46:10'
	},
	{
		id: '1100',
		channelID: '2',
		authorID: '1a2b3c4d5e',
		content: 'I have more than one friend!',
		time: 'September 9, 2020 20:00:15'
	}
];

export const invalidMessages = [
	{
		id: '4040404',
		channelID: '1',
		authorID: '123456',
		content: 'Message content',
		time: 'Time Error'
	},
	{
		id: '4040404',
		channelID: '1',
		authorID: '123456',
		content: 'Message content'
	},
	{
		id: '4040404',
		authorID: '123456',
		content: 'Message content',
		time: 'September 8, 2020 09:46:10'
	}
];
