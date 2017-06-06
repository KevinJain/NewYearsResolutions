/* eslint-disable lodash/import-scope */
/* globals Mongo */
import { Class } from 'meteor/jagi:astronomy'
import { Random } from 'meteor/random'
import _ from 'lodash'

const ChatMessage = Class.create({
	name: 'ChatMessage',
	fields: {
		_id: {
			type: String,
			validators: [
				{
					type: 'required'
				}
			],
			// TODO: Ensure unique (within ResolutionPlan?) to avoid collisions
			default: () => Random.id()
		},
		message: {
			type: String,
			validators: [
				{
					type: 'required'
				},
				{
					type: 'minLength',
					param: 1
				},
				// TODO: Do something smart with length validation for urls, etc?
				{
					type: 'maxLength',
					param: 140
				}
			]
		},
		// TODO: Resolve issue of display name getting out of sync with chat messages
		fromUserDisplayName: {
			type: String,
			validators: [
				{
					type: 'required'
				}
			]
		},
		fromUserId: {
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

		/// Automatic
		// TODO: Add index on this field, we'll be querying and filtering here evntually
		createdAt: Date
	},
	behaviors: {
		timestamp: {
			hasCreatedField: true,
			createdFieldName: 'createdAt'
		}
	}
})

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
		extrainfo: {
			type: String,
			default: () => _.constant('')
		},
		// Cloudinary public id's
		images: {
			type: [String],
			default: () => []
		},
		chatMessages: {
			type: [ChatMessage],
			default: _.constant([])
		},

		/// Automatic
		createdAt: Date
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
