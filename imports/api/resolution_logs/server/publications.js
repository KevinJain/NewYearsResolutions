/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { ResolutionLogs } from '../resolution-logs.js';

Meteor.publish('resolutionLogsUser', function () {
	return ResolutionLogs.find(
		{
			user: this.userId
		}
	)
});
