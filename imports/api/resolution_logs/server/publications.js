/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor'
import { ResolutionLogs } from '../resolution-logs'
import { check } from 'meteor/check'

Meteor.publish('resolutionLogsUser', function() {
	if (!this.userId) {
		return []
	}
	return ResolutionLogs.find({
		user: this.userId
	})
})

Meteor.publish('resolutionLogsOtherUser', function(userId) {
	check(userId, String)

	if (!userId) {
		return []
	}
	return ResolutionLogs.find({
		user: userId
	})
})
