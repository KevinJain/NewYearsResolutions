import { Class } from 'meteor/jagi:astronomy'
import { Enum } from 'meteor/jagi:astronomy'

// TODO: Abstract this and re-use across ResolutionPlan
const ProofType = Enum.create({
	name: 'ProofType',
	identifiers: ['BOOLEAN']
	// TODO: Add support for these proof types later
	// 'IMAGE', 'VIDEO', 'AUDIO'
})

// One log each step completed
const StepCompleted = Class.create({
	name: 'StepCompleted',
	// No collection attribute
	fields: {
		proofType: {
			type: ProofType,
		},
		completedStepNumber: {
			type: Number,
			validators: [
				{
					type: 'required'
				}
				// TODO: add integer validation
			]
		}
		// TODO: Add support for other ProofType
		// TODO: * Image / video / audio will need a link to the proof type
		// TODO: ** As uploaded to something like amazon s3 (or higher level api)
	}
})

const ResolutionLogs = new Mongo.Collection('ResolutionLogs')
const ResolutionLog = Class.create({
	name: 'ResolutionLog',
	collection: ResolutionLogs,
	fields: {
		/// Required
		_id: {
			type: Mongo.ObjectID
		},
		user: {
			type: Mongo.ObjectID
		},
		resolutionPlan: {
			// Implies a planId & version
			// Maybe student interface can allow compatable plan updates?
			// * To a patch / minor semver update?
			type: Mongo.ObjectID
		},
		startDate: {
			type: Date,
			validators: [
				{
					type: 'required'
				}
			]
		},
		// Array of completed steps, with this data structure some steps may be skipped
		// * Though the UX may enforce steps to not be skipped
		stepsCompleted: {
			// TODO: Add sorting of logs so always in order first to last step
			// TODO: * Enforcing this can increase performance and simplify logic in other app areas
			// TODO: * Maybe can be done as a beforeSave trigger?
			type: [StepCompleted],
			default: () => []
		},

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
