import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as apiClient from '../';
import { users as fixtures } from './fixtures/users';

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

const apiClientInit = new apiClient.APIClient({ apiBase: 'unics-social' });

test('getUser(): fetches users correctly', async () => {
	for (const fixture of fixtures) {
		mock.onGet(`unics-social/users/${fixture.id}`).reply(200, {
			user: fixture
		});
		const user = await apiClientInit.getUser(fixture.id);
		expect(user).toEqual(fixture);
	}
});

test('getUser(): throws for non-existent user', async () => {
	await expect(apiClientInit.getUser('MissingNo.')).rejects.toThrow();
	await expect(apiClientInit.getUser('')).rejects.toThrow();
	await expect(apiClientInit.getUser(fixtures[0].id.repeat(2))).rejects.toThrow();
});
