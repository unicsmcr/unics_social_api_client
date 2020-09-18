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
	mock.onGet('unics-social/channels/3/messages').reply(200, {
		messages: []
	});
	const messages = await apiClientInit.getMessages({ channelID: '3' });
	expect(messages.length).toEqual(0);
});


test('getMessages(): 1 message', async () => {
	mock.onGet('unics-social/channels/2/messages').reply(200, {
		messages: [validMessages[3]]
	});
	const messages = await apiClientInit.getMessages({ channelID: '2' });
	expect(messages).toEqual([validMessages[3]]);
});

test('getMessages(): more than 1 message fetched correctly', async () => {
	mock.onGet('unics-social/channels/1/messages').reply(200, {
		messages: validMessages.slice(0, 3)
	});
	const messages = await apiClientInit.getMessages({ channelID: '1' });
	expect(messages).toEqual(validMessages.slice(0, 3));
});

test('getMessages(): throws when API response has error code', async () => {
	mock.onGet('unics-social/channels/4/messages').reply(404, {
		error: 'Message not found'
	});
	await expect(apiClientInit.getMessages({ channelID: '4' })).rejects.toThrow();
});
