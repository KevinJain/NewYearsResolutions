import { Class } from 'meteor/jagi:astronomy';

export const User = Class.create({
	name: 'User',
	collection: Meteor.users,
	fields: {
		/// Default Meteor feidls
		_id: String, // TODO
		emails: [Object],
		services: Object,

		/// Required
		teams: {
			type: [String],
			default: () => []
		},
		planner: {
			// If the user can create ResolutionPlans
			// TODO: Think through / migrate this to a roles package?
			type: Boolean,
			default: () => false
		},

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
		// middleName: String,
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

		/// Optional
		stripeSubscriptionId: {
			type: String,
			optional: true,
			validators: [
				{
					type: 'string'
				},
				// Length expected to be 18
				// * Giving some wiggle room just in case API changes a little
				{
					type: 'minLength',
					param: 10
				},
				{
					type: 'maxLength',
					param: 30
				}
			]
		},
		ssn: {
			type: Number,
			optional: true,
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
			type: String,
			optional: true
			// TODO: Add validation
			// TODO: * Think through all states?
			// TODO: * Think through international requirements?
		},
		passportNumber: {
			type: Number,
			optional: true
			// TODO: Think through / research data form
			// TODO: * Look at US standards?
			// TODO: * Look through international standards?
			// TODO: * Add validation as needed
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
	},
	helpers: {
		// Checks if the user has their basic information filled in or not
		basicsFull() {
			return Boolean(this.firstName && this.lastName && this.phone)
		}
	}
})
