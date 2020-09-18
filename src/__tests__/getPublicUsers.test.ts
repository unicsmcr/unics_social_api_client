import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as apiClient from '../';
import { users } from './fixtures/users';

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

const apiClientInit = new apiClient.APIClient({ apiBase: 'unics-social' });

test('getPublicUsers(): fetches 0 users correctly', async () => {
	mock.onGet(`unics-social/users`).reply(200, {
		users: []
	});
	const publicUsers = await apiClientInit.getPublicUsers();
	expect(publicUsers).toEqual([]);
});

test('getPublicUsers(): fetches 1 user correctly', async () => {
	mock.onGet(`unics-social/users`).reply(200, {
		users: users[0]
	});
	const publicUsers = await apiClientInit.getPublicUsers();
	await expect(publicUsers).toEqual(users[0]);
});

test('getPublicUsers(): fetches more than 1 user correctly', async () => {
	mock.onGet(`unics-social/users`).reply(200, {
		users: users
	});
	const publicUsers = await apiClientInit.getPublicUsers();
	expect(publicUsers).toEqual(users);
});

test('getMessages(): throws when API response has error code', async () => {
	mock.onGet(`unics-social/users`).reply(404, {
		error: 'Users not found'
	});
	await expect(apiClientInit.getPublicUsers()).rejects.toThrow();
});
