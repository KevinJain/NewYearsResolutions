import { Meteor } from 'meteor/meteor';

import { ResolutionPlans } from '../resolution-plans.js';

Meteor.publish("resolutionPlansAll", () => {
	return ResolutionPlans.find()
});
