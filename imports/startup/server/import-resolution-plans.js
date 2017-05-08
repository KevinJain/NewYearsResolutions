import { ResolutionPlan } from '../../api/resolution_plans/resolution-plans.js'
import _ from 'lodash'

const plans = [
	'run-a-5k.json',
	'60-day-multi-vitamin.json'
]

console.log('Importing ResolutionPlans')
_.each(plans, (plan) => {
	const data = JSON.parse(Assets.getText(`resolution_plans/${plan}`))
	console.log(`* ${plan}`)
	let rp = ResolutionPlan.findOne({planId: data.planId})
	if (!rp) {
		rp = new ResolutionPlan()
	}
	_.forOwn(data, (val, key) => {
		rp[key] = val
	})
	rp.save()
})
