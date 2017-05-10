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

export default class DashboardPage extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = Object.assign(this.state, {});
	}

	render() {
		const user = Meteor.user()
		if (!user) {
			const loggingOutContent = <div>Logging out</div>
			return <DashboardPage content={loggingOutContent} />;
		}
		const logs = ResolutionLog.find({user: user._id})

		let tasksContent = []
		logs.forEach((log) => {
			const task = log.getTodaysScheduledTask()
			if (task) {
				const linkTo = `/completion/${log._id}`
				tasksContent.push(
					<div className="task-wrapper" key={task._id}>
						<Link to={linkTo} className="btn-primary">
							{task.title}
						</Link>
					</div>
				)
			}
		})

		const content = (
			<div>
				<h1>Placeholder</h1>
				{tasksContent}
			</div>
		)

		return (
			<div className="page dashboard">
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

DashboardPage.contextTypes = {
	router: React.PropTypes.object,
};
