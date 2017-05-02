import { Class } from 'meteor/jagi:astronomy'
import { Enum } from 'meteor/jagi:astronomy'

const ProofType = Enum.create({
	name: 'ProofTypes',
	identifiers: ['BOOLEAN']
		// TODO: Add support for these proof types later
		// 'IMAGE', 'VIDEO', 'AUDIO'
	}
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
const ResolutionPlans = Class.create({
	name: 'ResolutionPlan',
	collection: ResolutionPlans,
	fields: {
		/// Required
		_id: {
			type: Mongo.ObjectID
		},
		proofTypes: {
			type: ProofType
			default: () => ProofType.BOOLEAN
		},
		frequency: {
			type: Frequency
			default: () => Frequency.DAILY
		},
		taskSeries: {
			type: [Task],
			default: () => []
		}
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
	behaviors: {
		timestamp: {
			hasCreatedField: true,
			createdFieldName: 'createdAt',
			hasUpdatedField: true,
			updatedFieldName: 'updatedAt'
		}
	}
})
