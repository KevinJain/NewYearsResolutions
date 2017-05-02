import { Class } from 'meteor/jagi:astronomy';

const Users = new Mongo.Collection('Users');
const User = Class.create({
	name: 'User',
	collection: Users,
	fields: {
		/// Required
		_id: {
			type: Mongo.ObjectID
		},
		teams: [Mongo.ObjectID],
		planner: {
			// If the user can create ResolutionPlans
			// TODO: Think through / migrate this to a roles package?
			type: Boolean
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

		/// Optional
		ssn: {
			type: Number,
			validators: [
				{
					type: 'Number',
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
