import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as apiClient from '../';
import { messages, pickMessage, invalidPickMessages } from './fixtures/messages';

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

const apiClientInit = new apiClient.APIClient({ apiBase: 'unics-social' });

test('createMessage(): creates message correctly', async () => {
	mock.onPost(`unics-social/channels/1/messages`, { content: pickMessage.content }).reply(201, {
		status: 201,
		error: '',
		message: messages[2]
	});
	const createdMessage = await apiClientInit.createMessage(pickMessage);
	const messageCheck = {
		...messages[2],
		time: new Date(messages[2].time)
	};
	expect(createdMessage).toEqual(messageCheck);
});

test('createMessage(): throw no content error', async () => {
	mock.onPost(`unics-social/channels/1/messages`, { content: invalidPickMessages[1].content }).reply(204, {
		status: 204,
		error: 'No content'
	});
	await expect(apiClientInit.createMessage(invalidPickMessages[1])).rejects.toThrow();
});

test('createMessage(): throw when no channel given', async () => {
	mock.onPost(`unics-social/channels/1/messages`, { content: invalidPickMessages[0].content }).reply(404, {
		status: 404,
		error: 'Bad request'
	});
	await expect(apiClientInit.createMessage(invalidPickMessages[0])).rejects.toThrow();
});
