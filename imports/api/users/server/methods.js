import { Meteor } from 'meteor/meteor'
import User from '../users'
import { check } from 'meteor/check'

Meteor.methods({
	'users.registration.saveBasics': basics => {
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
	},

	'users.newProfilePic': profilePicture => {
		// Enforce logged in
		const userId = Meteor.userId()
		check(userId, String)

		// Enforce passed a string
		check(profilePicture, String)

		// Save data passed in
		const user = User.findOne(userId)
		user.profilePicture = profilePicture
		user.save() // Will throw an error back if fails
	},

	'users.newCoverPhoto': coverPhoto => {
		// Enforce logged in
		const userId = Meteor.userId()
		check(userId, String)

		// Enforce passed a string
		check(coverPhoto, String)

		// Save data passed in
		const user = User.findOne(userId)
		user.coverPhoto = coverPhoto
		user.save() // Will throw an error back if fails
	},

	'users.newGoalStatement': goalStatement => {
		console.log(goalStatement)
		// Enforce logged in
		const userId = Meteor.userId()
		check(userId, String)

		// Enforce passed a string
		check(goalStatement, String)

		// Save data passed in
		const user = User.findOne(userId)
		user.goalStatement = goalStatement
		user.save() // Will throw an error back if fails
	}
})
