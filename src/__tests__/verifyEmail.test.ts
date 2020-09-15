import MockAdapter from 'axios-mock-adapter';
import { APIClient as apiClient } from '../';
import { tokens, invalidTokens } from './fixtures/tokens';
import axios from 'axios';
import unwrapErrorBody from './util/unwrapErrorBody';

const mock = new MockAdapter(axios);

const myAPIClient = new apiClient({ apiBase: 'unics_social' });

afterEach(() => {
	mock.reset();
});

test('verifyEmail(): verifies users with valid token', async () => {
	for (const fixture of tokens) {
		mock.onGet('unics_social/verify', undefined, expect.objectContaining({ Authorization: fixture })).reply(204, {});
		const response = await myAPIClient.verifyEmail(fixture);
		expect(response.data).toEqual({});
	}
});

test('verifyEmail(): throws error if account is verified more than once', async () => {
	for (const fixture of tokens) {
		mock.onGet('unics_social/verify', undefined, expect.objectContaining({ Authorization: fixture })).reply(400, {
			status: 400,
			error: 'Your account has already been verified'
		});
		await expect(unwrapErrorBody(myAPIClient.verifyEmail(fixture))).rejects.toMatchObject({ error: 'Your account has already been verified' });
	}
});

test('verifyEmail(): rejects invalid token', async () => {
	for (const fixture of invalidTokens) {
		mock.onGet('unics_social/verify', undefined, expect.objectContaining({ Authorization: fixture })).reply(401, {
			status: 400,
			error: 'Authorization token is invalid'
		});
		await expect(unwrapErrorBody(myAPIClient.verifyEmail(fixture))).rejects.toMatchObject({ error: 'Authorization token is invalid' });
	}
});
