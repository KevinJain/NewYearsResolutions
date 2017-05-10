import { ResolutionPlan } from '../../api/resolution_plans/resolution-plans.js'
import _ from 'lodash'

const plans = [
	'run-a-5k.json',
	'60-day-multi-vitamin.json'
]

// TODO: Enhance this so we can import updates without id over-writes?
// TODO: * Maybe just add id's the .json content?
console.log('Importing ResolutionPlans')
_.each(plans, (plan) => {
	const data = JSON.parse(Assets.getText(`resolution_plans/${plan}`))
	let rp = ResolutionPlan.findOne({planId: data.planId})
	if (rp) {
		console.log(`* Skipping ${plan} as exists (so we don't overwrite shallow and deep ids)`)
		return
	}
	console.log(`* ${plan}`)
	rp = new ResolutionPlan()
	_.forOwn(data, (val, key) => {
		rp[key] = val
	})
	rp.save()
})
