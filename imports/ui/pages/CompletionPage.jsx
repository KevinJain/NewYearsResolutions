import React from 'react';
import MobileMenu from '../components/MobileMenu.jsx';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';
import { ResolutionPlan } from '../../api/resolution_plans/resolution-plans.js';
import { ResolutionLog } from '../../api/resolution_logs/resolution-logs.js';
import { ResolutionLogsHelpers } from '../../api/resolution_logs/resolution-logs.js';

import { User } from '../../api/users/users.js'

export default class CompletionPage extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, {})
		this.completeBoolean = this.completeBoolean.bind(this)
	}

	completeBoolean(e) {
		console.log(e)
		alert('TODO: Implement task completion')
		e.preventDefault()
	}

	render() {
		// Confirm logged in
		const user = Meteor.user()
		if (!user) {
			const loggingOutContent = <div>Logging out</div>
			return <CompletionPage content={loggingOutContent} />;
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
					<button onClick={this.completeBoolean} className="btn-primary">
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
	router: React.PropTypes.object,
};
