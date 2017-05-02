import { Class } from 'meteor/jagi:astronomy'
import { Enum } from 'meteor/jagi:astronomy'

const ProofType = Enum.create({
	name: 'ProofType',
	identifiers: ['BOOLEAN']
	// TODO: Add support for these proof types later
	// 'IMAGE', 'VIDEO', 'AUDIO'
})

const Frequency = Enum.create({
	name: 'Frequency',
	identifiers: {
		DAILY: 1,
		WEEKLY: 7
	}
})

const Task = Class.create({
	name: 'Task',
	// No collection attribute
	fields: {
		title: {
			type: String,
			validators: [
				{
					type: 'required'
				},
				{
					type: 'minLength',
					param: 3
				}
			]
		},
		description: {
			type: String
		}
	}
})

const ResolutionPlans = new Mongo.Collection('ResolutionPlans')
const ResolutionPlan = Class.create({
	name: 'ResolutionPlan',
	collection: ResolutionPlans,
	fields: {
		/// Required
		_id: {
			type: Mongo.ObjectID
		},
		planId: {
			// A plan identifier to Group together mulitple versions of the same plan
			type: String,
			validators: [
				{
					type: 'required',
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
			// For now any version update will be incompatable with previous
			// Only show students ResolutionPlans
			// * With version >= 0
			// * Of the greatest version in a set of planId
			type: 'Number',
			// TODO: Add integer validation? Or Semver?
			// TODO: * If semver will need minor version additions:
			// TODO: ** Enforcement where possible like no removing or re-ordering steps, but allow adding
			// TODO: ** UI explaining non-breaking change
			// TODO: * Allow version -1 for the current draft, but all other must be > 0?
			default: () => -1
		},
		proofTypes: {
			type: ProofType
			default: () => ProofType.BOOLEAN
		},
		frequency: {
			type: Frequency
			default: () => Frequency.DAILY
		},
		taskSteps: {
			type: [Task],
			default: () => []
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

		/// Optional
		description: {
			type: String,
		},

		/// Automatic
		createdAt: Date,
		updatedAt: Date
		// TODO: Add field to connect with Stripe?
	},
	indexes: {
		// Only one version for each plan
		idVersions: {
			fields: [
				planId: 1,
				version: 1
			],
			options: {
				unique: true
			}
		}
	}
	behaviors: {
		timestamp: {
			hasCreatedField: true,
			createdFieldName: 'createdAt',
			hasUpdatedField: true,
			updatedFieldName: 'updatedAt'
		}
	}
})
