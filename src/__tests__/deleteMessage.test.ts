import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as apiClient from '../';
import { deleteMessage, invalidDeleteMessage } from './fixtures/messages';

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

const apiClientInit = new apiClient.APIClient({ apiBase: 'unics-social' });

test('deleteMessage(): deletes message correctly', async () => {
	mock.onDelete(`unics-social/channels/${deleteMessage.channelID}/messages/${deleteMessage.messageID}`).reply(200);
	const response = await apiClientInit.deleteMessage(deleteMessage);
	await expect(response).toBeUndefined();
});

test('deleteMessage(): throw error if deletion request is bad', async () => {
	mock.onDelete(`unics-social/channels/${invalidDeleteMessage.channelID}/messages/${invalidDeleteMessage.messageID}`).reply(404);
	await expect(apiClientInit.deleteMessage(invalidDeleteMessage)).rejects.toThrow();
});
