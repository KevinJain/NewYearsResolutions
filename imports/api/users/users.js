/* globals Meteor */
import { Class } from 'meteor/jagi:astronomy'
import _ from 'lodash'

export default Class.create({
	name: 'User',
	collection: Meteor.users,
	fields: {
		/// Default Meteor feidls
		_id: String, // TODO
		emails: [Object],
		services: Object,

		/// Required
		teams: {
			// TODO: Enforce uniqueness
			type: [String],
			default: () => []
		},
		planner: {
			// If the user can create ResolutionPlans
			// TODO: Think through / migrate this to a roles package?
			type: Boolean,
			default: _.constant(false)
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
		goalStatement: {
			type: String,
			optional: true
		},
		coverPhoto: {
			// Cloudinary image id
			type: String,
			optional: true,
			// TODO: Add real validation here it's a cloudinary id
			validators: [
				{
					type: 'minLength',
					param: 10
				},
				{
					type: 'maxLength',
					param: 100
				}
			]
		},
		coverPhotoUrl: {
			// Auto-generated field from coverPhoto
			type: String
		},
		profilePicture: {
			// Cloudinary image id
			type: String,
			optional: true,
			// TODO: Add real validation here it's a cloudinary id
			validators: [
				{
					type: 'minLength',
					param: 10
				},
				{
					type: 'maxLength',
					param: 100
				}
			]
		},
		profilePictureUrl: {
			// Auto-generated field from profilePicture
			type: String
		},
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
	events: {
		afterInit(e) {
			// Get current doc & setup re-used information
			const doc = e.currentTarget
			const cloudinaryPrefix = 'https://res.cloudinary.com/'
			const cloudName = Meteor.settings.public.cloudinary.name

			const proP = doc.profilePicture
			const pTrans = 'w_170,h_170,c_fill'
			if (proP) {
				doc.profilePictureUrl = `${cloudinaryPrefix}${cloudName}/image/upload/${pTrans}/${proP}.jpg`
			} else {
				doc.profilePictureUrl = '/placeholders/profile-picture.png'
			}

			const coverP = doc.coverPhoto
			const cTrans = 'w_820,h_312,c_fill'
			if (coverP) {
				doc.coverPhotoUrl = `${cloudinaryPrefix}${cloudName}/image/upload/${cTrans}/${coverP}.jpg`
			} else {
				doc.coverPhotoUrl = '/placeholders/cover-photo.png'
			}
		}
	},
	helpers: {
		// Checks if the user has their basic information filled in or not
		basicsFull() {
			return Boolean(this.firstName && this.lastName && this.phone)
		},
		// TODO: Maybe make this and all calls to it do something smart
		// TODO: * Like check if subscription is active via stripe API call
		hasStripeSubscription() {
			return Boolean(this.stripeSubscriptionId)
		}
	}
})
