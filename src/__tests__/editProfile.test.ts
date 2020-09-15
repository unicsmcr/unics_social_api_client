import MockAdapter from 'axios-mock-adapter';
import { ProfileUploadData } from '../types/api';
import { APIClient as apiClient } from '../';
import { privateUsers } from './fixtures/privateUser';
import { validUploadData, invalidInstagramHandles, invalidFacebookHandles } from './fixtures/profileUploadData';
import FormData from 'form-data';
import axios from 'axios';
import unwrapErrorBody from './util/unwrapErrorBody';


const mock = new MockAdapter(axios);

const myAPIClient = new apiClient({ apiBase: 'unics_social' });

afterEach(() => {
	mock.reset();
});

test('editProfile(): returns profile information', async () => {
	for (let i = 0; i < privateUsers.length; i++) {
		const myFormData = new FormData();
		const props: (keyof ProfileUploadData)[] = ['avatar', 'course', 'yearOfStudy', 'instagram', 'facebook', 'twitter'];

		for (const key of props) {
			if (validUploadData[i].hasOwnProperty(key)) myFormData.append(key, (key === 'avatar' && typeof validUploadData[i][key] === 'boolean') ? String(validUploadData[i][key]) : validUploadData[i][key]);
		}

		mock.onPut('unics_social/users/@me/profile', expect.any(FormData), expect.objectContaining({ 'Content-Type': expect.any(String) })).reply(200, { user: privateUsers[i] });
		const response = await myAPIClient.editProfile(validUploadData[i]);
		expect(response).toEqual(privateUsers[i]);
	}
});

test('editProfile(): throws error if instagram username is invalid', async () => {
	for (let i = 0; i < privateUsers.length; i++) {
		const myFormData = new FormData();
		const props: (keyof ProfileUploadData)[] = ['avatar', 'course', 'yearOfStudy', 'instagram', 'facebook', 'twitter'];

		for (const key of props) {
			if (invalidInstagramHandles[i].hasOwnProperty(key)) myFormData.append(key, (key === 'avatar' && typeof invalidInstagramHandles[i][key] === 'boolean') ? String(invalidInstagramHandles[i][key]) : invalidInstagramHandles[i][key]);
		}

		mock.onPut('unics_social/users/@me/profile', expect.any(FormData), expect.objectContaining({ 'Content-Type': expect.any(String) })).reply(400, {
			error: 'Not a valid instagram username'
		});
		await expect(unwrapErrorBody(myAPIClient.editProfile(invalidInstagramHandles[i]))).rejects.toMatchObject({ error: 'Not a valid instagram username' });
	}
});

test('editProfile(): throws error if facebook username is invalid', async () => {
	for (let i = 0; i < privateUsers.length; i++) {
		const myFormData = new FormData();
		const props: (keyof ProfileUploadData)[] = ['avatar', 'course', 'yearOfStudy', 'instagram', 'facebook', 'twitter'];

		for (const key of props) {
			if (invalidFacebookHandles[i].hasOwnProperty(key)) myFormData.append(key, (key === 'avatar' && typeof invalidFacebookHandles[i][key] === 'boolean') ? String(invalidFacebookHandles[i][key]) : invalidFacebookHandles[i][key]);
		}

		mock.onPut('unics_social/users/@me/profile', expect.any(FormData), expect.objectContaining({ 'Content-Type': expect.any(String) })).reply(400, {
			error: 'Not a valid facebook username'
		});
		await expect(unwrapErrorBody(myAPIClient.editProfile(invalidFacebookHandles[i]))).rejects.toMatchObject({ error: 'Not a valid facebook username' });
	}
});
