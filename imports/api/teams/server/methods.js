import { Meteor } from 'meteor/meteor'
import { Team } from '../teams'
import { check } from 'meteor/check'

Meteor.methods({
	'teams.user.create': teamName => {
		// Enforce logged in
		const userId = Meteor.userId()
		check(userId, String)

		// Enforce passed an object (meant to hold basic information)
		check(teamName, String)

		// Save data passed in
		const team = new Team()
		team.title = teamName
		team.admins = [userId]
		team.save()
	}
})
