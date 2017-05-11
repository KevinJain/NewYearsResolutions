import _ from 'lodash';
import moment from 'moment';
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

export default class CalendarPage extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = Object.assign(this.state, {});
	}

	render() {
		const user = Meteor.user()
		if (!user) {
			const loggingOutContent = <div>Logging out</div>
			return <CalendarPage content={loggingOutContent} />;
		}

		/*
		const logs = ResolutionLog.find({user: user._id})

		let tasksTodoContent = []
		logs.forEach((log) => {
			const task = log.getTodaysScheduledTask()
			if (!task) {
				return
			}
			const linkTo = `/completion/${log._id}`
			tasksTodoContent.push(
				<div className="task-wrapper" key={task._id}>
					<Link to={linkTo} className="btn-primary">
						{task.title}
					</Link>
				</div>
			)
		})

		let tasksDone = []
		// TODO: Make this display work for more than just booleans
		logs.forEach((log) => {
			if (0 === log.completedTasks.length) {
				return
			}

			let plan = ResolutionPlan.findOne(log.resolutionPlan)
			const key = `plan::${plan._id}`
			tasksDone.push(
				<h2 key={key}>
					{plan.title}
				</h2>
			)
			let completedTasks = _.sortBy(log.completedTasks, 'completedAt').reverse()
			_.each(completedTasks, (logTask) => {
				const completedAtStr = moment(logTask.completedAt).format('dddd, MMMM Do YYYY')
				const planTask = _.find(plan.tasks, {_id: logTask.task})
				const key = `task::${logTask._id}`

				tasksDone.push(
					<div key={key}>
						{planTask.title}&nbsp;on&nbsp;{completedAtStr}
					</div>
				)
			})
		})
		*/

		/*
		const content = (
			<div>
				<h1>{i18n.__('pages.dashboardPage.tasksTodoToday')}</h1>
				{tasksTodoContent}
				<h1>{i18n.__('pages.dashboardPage.progress')}</h1>
				{tasksDone}
			</div>
		)
		*/

		const content = (
			<div>
				<h1>
					Calendar page placeholder
				</h1>
			</div>
		)

		return (
			<div className="page calendar">
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

CalendarPage.contextTypes = {
	router: React.PropTypes.object,
};
