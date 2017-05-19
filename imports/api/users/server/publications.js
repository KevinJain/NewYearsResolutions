/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

Meteor.publish('userData', function() {
	if (!this.userId) {
		return []
	}
	return Meteor.users.find(
		{
			_id: this.userId
		},
		{
			fields: {
				firstName: 1,
				lastName: 1,
				phone: 1,
				stripeSubscriptionId: 1,
				profilePicture: 1,
				coverPhoto: 1
			}
		}
	)
})

Meteor.publish('otherUser', function(userId) {
	check(userId, String)

	return Meteor.users.find(
		{
			_id: userId
		},
		{
			fields: {
				firstName: 1,
				lastName: 1,
				profilePicture: 1,
				coverPhoto: 1
			}
		}
	)
})
