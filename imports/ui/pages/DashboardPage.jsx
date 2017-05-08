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

		const start = new Date()
		start.setHours(0,0,0,0)
		const end = new Date()
		end.setHours(23,59,59,999)

		logs.forEach((log) => {
			console.log(`Tasks for: ${ResolutionPlan.findOne(log.resolutionPlan).title}`)
			const tasks = log.getScheduledTasksBetween(start, end)
			console.log(tasks)
		})
		alert('See the logs to tasks in date range found')

		const content = <div>Placeholder</div>

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

DashboardPage.contextTypes = {
	router: React.PropTypes.object,
};
