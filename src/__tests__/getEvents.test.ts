import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as apiClient from '../';
import { validEvents } from './fixtures/events';

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

const apiClientInit = new apiClient.APIClient({ apiBase: 'unics-social' });

test('getEvents(): 0 events gives empty list', async () => {
	mock.onGet('unics-social/users/@me/profile').reply(200, {
		events: []
	});
	const events = await apiClientInit.getEvents();
	expect(events.length).toEqual(0);
});


test('getEvents(): 1 event', async () => {
	mock.onGet('unics-social/users/@me/profile').reply(200, {
		events: [validEvents[0]]
	});
	const events = await apiClientInit.getEvents();
	expect(events).toEqual([validEvents[0]]);
});

test('getEvents(): more than 1 message fetched correctly', async () => {
	mock.onGet('unics-social/users/@me/profile').reply(200, {
		events: validEvents
	});
	const events = await apiClientInit.getEvents();
	expect(events).toEqual(validEvents);
});

test('getEvents(): throws when API response has error code', async () => {
	mock.onGet('unics-social/users/@me/profile').reply(404, {
		error: 'Event not found'
	});
	await expect(apiClientInit.getEvents()).rejects.toThrow();
});

