/* globals Meteor */
import BaseComponent from '../components/BaseComponent.jsx'
import { Link } from 'react-router'
import MobileMenu from '../components/MobileMenu.jsx'
import React from 'react'
import { ResolutionLog } from '../../api/resolution_logs/resolution-logs'
import { ResolutionPlan } from '../../api/resolution_plans/resolution-plans'
import i18n from 'meteor/universe:i18n'

export default class CompletionPage extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, {})
		this.completeBooleanTask = this.completeBooleanTask.bind(this)
	}

	completeBooleanTask(e) {
		e.preventDefault()

		const log = ResolutionLog.findOne(this.props.params.resolutionLog)
		const task = log.getTodaysScheduledTask()
		const completedAt = new Date()

		Meteor.call(
			'resolutionlogs.tasks.complete',
			log._id,
			task._id,
			completedAt,
			(err, res) => {
				if (err) {
					alert('Error completing task')
					return
				}
				this.context.router.replace('/dashboard')
			}
		)
	}

	render() {
		// Confirm logged in
		const user = Meteor.user()
		if (!user) {
			const loggingOutContent = <div>Logging out</div>
			return <CompletionPage content={loggingOutContent} />
		}

		// Get data
		const log = ResolutionLog.findOne(this.props.params.resolutionLog)
		const plan = ResolutionPlan.findOne(log.resolutionPlan)
		const task = log.getTodaysScheduledTask()

		// Setup
		const taskName = task.title
		const taskDescription = task.description
		const planTitle = plan.title

		const content = (
			<div className="page completion">
				<h3>{i18n.__('pages.completionPage.completeTodaysPlan')}</h3>
				<h1>{planTitle}</h1>
				<h2>{taskName}</h2>
				<p>{taskDescription}</p>

				<div>
					<button onClick={this.completeBooleanTask} className="btn-primary">
						{i18n.__('pages.completionPage.completeTodaysTask')}
					</button>
				</div>

				<div>
					<Link to="/dashboard" className="btn-secondary">
						{i18n.__('pages.completionPage.dashboard')}
					</Link>
				</div>
			</div>
		)

		return (
			<div className="page subscribe">
				<nav>
					<MobileMenu />
				</nav>
				<div className="content-scrollable">
					{content}
				</div>
			</div>
		)
	}
}

CompletionPage.contextTypes = {
	router: React.PropTypes.object
}
