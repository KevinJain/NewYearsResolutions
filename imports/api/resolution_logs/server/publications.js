/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor'
import { ResolutionLogs } from '../resolution-logs'

Meteor.publish('resolutionLogsUser', function() {
	if (!this.userId) {
		return []
	}
	return ResolutionLogs.find({
		user: this.userId
	})
})
