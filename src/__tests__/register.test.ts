import MockAdapter from 'axios-mock-adapter';
import { APIClient as apiClient } from '../';
import { validData, invalidEmail, invalidPassword } from './fixtures/registerData';
import axios from 'axios';
import unwrapErrorBody from './util/unwrapErrorBody';

const mock = new MockAdapter(axios);

const myAPIClient = new apiClient({ apiBase: 'unics_social' });

afterEach(() => {
	mock.reset();
});


test('register(): registers user with valid data', async () => {
	for (const fixture of validData) {
		mock.onPost('unics_social/register', fixture).reply(204, {});
		const response = await myAPIClient.register(fixture);
		expect(response.data).toEqual({});
	}
});

test('register(): throws error if user enters invalid email', async () => {
	for (const fixture of invalidEmail) {
		mock.onPost('unics_social/register', fixture).reply(400, {
			status: 400,
			error: 'A University of Manchester student email account is required'
		});
		await expect(unwrapErrorBody(myAPIClient.register(fixture))).rejects.toMatchObject({ error: 'A University of Manchester student email account is required' });
	}
});


test('register(): throws error if password is too small', async () => {
	for (const fixture of invalidPassword) {
		mock.onPost('unics_social/register', fixture).reply(400, {
			status: 400,
			error: 'Password must be at least 10 characters long'
		});
		await expect(unwrapErrorBody(myAPIClient.register(fixture))).rejects.toMatchObject({ error: 'Password must be at least 10 characters long' });
	}
});
