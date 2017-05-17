/* globals Mongo */
import { Class, Enum } from 'meteor/jagi:astronomy'
import { Random } from 'meteor/random'
import _ from 'lodash'

export const ProofType = Enum.create({
	name: 'ProofType',
	identifiers: ['BOOLEAN', 'IMAGE']
	// TODO: Add support for these proof types later
	// 'AUDIO', 'VIDEO'
})

const TaskGroup = Class.create({
	name: 'TaskGroup',
	fields: {
		title: {
			type: String
		},
		orderStart: {
			// TODO: Add validation here that Numbers are unique
			type: Number
		}
	}
})

const Task = Class.create({
	name: 'Task',
	// No collection attribute
	fields: {
		_id: {
			type: String,
			// TODO: Make this _id unique within a ResolutionPlan
			// TODO: Autogenerate this _id
			validators: [
				{
					type: 'required'
				}
			],
			// TODO: Ensure unique (within ResolutionPlan?) to avoid collisions
			default: () => Random.id()
		},
		title: {
			type: String,
			validators: [
				{
					type: 'required'
				},
				{
					type: 'minLength',
					param: 3
				},
				{
					type: 'maxLength',
					param: 140
				}
			]
		},
		// Just a list of line items to check off
		subTaskChecklist: {
			type: [String],
			default: () => []
		},
		description: {
			type: String
		},
		order: {
			type: Number
			// TODO: Add auto-incrementing number here when a new task is added
			// TODO: * Shoud increment to integer after largest in this particular ResolutionPlan
		}
	}
})

export const ResolutionPlans = new Mongo.Collection('ResolutionPlans')
export const ResolutionPlan = Class.create({
	name: 'ResolutionPlan',
	collection: ResolutionPlans,
	fields: {
		/// Required
		_id: {
			type: String
		},
		planId: {
			// A plan identifier to Group together mulitple versions of the same plan
			type: String,
			validators: [
				{
					type: 'required'
				}
			]
		},
		title: {
			type: String,
			validators: [
				{
					type: 'minLength',
					param: 3
				},
				{
					type: 'required'
				}
			]
		},

		// A ResolutionLog depends on a particular version of a ResolutionPlan
		// * ResolutionPlans may be drafted and updated
		// TODO: Add validation only allow editing version -1
		// TODO: Think through semver logic
		// TODO: * Add validation allow creating a newer version than latest?
		// TODO: * Maybe can find semver package for this logic?
		version: {
			// TODO: For now any version update will be incompatable with previous
			// TODO: Only show students ResolutionPlans
			// TODO: * With version >= 0
			// TODO: * Of the greatest version in a set of planId
			// TODO: Implement SemVar versioning
			type: String,
			// TODO: Add integer validation? Or Semver?
			// TODO: * If semver will need minor version additions:
			// TODO: ** Enforcement where possible like no removing or re-ordering tasks,
			// TODO:    but allow adding
			// TODO: ** UI explaining non-breaking change
			// TODO: * Allow version -1 for the current draft, but all other must be > 0?
			default: _.constant(-1)
		},
		proofTypes: {
			type: [ProofType],
			default: () => ProofType.BOOLEAN
		},
		daysPerWeekSuggested: {
			type: Number,
			default: _.constant(7),
			validators: [
				{
					type: 'required'
				},
				{
					type: 'gte',
					param: 1
				},
				{
					type: 'lte',
					param: 7
				}
			]
		},
		// A bunch of tasks planned to be done in order for this resolution
		tasks: {
			type: [Task],
			default: () => []
		},
		// Probably not used in MVP
		taskGroups: {
			type: [TaskGroup],
			default: () => []
		},

		/// Optional
		description: {
			type: String
		},

		/// Automatic
		createdAt: Date,
		updatedAt: Date
		// TODO: Add field to connect with Stripe?
	},
	helpers: {
		getTaskAfter(taskId) {
			const tasks = _.sortBy(this.tasks, 'order')
			const taskAfterIndex = _.findIndex(tasks, { _id: taskId }) + 1
			if (tasks[taskAfterIndex]) {
				return tasks[taskAfterIndex]
			}
			return false
		}
	},
	indexes: {
		// Only one version for each plan
		idVersions: {
			fields: {
				planId: 1,
				version: 1
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
