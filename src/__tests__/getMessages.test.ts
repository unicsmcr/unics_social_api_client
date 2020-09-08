import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as apiClient from '../';
import { messages as validMessages } from './fixtures/messages';

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

const apiClientInit = new apiClient.APIClient({ apiBase: 'unics-social' });

test('getMessage(): 0 messages gives empty list', async () => {
	mock.onGet('unics-social/channels/3').reply(200, {
		status: 200,
		error: '',
		messages: []
	});
	const messages = await apiClientInit.getMessages('3');
	expect(messages.length).toEqual(0);
});


test('getMessages(): 1 message', async () => {
	mock.onGet('unics-social/channels/2').reply(200, {
		status: 200,
		error: '',
		messages: [validMessages[3]]
	});
	const messages = await apiClientInit.getMessages('2');
	const messageCheck = {
		...validMessages[3],
		time: new Date(validMessages[3].time)
	};
	expect(messages).toEqual([messageCheck]);
});

test('getMessages(): more than 1 message fetched correctly', async () => {
	mock.onGet('unics-social/channels/1').reply(200, {
		status: 200,
		error: '',
		messages: validMessages.slice(0, 3)
	});
	const messages = await apiClientInit.getMessages('1');
	const messagesCheck = validMessages.slice(0, 3).map(message => ({
		...message,
		time: new Date(message.time)
	}));
	expect(messages).toEqual(messagesCheck);
});

test('getMessages(): throws when API response has error code', async () => {
	mock.onGet('unics-social/channels/4').reply(404, {
		status: 404,
		error: 'Message not found'
	});
	await expect(apiClientInit.getMessages('4')).rejects.toThrow();
});
