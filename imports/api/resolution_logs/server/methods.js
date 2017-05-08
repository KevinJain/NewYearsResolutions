import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { ResolutionLog } from '../resolution-logs.js'

Meteor.methods({
	'resolutionlogs.user.start': (basics) => {
		// Enforce logged in
		const userId = Meteor.userId()
		check(userId, String)

		// Enforce passed an object (meant to hold basic information)
		check(basics, Object)

		// Save data passed in
		const log = new ResolutionLog()
		log.user = userId
		log.resolutionPlan = basics.resolutionPlanId
		log.populateDefaultTargeting(basics.daysPerWeekSuggested)
		log.save()
	},

	'resolutionlogs.user.destroy': (resolutionPlanId) => {
		// Enforce logged in
		const userId = Meteor.userId()
		check(userId, String)

		// Enforce passed string id
		check(resolutionPlanId, String)

		// Find and remove log
		const log = ResolutionLog.findOne({
			user: userId,
			resolutionPlan: resolutionPlanId
		})
		log.remove()
	}
})
