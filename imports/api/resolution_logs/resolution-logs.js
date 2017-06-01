/* globals Meteor, Mongo, check */

import { Class } from 'meteor/jagi:astronomy'
import { Random } from 'meteor/random'
import { ResolutionPlan } from '../resolution_plans/resolution-plans'
import { _ } from 'lodash'
import moment from 'moment'

const Proof = Class.create({
	name: 'Proof',
	fields: {
		boolean: {
			type: Boolean,
			optional: true,
			validators: [
				// TODO: Add must always be 'true' if present
			]
		},

		image: {
			// Cloudinary image id
			type: String,
			optional: true,
			validators: [
				// TODO: Add must always be 'true' if present
				// TODO: Add real validation here it's a cloudinary id
				{
					type: 'minLength',
					param: 10
				},
				{
					type: 'maxLength',
					param: 100
				}
			]
		},
		imageUrlLarge: {
			// Auto-generated field from image
			type: String,
			optional: true
		},
		imageUrlThumbnail: {
			// Auto-generated field from image
			type: String,
			optional: true
		},

		text: {
			type: String,
			optional: true
		}

		// TODO: Add support for these proof types at some point
		// 'VIDEO', 'AUDIO'
	},
	events: {
		afterInit(e) {
			// Get current doc & setup re-used information
			const doc = e.currentTarget
			const cloudinaryPrefix = 'https://res.cloudinary.com/'
			const cloudName = Meteor.settings.public.cloudinary.name

			const img = doc.image
			if (img) {
				const lTrans = 'w_600,c_fill'
				doc.imageUrlLarge = `${cloudinaryPrefix}${cloudName}/image/upload/${lTrans}/${img}.jpg`
				const tTrans = 'w_75,h_75,c_fill'
				doc.imageUrlThumbnail = `${cloudinaryPrefix}${cloudName}/image/upload/${tTrans}/${img}.jpg`
			}
		}
	}
})

