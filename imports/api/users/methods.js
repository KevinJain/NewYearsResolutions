import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { User } from './users.js'

Meteor.methods({
	'users.registration.saveBasics': (basics) => {
		// Enforce logged in
		const userId = Meteor.userId()
		check(userId, String)

		// Enforce passed an object (meant to hold basic information)
		check(basics, Object)

		// Save data passed in
		const user = User.findOne(userId)
		user.firstName = basics.firstName
		user.lastName = basics.lastName
		user.phone = basics.phone
		user.save() // Will throw an error back if fails
	}
})
