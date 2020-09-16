import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as apiClient from '../';
import { channels as fixtures } from './fixtures/channels';

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

const apiClientInit = new apiClient.APIClient({ apiBase: 'unics-social' });

test('getChannels(): 0 channels gives empty list', async () => {
	mock.onGet('unics-social/channels').reply(200, {
		channels: []
	});
	const channels = await apiClientInit.getChannels();
	expect(channels.length).toEqual(0);
});


test('getChannels(): 1 channel', async () => {
	mock.onGet('unics-social/channels').reply(200, {
		channels: [fixtures[0]]
	});
	const channels = await apiClientInit.getChannels();
	expect(channels).toEqual([fixtures[0]]);
});

test('getChannels(): more than 1 channel fetched correctly', async () => {
	mock.onGet('unics-social/channels').reply(200, {
		channels: fixtures
	});
	const channel = await apiClientInit.getChannels();
	expect(channel).toEqual(fixtures);
});

test('getChannels(): throws when API response has error code', async () => {
	mock.onGet('unics-social/channels/').reply(404, {
		error: 'Channel not found'
	});
	await expect(apiClientInit.getChannels()).rejects.toThrow();
});