// One log each step completed
const CompletedTask = Class.create({
	name: 'CompletedTask',
	// No collection attribute
	fields: {
		// `ResolutionPlan`.`Task`.`_id`
		_id: {
			type: String,
			validators: [
				{
					type: 'required'
				}
			],
			// TODO: Make this _id unique within a ResolutionLog.completedTasks
			default: () => Random.id()
		},
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
			type: String,
			// TODO: Add validation follows format YYYY-MM-DD
			validators: [
				{
					type: 'required'
				}
			],
			default: () => moment().format('YYYY-MM-DD')
		},
		// Array of completed tasks, with this data structure some tasks may be skipped
		// * Though the UX may enforce tasks to not be skipped
		completedTasks: {
			// TODO: Add sorting of logs so always in order first to last task
			// TODO: * Enforcing this can increase performance and simplify
			// TODO:   logic in other app areas
			// TODO: * Maybe can be done as a beforeSave trigger?
			type: [CompletedTask],
			default: () => []
		},
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
		// TODO: In UX when 'student' selects make suggestion based on
		// TODO:   `ResolutionPlan`.`daysPerWeekSuggestedTarget`
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
		/* eslint-disable complexity */
		populateDefaultTargeting(daysPerWeekSuggested) {
			this.targetingMondays = false
			this.targetingTuesdays = false
			this.targetingWednesdays = false
			this.targetingThursdays = false
			this.targetingFridays = false
			this.targetingSaturdays = false
			this.targetingSundays = false
			switch (daysPerWeekSuggested) {
				case 1:
					this.targetingMondays = true
					break
				case 2:
					this.targetingMondays = true
					this.targetingThursdays = true
					break
				case 3:
					this.targetingMondays = true
					this.targetingWednesdays = true
					this.targetingFridays = true
					break
				case 4:
					this.targetingMondays = true
					this.targetingTuesdays = true
					this.targetingThursdays = true
					this.targetingSaturdays = true
					break
				case 5:
					this.targetingMondays = true
					this.targetingTuesdays = true
					this.targetingWednesdays = true
					this.targetingThursdays = true
					this.targetingFridays = true
					break
				case 6:
					this.targetingMondays = true
					this.targetingTuesdays = true
					this.targetingWednesdays = true
					this.targetingThursdays = true
					this.targetingFridays = true
					this.targetingSaturdays = true
					break
				case 7:
					this.targetingMondays = true
					this.targetingTuesdays = true
					this.targetingWednesdays = true
					this.targetingThursdays = true
					this.targetingFridays = true
					this.targetingSaturdays = true
					this.targetingSundays = true
					break
			}
		},

		isTaskDay(date) {
			switch (date.getDay()) {
				case 0:
					return this.targetingSundays
				case 1:
					return this.targetingMondays
				case 2:
					return this.targetingTuesdays
				case 3:
					return this.targetingWednesdays
				case 4:
					return this.targetingThursdays
				case 5:
					return this.targetingFridays
				case 6:
					return this.targetingSaturdays
				default:
					throw new Meteor.Error('Invalid date')
			}
		},
		/* eslint-enable complexity */
		getPlannedTasksAfterCurrent() {
			// Get tasks from ResolutionPlan & put them in order
			const plan = ResolutionPlan.findOne(this.resolutionPlan)
			const tasks = _.sortBy(_.clone(plan.tasks), 'order')

			// If no current task, we're at start
			if (!this.currentTask) {
				return tasks
			}

			// Return all those at and after current task
			let found = false
			return _.filter(
				_.map(tasks, task => {
					if (task._id === this.currentTask) {
						found = true
					}
					return found ? task : false
				})
			)
		},
		// Gets upcoming tasks in the ResolutionPlan according to progress & setting
		// in this ResolutionLog
		// TODO: Refactor this method for easier maitence
		// TODO: Document this method well?
		// TODO: * Perhaps unit tests too?
		// TODO: * It may end up very core to the application
		// TODO: Test this method works outside of the current day
		// TODO: Reduce statements and remove eslint disable
		getScheduledTasksBetween(start, end) {
			// eslint-disable-line max-statements
			// Sanity check state
			check(start, Date)
			check(end, Date)
			check(this._id, String)
			check(this.resolutionPlan, String)

			// Grab the tasks to schedule
			const tasks = this.getPlannedTasksAfterCurrent()

			// Start of all tasks is later of today or specified start date
			const today = moment().startOf('day').toDate()
			const logStartDate = moment(this.startDate).toDate()
			const startDate = logStartDate > today ? logStartDate : today

			// Gather all scheduled tasks in range
			// TODO: Optomize this algorithm, many many loops if long running resolution
			// Loop over days
			// * Starting with when we should start tasks
			// * Ending with when filter end date
			const scheduledTasks = []
			let curr = new Date(startDate.valueOf())
			while (curr <= end && tasks.length > 0) {
				// Walk forward on tasks list if this is a task day
				if (this.isTaskDay(curr)) {
					const task = tasks.shift() // Walk forward on tasks list

					// Only include at and after range start
					if (curr >= start) {
						const scheduledDate = moment(curr).startOf('day').toDate()
						scheduledTasks.push({
							when: scheduledDate,
							task
						})
					}
				}

				// Move to next day
				const nextDate = curr.setDate(curr.getDate() + 1)
				curr = new Date(nextDate)
			}

			return scheduledTasks
		},

		getTodaysScheduledTask() {
			const start = new Date()
			start.setHours(0, 0, 0, 0)
			const end = new Date()
			end.setHours(23, 59, 59, 999)
			const tasks = this.getScheduledTasksBetween(start, end)

			if (!tasks.length) {
				return false
			}
			return tasks[0].task
		},

		// Move to the next task starting tomorrow
		moveOn(lastCompletedTaskId, lastCompletedTaskAt) {
			const plan = ResolutionPlan.findOne(this.resolutionPlan)

			// Mark currentTask to next
			const nextTask = plan.getTaskAfter(lastCompletedTaskId)
			this.currentTask = nextTask._id

			// Mark `startDate` as tomorrow
			this.startDate = moment(lastCompletedTaskAt)
				.add(1, 'day')
				.startOf('day')
				.format('YYYY-MM-DD')
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
		const res = ResolutionLog.findOne({ user: userId })
		return !_.isUndefined(res)
	}
}
