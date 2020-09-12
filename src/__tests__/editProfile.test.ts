import MockAdapter from 'axios-mock-adapter';
import { ProfileUploadData } from '../types/api';
import { APIClient as apiClient } from '../';
import { privateUsers } from './fixtures/privateUser';
import { uploadData } from './fixtures/profileUploadData';
import axios, { AxiosResponse } from 'axios';
import FormData from 'form-data';


const mock = new MockAdapter(axios);

const myAPIClient = new apiClient({ apiBase: 'unics_social' });

function getResponseBody(promise: Promise<AxiosResponse>) {
	return promise.catch((out: any) => Promise.reject(out.response.data));
}

afterEach(() => {
	mock.reset();
});

test('editProfile(): returns profile information', async () => {
	for (var i = 0; i < privateUsers.length; i++) {
		let myFormData = new FormData();
		const props: (keyof ProfileUploadData)[] = ['avatar', 'course', 'yearOfStudy', 'instagram', 'facebook', 'twitter'];

		for (const key of props) {
			if (uploadData[i].hasOwnProperty(key)) myFormData.append(key, (key === 'avatar' && typeof uploadData[i][key] === 'boolean') ? String(uploadData[i][key]) : uploadData[i][key]);
		}

		//console.log(myFormData);

		mock.onPut('unics_social/users/@me/profile',  expect.any(FormData), expect.objectContaining( { 'Content-Type': expect.any(String) } )).reply(200, privateUsers[i]);
		const response = await myAPIClient.editProfile(uploadData[i]);
		expect(response).toEqual(privateUsers[i]);
	}
});
