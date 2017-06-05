import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { ResolutionPlan } from '../../resolution_plans/resolution-plans'
import _ from 'lodash'
import { check } from 'meteor/check'

Meteor.methods({
	'resolution_plans.create.custom.basic': basicPlanInfo => {
		// Enforce logged in
		const userId = Meteor.userId()
		check(userId, String)

		// Enforce passed an object (meant to hold basic information)
		check(basicPlanInfo, Object)

		// Create a basic plan from data passed in
		const plan = new ResolutionPlan()
		plan.planId = Random.id()
		plan.owner = userId
		plan.title = basicPlanInfo.title
		plan.proofTypes = [0] // Just a checkbox
		plan.daysPerWeekSuggested = basicPlanInfo.daysPerWeek
		plan.tasks = _.map(_.range(0, basicPlanInfo.days), order => ({
			_id: Random.id(),
			order,
			title: basicPlanInfo.tasksTitle
		}))
		plan.save()
		return plan
	}
})
