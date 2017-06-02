import { Meteor } from 'meteor/meteor'
import { Teams } from '../teams'
import { check } from 'meteor/check'

// TODO: Something smart with team messages, will get out of hand when a lot
Meteor.publish('teamsAll', () => Teams.find())
Meteor.publish('teamsOne', teamId => {
	check(teamId, String)
	return Teams.find({ _id: teamId })
})
