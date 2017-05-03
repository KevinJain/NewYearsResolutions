import { Class } from 'meteor/jagi:astronomy';

export const User = Class.create({
	name: 'User',
	collection: Meteor.users,
	fields: {
		/// Required
		// Default Meteor feidls
		_id: Mongo.ObjectID,
		emails: [Object],
		services: Object,
		teams: [Mongo.ObjectID],

		planner: {
			// If the user can create ResolutionPlans
			// TODO: Think through / migrate this to a roles package?
			type: Boolean
		},
		// TODO: Move a bunch of fields into a 'Profile' sub-object?
		// TODO: * Then require the population of indivual fields as full set?
		// TODO: * Note: Commented out to develop without required fields
		/*
		firstName: {
			type: String,
			validators: [
				{
					type: 'minLength',
					param: 1
				},
				{
					type: 'required'
				}
			]
		},
		middleName: String,
		lastName: {
			type: String,
			validators: [
				{
					type: 'minLength',
					param: 1
				},
				{
					type: 'required'
				}
			]
		},
		phone: {
			type: String,
			// TODO: Add real validation here
			validators: [
				{
					type: 'minLength',
					param: 10
				},
				{
					type: 'required'
				}
			]
		},
		*/

		/// Optional
		ssn: {
			type: Number,
			validators: [
				{
					type: 'number',
					param: 10
				},
				{
					type: 'gte',
					param: 100000000
				},
				{
					type: 'lte',
					param: 999999999
				}
			]
			// TODO: Think through international requirements?
		},
		driverLicenceNumber: {
			type: String
			// TODO: Add validation
			// TODO: * Think through all states?
			// TODO: * Think through international requirements?
		},
		passportNumber: {
			type: Number
			// TODO: Think through / research data form
			// TODO: * Look at US standards?
			// TODO: * Look through international standards?
			// TODO: * Add validation as needed
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
