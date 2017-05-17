/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor'

Meteor.publish('userData', function() {
	if (!this.userId) {
		return false
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
