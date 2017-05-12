import { Meteor } from 'meteor/meteor'
import { ResolutionLog } from '../resolution-logs'
import { ResolutionPlan } from '../../resolution_plans/resolution-plans'
import { check } from 'meteor/check'
import moment from 'moment'

Meteor.methods({
	'resolutionlogs.user.start': basics => {
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

	'resolutionlogs.user.destroy': resolutionPlanId => {
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
	},

	'resolutionlogs.tasks.complete': (resolutionLogId, taskId, completedAt) => {
		// Enforce logged in
		const userId = Meteor.userId()
		check(userId, String)

		// Enforce passed string ids
		check(resolutionLogId, String)
		check(taskId, String)
		check(completedAt, Date)

		// Get basic info
		const log = ResolutionLog.findOne(resolutionLogId)
		const plan = ResolutionPlan.findOne(log.resolutionPlan)

		// Enforce this log belongs to user
		if (log.user !== userId) {
			throw new Meteor.Error(`Log ${resolutionLogId} does not belog to user ${userId}`)
		}

		// Mark task completed
		log.completedTasks.push({
			task: taskId,
			// TODO: Make this work for more than just boolean proof
			proof: { boolean: true },
			completedAt
		})

		// Mark `startDate` as tomorrow
		log.startDate =	moment(completedAt).add(1, 'day').startOf('day').format('YYYY-MM-DD')

		// Mark currentTask to next
		const nextTask = plan.getTaskAfter(taskId)
		log.currentTask = nextTask._id

		// Save it
		if (!log.save()) {
			throw new Meteor.Error('Failure saving log')
		}
	}
})
