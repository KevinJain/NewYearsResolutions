import { Meteor } from 'meteor/meteor'
import { ResolutionPlans } from '../resolution-plans'

Meteor.publish('resolutionPlansAll', () => ResolutionPlans.find())
