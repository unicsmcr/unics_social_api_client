import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as apiClient from '../';
import { validReports, validCreateReportData, invalidCreateReportData } from './fixtures/reports';

const mock = new MockAdapter(axios);

afterEach(() => {
	mock.reset();
});

const apiClientInit = new apiClient.APIClient({ apiBase: 'unics-social' });

test('reportUser(): creates report correctly', async () => {
	let i = 0;
	for (const report of validReports) {
		console.log(report, validCreateReportData[i]);
		mock.onPost(`unics-social/users/${report.reportedUserID}/report`, { description: validCreateReportData[i].description }).reply(201, {
			report: report
		});
		const createReport = await apiClientInit.reportUser(validCreateReportData[i]);
		expect(createReport).toEqual(report);
		i++;
	}
});

test('reportUser(): throws when reporting and reported user ID not found', async () => {
	for (const invalidData of invalidCreateReportData) {
		mock.onPost(`unics-social/users/${invalidData.reportedUserID}/report`, { description: invalidData.description }).reply(404, {
			error: 'User not found'
		});
		await expect(apiClientInit.reportUser(invalidData)).rejects.toThrow();
	}
});
