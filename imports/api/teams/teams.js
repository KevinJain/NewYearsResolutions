/* globals Mongo */
import { Class } from 'meteor/jagi:astronomy'

export const Teams = new Mongo.Collection('Teams')
export const Team = Class.create({
	name: 'Team',
	collection: Teams,
	fields: {
		/// Required
		_id: String,
		admins: {
			type: [String]
		},
		title: {
			type: String,
			validators: [
				{
					type: 'minLength',
					param: 3
				}
			]
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
