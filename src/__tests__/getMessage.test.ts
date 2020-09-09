import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as apiClient from '../';
import { messages as fixtures, invalidMessages } from './fixtures/messages';

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

const apiClientInit = new apiClient.APIClient({ apiBase: 'unics-social' });

test('getMessage(): fetches message correctly', async () => {
	for (const fixture of fixtures) {
		mock.onGet(`unics-social/channels/${fixture.channelID}/messages/${fixture.id}`).reply(200, {
			status: 200,
			error: '',
			message: fixture
		});
		const message = await apiClientInit.getMessage({ channelID: fixture.channelID, messageID: fixture.id });
		expect(message).toEqual(fixture);
	}
});

test('getMessage(): throws for non-existent user', async () => {
	for (const invalidMsg of invalidMessages) {
		await expect(apiClientInit.getMessage({ channelID: invalidMsg.channelID, messageID: invalidMsg.id })).rejects.toThrow();
	}
});
