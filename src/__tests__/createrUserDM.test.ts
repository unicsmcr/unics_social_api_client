import MockAdapter from 'axios-mock-adapter';
import { APIClient as apiClient } from '../';
import { users } from './fixtures/users';
import { channels } from './fixtures/channels';
import axios from 'axios';
import unwrapErrorBody from './util/unwrapErrorBody';

const mock = new MockAdapter(axios);

const myAPIClient = new apiClient({ apiBase: 'unics_social' });


afterEach(() => {
	mock.reset();
});

test('createUserDM(): returns channel if user ID is valid', async () => {
	for (let i = 0; i < users.length; i++) {
		mock.onPost(`unics_social/users/${users[i].id}/channel`).reply(200, { channel: channels[i] });
		const response = await myAPIClient.createUserDM(users[i].id);
		expect(response).toEqual(channels[i]);
	}
});

test('createUserDM(): throws error if user ID is invalid', async () => {
	for (const user of users) {
		mock.onPost(`unics_social/users/${user.id}/channel`).reply(400, { error: 'invalid user ID' });
		await expect(unwrapErrorBody(myAPIClient.createUserDM(user.id))).rejects.toMatchObject({ error: 'invalid user ID' });
	}
});
