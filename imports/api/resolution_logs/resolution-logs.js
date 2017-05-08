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

export const ResolutionLogs = new Mongo.Collection('ResolutionLogs')
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
			],
			default: () => new Date()
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
			type: String,
			optional: true
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
	helpers: {
		populateDefaultTargeting(daysPerWeekSuggested) {
			this.targetingMondays = false;
			this.targetingTuesdays = false;
			this.targetingWednesdays = false;
			this.targetingThursdays = false;
			this.targetingFridays = false;
			this.targetingSaturdays = false;
			this.targetingSundays = false;
			switch(daysPerWeekSuggested) {
				case 1:
					this.targetingMondays = true;
					break;
				case 2:
					this.targetingMondays = true;
					this.targetingThursdays = true;
					break;
				case 3:
					this.targetingMondays = true;
					this.targetingWednesdays = true;
					this.targetingFridays = true;
					break;
				case 4:
					this.targetingMondays = true;
					this.targetingTuesdays = true;
					this.targetingThursdays = true;
					this.targetingSaturdays = true;
					break;
				case 5:
					this.targetingMondays = true;
					this.targetingTuesdays = true;
					this.targetingWednesdays = true;
					this.targetingThursdays = true;
					this.targetingFridays = true;
					break;
				case 6:
					this.targetingMondays = true;
					this.targetingTuesdays = true;
					this.targetingWednesdays = true;
					this.targetingThursdays = true;
					this.targetingFridays = true;
					this.targetingSaturdays = true;
					break;
				case 7:
					this.targetingMondays = true;
					this.targetingTuesdays = true;
					this.targetingWednesdays = true;
					this.targetingThursdays = true;
					this.targetingFridays = true;
					this.targetingSaturdays = true;
					this.targetingSundays = true;
					break;
			}
		}
	},
	indexes: {
		// Only one version for each plan
		userResolutionPlans: {
			fields: {
				user: 1,
				resolutionPlan: 1
			},
			options: {
				unique: true
			}
		}
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
		const res = ResolutionLog.findOne({user: userId})
		return undefined !== res
	}
}
