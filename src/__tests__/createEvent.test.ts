import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as apiClient from '../';
import { validEvents, validCreateEvent, invalidCreateEvent } from './fixtures/events';
import FormData from 'form-data';

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

const apiClientInit = new apiClient.APIClient({ apiBase: 'unics-social' });

test('createEvent(): creates event correctly with unset contentTypeExtra', async () => {
	const formData = new FormData();
	for (const [key, value] of Object.entries(validCreateEvent)) {
		formData.append(key, (key === 'image' && typeof value === 'boolean') ? String(value) : value);
	}
	mock.onPost(`unics-social/events`, expect.any(FormData), expect.objectContaining({ 'Content-Type': expect.any(String) })).reply(201, {
		event: validEvents[0]
	});
	const createdEvent = await apiClientInit.createEvent(validCreateEvent);
	expect(createdEvent).toEqual(validEvents[0]);
});

test('createEvent(): throw no content error', async () => {
	const formData = new FormData();
	for (const [key, value] of Object.entries(invalidCreateEvent)) {
		formData.append(key, (key === 'image' && typeof value === 'boolean') ? String(value) : value);
	}
	mock.onPost(`unics-social/events`, expect.any(FormData), expect.objectContaining({ 'Content-Type': expect.any(String) })).reply(204);
	await expect(apiClientInit.createEvent(invalidCreateEvent)).rejects.toThrow();
});
