import { Class } from 'meteor/jagi:astronomy'
import { Enum } from 'meteor/jagi:astronomy'

const Proof = Class.create({
	name: 'Proof',
	fields: {
		boolean: {
			type: Boolean,
			optional: true,
			validators: [
				// TODO: Add must always be 'true' if present
			]
		}
		// TODO: Add support for these proof types at some point
		// 'IMAGE', 'VIDEO', 'AUDIO'
	}
})

// One log each step completed
const CompletedTask = Class.create({
	name: 'CompletedTask',
	// No collection attribute
	fields: {
		// `ResolutionPlan`.`Task`.`_id`
		task: {
			type: String,
			validators: [
				{
					type: 'required'
				}
			]
		},
		proof: Proof,
		completedAt: {
			type: Date,
			validators: [
				{
					type: 'required'
				}
			]
		}
	},
	// TODO: Confirm this actually works
	behaviors: {
		timestamp: {
			hasCreatedField: true,
			createdFieldName: 'completedAt'
		}
	}
})

const ResolutionLogs = new Mongo.Collection('ResolutionLogs')
export const ResolutionLog = Class.create({
	name: 'ResolutionLog',
	collection: ResolutionLogs,
	fields: {
		/// Required
		// id's
		_id: String,
		user: String,
		// Implies a planId & version
		// Maybe student interface can allow compatable plan updates?
		// * To a patch / minor semver update?
		resolutionPlan: String,
		startDate: {
			type: Date,
			validators: [
				{
					type: 'required'
				}
			]
		},
		/*
		// Array of completed tasks, with this data structure some tasks may be skipped
		// * Though the UX may enforce tasks to not be skipped
		completedTasks: {
			// TODO: Add sorting of logs so always in order first to last task
			// TODO: * Enforcing this can increase performance and simplify logic in other app areas
			// TODO: * Maybe can be done as a beforeSave trigger?
			type: [CompletedTask],
			default: () => []
		},
		*/
		currentTask: {
			// The ._id of the current task the user is on
			// TODO: Make this auto-advance when a new task is completed
			// TODO: * Do via a helper method 'completeStep'?
			type: String
		},
		// Choosing to target our goals by day of week
		// * Does not account for day of month or time of year
		// * However user can always just skip, and return later
		// TODO: In UX when 'student' selects make suggestion based on `ResolutionPlan`.`daysPerWeekSuggestedTarget`
		targetingMondays: Boolean,
		targetingTuesdays: Boolean,
		targetingWednesdays: Boolean,
		targetingThursdays: Boolean,
		targetingFridays: Boolean,
		targetingSaturdays: Boolean,
		targetingSundays: Boolean,

		/// Automatic
		createdAt: Date,
		updatedAt: Date
	},
	behaviors: {
		timestamp: {
			hasCreatedField: true,
			createdFieldName: 'createdAt',
			hasUpdatedField: true,
			updatedFieldName: 'updatedAt'
		}
	}
})

// Helper methods not related to a specific ResolutionLog
export const ResolutionLogsHelpers = {
	// Checks if the user has chosen at least one plan already
	// Doesn't check for archive status
	userHas(userId) {
		// TODO: Make this actually check if user has ResolutionLog entries
		/*
		console.log('checking if user has')
		console.log(userId)
		*/
		return false
	}
}
