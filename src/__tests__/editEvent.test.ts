import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as apiClient from '../';
import { validEvents, validEditEvent, invalidEditEvents } from './fixtures/events';
import FormData from 'form-data';

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

const apiClientInit = new apiClient.APIClient({ apiBase: 'unics-social' });

test('editEvent(): edits event correctly with FormData type checks', async () => {
	const formData = new FormData();
	for (const [key, value] of Object.entries(validEditEvent)) {
		formData.append(key, (key === 'image' && typeof value === 'boolean') ? String(value) : value);
	}
	mock.onPatch(`unics-social/events/${validEditEvent.id}`, expect.any(FormData), expect.objectContaining({ 'Content-Type': expect.any(String) })).reply(201, {
		event: validEvents[0]
	});
	const editedEvent = await apiClientInit.editEvent(validEditEvent);
	expect(editedEvent).toEqual(validEvents[0]);
});

test('editEvent(): throw no content error', async () => {
	for (const event of invalidEditEvents) {
		const formData = new FormData();
		for (const [key, value] of Object.entries(event)) {
			formData.append(key, (key === 'image' && typeof value === 'boolean') ? String(value) : value);
		}
		mock.onPatch(`unics-social/events/${event.id}`, expect.any(FormData), expect.objectContaining({ 'Content-Type': expect.any(String) })).reply(204);
		await expect(apiClientInit.editEvent(event)).rejects.toThrow();
	}
});
