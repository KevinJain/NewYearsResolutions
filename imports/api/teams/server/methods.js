import { Meteor } from 'meteor/meteor'
import { Team } from '../teams'
import User from '../../users/users'
import _ from 'lodash'
import { check } from 'meteor/check'

Meteor.methods({
	'teams.user.leave': teamId => {
		// Enforce logged in
		const userId = Meteor.userId()
		check(userId, String)

		// Enforce passed data ok
		check(teamId, String)

		// Enforce team exists
		const team = Team.findOne(teamId)
		if (!team) {
			throw new Meteor.Error('bad-params', 'Team does not exist')
		}

		// TODO: Enforce user on team

		const user = User.findOne(userId)
		_.pull(user.teams, teamId)
		user.save()
	},
	'teams.user.join': teamId => {
		// Enforce logged in
		const userId = Meteor.userId()
		check(userId, String)

		// Enforce passed data ok
		check(teamId, String)

		// Enforce team exists
		const team = Team.findOne(teamId)
		if (!team) {
			throw new Meteor.Error('bad-params', 'Team does not exist')
		}

		// Save user as joining team
		const user = User.findOne(userId)
		user.teams = _.union(user.teams, [teamId])
		user.save()
	},
	'teams.user.create': teamName => {
		// Enforce logged in
		const userId = Meteor.userId()
		check(userId, String)

		// Enforce passed data ok
		check(teamName, String)

		// Save data passed in
		const team = new Team()
		team.title = teamName
		team.admins = [userId]
		team.save()
		return team
	},
	'teams.set.extrainfo': (teamId, extrainfo) => {
		// Enforce logged in
		const userId = Meteor.userId()
		check(userId, String)

		// Enforce passed data ok
		check(teamId, String)
		check(extrainfo, String)

		// Enforce team exists
		const team = Team.findOne(teamId)
		if (!team) {
			throw new Meteor.Error('bad-params', 'Team does not exist')
		}

		// TODO: Enforce user on team

		team.extrainfo = extrainfo
		team.save()
	}
})
