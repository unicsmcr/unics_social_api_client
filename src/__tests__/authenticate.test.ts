import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as apiClient from '../';
import { validData, invalidData, token as tokenAuth } from './fixtures/authenticate';

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

const apiClientInit = new apiClient.APIClient({ apiBase: 'unics-social' });

test('authenticate(): authenticates valid users correctly', async () => {
	mock.onPost('unics-social/authenticate', validData[0]).reply(200, { token: tokenAuth });
	const tokenCheck = await apiClientInit.authenticate(validData[0]);
	expect(tokenCheck).toEqual(tokenAuth);
});

test('authenticate(): throws error if user enters invalid credentials', async () => {
	mock.onPost('unics-social/authenticate', invalidData[0]).reply(400, { token: tokenAuth });
	await expect(apiClientInit.authenticate(invalidData[0])).rejects.toThrow();
});
