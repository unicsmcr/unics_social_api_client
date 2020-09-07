import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as apiClient from '../';
import { valid_data, invalid_data } from './fixtures/authenticate';

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

const apiClientInit = new apiClient.APIClient({ apiBase: 'unics-social' });

test('authenticate(): authenticates valid users correctly', async () => {
	mock.onPost('unics-social/authenticate').reply(200, {
		status: {
			token: '200: Success?'
		}
	});
	const tokenCheck = await apiClientInit.authenticate(valid_data[0]);
	expect(tokenCheck).toEqual('200: Success?');
});

test('authenticate(): throws error if user enters invalid credentials', async () => {
	mock.onPost('unics-social/authenticate').reply(400, {
		status: {
			token: '200: Success?'
		}
	});
	// const tokenCheck = await apiClientInit.authenticate(invalid_data[0]);
	await expect(apiClientInit.authenticate(invalid_data[0])).rejects.not.toEqual('200: Success?');
});

