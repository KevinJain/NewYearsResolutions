import { Class } from 'meteor/jagi:astronomy';

const Teams = new Mongo.Collection('Teams');
const Team = Class.create({
	name: 'Team',
	collection: Teams,
	fields: {
		/// Required
		_id: {
			type: Mongo.ObjectID
		},
		admins: {
			type: [Mongo.ObjectID]
		},
		title: {
			type: String,
			validators: [{
				type: 'minLength',
				param: 3
			}]
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
