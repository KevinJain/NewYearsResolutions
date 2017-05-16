/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor'
import { ResolutionLogs } from '../resolution-logs'

Meteor.publish('resolutionLogsUser', function() {
	if (!this.userId) {
		return false
	}
	return ResolutionLogs.find({
		user: this.userId
	})
})
