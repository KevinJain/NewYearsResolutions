/* globals Meteor */
import BaseComponent from '../components/BaseComponent.jsx'
import MobileMenu from '../components/MobileMenu.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import React from 'react'
import _ from 'lodash'

export default class MyCustomPlansPage extends BaseComponent {
	constructor(props, context) {
		super(props)
		this.state = {
			newPlanTitle: '',
			newPlanDaysPerWeek: 7,
			newPlanDays: 30,
			newPlanTasksTitle: ''
		}
		this.changeInput = this.changeInput.bind(this)
		this.createPlan = this.createPlan.bind(this)
		this.clearForm = this.clearForm.bind(this)
	}

	changeInput(ev) {
		const target = ev.target
		const name = target.name
		const val = target.value
		this.setState({
			[name]: val
		})
	}

	createPlan(ev) {
		ev.preventDefault()
		const basicPlanInfo = {
			title: this.state.newPlanTitle,
			days: this.state.newPlanDays,
			daysPerWeek: this.state.newPlanDaysPerWeek,
			tasksTitle: this.state.newPlanTasksTitle
		}
		Meteor.call('resolution_plans.create.custom.basic', basicPlanInfo, (err, plan) => {
			if (err) {
				console.log(err)
				alert(`Error creating plan: ${err.details[0].message} (Also see console log)`)
				return
			}
			Meteor.call(
				'resolutionlogs.user.start',
				{
					resolutionPlanId: plan._id,
					daysPerWeekSuggested: plan.daysPerWeekSuggested
				},
				(err, res) => {
					if (err) {
						console.log(err)
						alert(`Start plan error: ${err.details[0].message} (Also see console log)`)
						return
					}
					this.clearForm()
				}
			)
		})
	}

	clearForm() {
		this.setState({
			newPlanTitle: '',
			newPlanDaysPerWeek: 7,
			newPlanDays: 30,
			newPlanTasksTitle: ''
		})
	}

	// eslint-disable-next-line max-statements
	render() {
		if (this.props.loading) {
			return <NotFoundPage />
		}
		const daysPerWeekOptions = _.map(_.range(1, 7 + 1), daysPerWeek =>
			<option key={daysPerWeek} value={daysPerWeek}>{daysPerWeek}</option>
		)
		const myCustomPlans = _.map(this.props.resolutionPlans, plan =>
			<div key={plan._id}>
				{plan.title}
			</div>
		)

		return (
			<div className="page my-custom-plans">
				<nav>
					<MobileMenu />
				</nav>
				<div>
					<div>
						<h2>Create a custom plan (Work In Progress)</h2>

						<form onSubmit={this.createPlan}>
							Plan Title
							{' '}
							<input
								value={this.state.newPlanTitle}
								name="newPlanTitle"
								type="text"
								onChange={this.changeInput}
							/>
							<br />

							How many days should this plan go?
							<input
								name="newPlanDays"
								type="number"
								value={this.state.newPlanDays}
								onChange={this.changeInput}
							/>
							<br />

							How many days per week?
							<select
								name="newPlanDaysPerWeek"
								value={this.state.newPlanDaysPerWeek}
								onChange={this.changeInput}
							>
								{daysPerWeekOptions}
							</select>
							<br />

							What should it say to do on each of these days?
							<input
								value={this.state.newPlanTasksTitle}
								type="text"
								name="newPlanTasksTitle"
								onChange={this.changeInput}
							/>
							<br />
							<input
								className="btn-primary"
								type="submit"
								value="Create & start on my custom plan today"
							/>
						</form>
					</div>
					<div>
						<h2>My custom plans (Work In Progress)</h2>
						{myCustomPlans}
					</div>
				</div>
			</div>
		)
	}
}

MyCustomPlansPage.propType = {
	resolutionPlans: React.PropTypes.array,
	loading: React.PropTypes.bool
}
