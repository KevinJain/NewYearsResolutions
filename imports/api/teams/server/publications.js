import { Meteor } from 'meteor/meteor'
import { Teams } from '../teams'

Meteor.publish('teamsAll', () => Teams.find())
