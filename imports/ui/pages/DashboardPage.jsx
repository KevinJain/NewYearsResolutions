/* globals Meteor */
import BaseComponent from '../components/BaseComponent.jsx'
import { Link } from 'react-router'
import MobileMenu from '../components/MobileMenu.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import React from 'react'
import { ResolutionLog } from '../../api/resolution_logs/resolution-logs'
import { ResolutionPlan } from '../../api/resolution_plans/resolution-plans'
import User from '../../api/users/users'
import _ from 'lodash'
import i18n from 'meteor/universe:i18n'
import moment from 'moment'

export default class DashboardPage extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, {})
	}

	render() {
		let user = Meteor.user()
		if (!user) {
			return <NotFoundPage />
		}
		user = User.findOne(user._id)
		const logs = ResolutionLog.find({ user: user._id })

		const tasksTodoContent = []
		logs.forEach(log => {
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

		const tasksDone = []
		// TODO: Make this display work for more than just booleans
		logs.forEach(log => {
			if (0 === log.completedTasks.length) {
				return
			}

			const plan = ResolutionPlan.findOne(log.resolutionPlan)
			const key = `plan::${plan._id}`
			tasksDone.push(
				<h2 key={key}>
					{plan.title}
				</h2>
			)
			const completedTasks = _.sortBy(log.completedTasks, 'completedAt').reverse()
			_.forEach(completedTasks, logTask => {
				const completedAtStr = moment(logTask.completedAt).format('dddd, MMMM Do YYYY')
				const planTask = _.find(plan.tasks, { _id: logTask.task })
				const key2 = `task::${logTask._id}`

				tasksDone.push(
					<div key={key2}>
						{planTask.title}&nbsp;on&nbsp;{completedAtStr}
					</div>
				)
			})
		})

		const content = (
			<div>
				<h1>{i18n.__('pages.dashboardPage.tasksTodoToday')}</h1>
				{tasksTodoContent}
				<h1>{i18n.__('pages.dashboardPage.progress')}</h1>
				{tasksDone}
			</div>
		)

		return (
			<div className="page dashboard">
				<nav>
					<MobileMenu />
				</nav>
				<div className="content-scrollable">
					<div className="cover">
						<img className="cover-photo" src="/placeholders/cover-photo.png" />
						<img className="profile-picture" src={user.profilePictureUrl} />
						<Link to="/newCoverPhoto" className="new-cover-photo btn-primary">
							{i18n.__('pages.dashboardPage.newCoverPhoto')}
						</Link>
						<Link to="/new-profile-pic" className="new-profile-pic btn-primary">
							{i18n.__('pages.dashboardPage.newProfilePic')}
						</Link>
					</div>
					{content}
				</div>
			</div>
		)
	}
}

DashboardPage.contextTypes = {
	router: React.PropTypes.object
}
