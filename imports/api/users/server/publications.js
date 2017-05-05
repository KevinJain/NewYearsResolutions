/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { User } from '../users.js';

Meteor.publish("userData", function () {
	return Meteor.users.find(
		{
			_id: this.userId
		},
		{
			fields: {
				'firstName': 1,
				'lastName': 1,
				'phone': 1
			}
		}
	);
});
