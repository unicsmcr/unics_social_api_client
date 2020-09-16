import { ReportDataToCreate, APIReport } from '../../types/api';

export const validReports: APIReport[] = [
	{
		id: '300',
		reportedUserID: '1a2b3c4d5e',
		reportingUserID: '123456',
		currentTime: 'September 9, 2020 20:00:15',
		description: 'Bob Ross is just so gosh darn wholesome!'
	},
	{
		id: '301',
		reportedUserID: '123456',
		reportingUserID: '1a2b3c4d5e',
		currentTime: 'September 10, 2020 20:00:15',
		description: 'All I\'m saying is... bad vibes.'
	}
];

export const validCreateReportData: ReportDataToCreate[] = [
	{
		reportedUserID: '1a2b3c4d5e',
		reportingUserID: '123456',
		description: 'Bob Ross is just so gosh darn wholesome!'
	},
	{
		reportedUserID: '123456',
		reportingUserID: '1a2b3c4d5e',
		description: 'All I\'m saying is... bad vibes.'
	}
];

export const invalidCreateReportData: ReportDataToCreate[] = [
	{
		reportedUserID: '1a2b3c4d5e',
		reportingUserID: '',
		description: 'Bob Ross is just so gosh darn wholesome!'
	},
	{
		reportedUserID: '',
		reportingUserID: '1a2b3c4d5e',
		description: 'All I\'m saying is... bad vibes.'
	}
];
