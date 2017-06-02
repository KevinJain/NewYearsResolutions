import { Meteor } from 'meteor/meteor'
import { Teams } from '../teams'

// TODO: Something smart with team messages, will get out of hand when a lot
Meteor.publish('teamsAll', () => Teams.find())
