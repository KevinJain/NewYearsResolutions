/* globals Meteor */
import {
	ResolutionLog,
	ResolutionLogsHelpers
} from '../../api/resolution_logs/resolution-logs'
import BaseComponent from '../components/BaseComponent.jsx'
import React from 'react'
import { ResolutionPlan } from '../../api/resolution_plans/resolution-plans'
import SubscribePage from './SubscribePage.jsx'
import i18n from 'meteor/universe:i18n'

export default class PlansPage extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, { selectingPlan: false, goalStatement: '' })
		this.onSubmit = this.onSubmit.bind(this)
		this.togglePlan = this.togglePlan.bind(this)
		this.changeGoalStatement = this.changeGoalStatement.bind(this)
	}

	changeGoalStatement(ev) {
		this.setState({ goalStatement: ev.target.value })
	}

	onSubmit(event) {
		event.preventDefault()

		Meteor.call('users.newGoalStatement', this.state.goalStatement, (err, res) => {
			if (err) {
				console.log(err)
				alert('Problem submitting / adding goal statement')
				return
			}
		})

		const user = Meteor.user()
		if (!ResolutionLogsHelpers.userHas(user._id)) {
			alert('Please follow one or more plans before continuing')
			return
		}
		this.context.router.replace('/subscribe-join')
	}

	togglePlan(event, resolutionPlan, toggleOn) {
		event.preventDefault()
		this.setState({ selectingPlan: true })
		if (toggleOn) {
			const logBasics = {
				resolutionPlanId: resolutionPlan._id,
				daysPerWeekSuggested: resolutionPlan.daysPerWeekSuggested
			}
			Meteor.call('resolutionlogs.user.start', logBasics, (err, res) => {
				this.setState({ selectingPlan: false })
				if (err) {
					console.log(err)
					alert('Error')
				}
			})
		} else {
			Meteor.call('resolutionlogs.user.destroy', resolutionPlan._id, (err, res) => {
				this.setState({ selectingPlan: false })
				if (err) {
					console.log(err)
					alert('Error')
				}
			})
		}
	}

	render() {
		const user = Meteor.user()
		if (!user) {
			const loggingOutContent = <div>Logging out</div>
			return <SubscribePage content={loggingOutContent} />
		}

		const plans = ResolutionPlan.find({ owner: null })
		const plansContent = plans.map(plan => {
			const query = { user: user._id, resolutionPlan: plan._id }
			const log = ResolutionLog.findOne(query)

			if (log) {
				return (
					<button
						key={plan._id}
						className="btn-secondary"
						onClick={e => this.togglePlan(e, plan, false)}
					>
						Unfollow plan: {plan.title}
					</button>
				)
			}
			return (
				<button
					key={plan._id}
					className="btn-primary"
					onClick={e => this.togglePlan(e, plan, true)}
				>
					Follow plan: {plan.title}
				</button>
			)
		})

		const content = (
			<div className="wrapper-subscribe">
				<form onSubmit={this.onSubmit}>
					<h1>Goal Statement</h1>
					<textarea
						value={this.state.goalStatement}
						onChange={this.changeGoalStatement}
					/>
					<h1 className="title-subscribe">
						{i18n.__('pages.subscribePagePlans.pickPlans')}
					</h1>
					<p className="subtitle-subscribe">
						{i18n.__('pages.subscribePagePlans.reason')}
					</p>
					{plansContent}
					<button type="submit" className="btn-primary">
						{i18n.__('pages.subscribePagePlans.continue')}
					</button>
				</form>
			</div>
		)

		return <SubscribePage content={content} />
	}
}

PlansPage.contextTypes = {
	router: React.PropTypes.object
}
