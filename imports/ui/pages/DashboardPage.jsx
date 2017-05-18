/* globals Meteor */
import { MetricsMonthComponent, MetricsQuarterComponent, MetricsWeekComponent,
	MetricsYearComponent } from '../components/Metrics.jsx'
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
		this.state = Object.assign(this.state, {
			date: moment()
		})
	}

	yearRange() {
		return {
			start: this.state.date.clone().startOf('year'),
			end: this.state.date.clone().endOf('year')
		}
	}

	quartersRanges() {
		const year = this.state.date.clone().year()
		const monthRanges = [[0, 2], [3, 5], [6, 8], [9, 11]]
		return _.map(monthRanges, range => {
			const startMonth = range[0]
			const endMonth = range[1]
			return {
				start: moment().year(year).month(startMonth).startOf('month'),
				end: moment().year(year).month(endMonth).endOf('month')
			}
		})
	}

	monthsRanges() {
		// Get list of months in current quarter
		const month = this.state.date.clone().month()
		const quarter = Math.floor(month / 3)
		const startMonth = quarter * 3
		const months = _.range(startMonth, startMonth + 3)

		// Return date ranges of each month
		return _.map(months, mon => {
			const m = moment().month(mon)
			return {
				start: m.clone().startOf('month'),
				end: m.clone().endOf('month')
			}
		})
	}

	weeksRanges() {
		const weekNumbers = _.uniq(
			_.map(
				_.range(0, 31),
				day => this.state.date.clone().startOf('month').day(day).week()
			)
		)
		return _.map(weekNumbers, week => {
			const m = this.state.date.clone().week(week)
			return {
				start: m.clone().startOf('week'),
				end: m.clone().endOf('week')
			}
		})
	}

	render() { // eslint-disable-line max-statements
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
				let taskImage = ''
				if (logTask.proof.image) {
					taskImage = (
						<div>
							<a href={logTask.proof.imageUrlLarge} target="_blank">
								<img src={logTask.proof.imageUrlThumbnail} />
							</a>
						</div>
					)
				}

				tasksDone.push(
					<div className="task-completed-container" key={key2}>
						<h4>{planTask.title}&nbsp;on&nbsp;{completedAtStr}</h4>
						{taskImage}
					</div>
				)
			})
		})

		const yearRange = this.yearRange()
		const quartersRanges = this.quartersRanges()
		const monthsRanges = this.monthsRanges()
		const weeksRanges = this.weeksRanges()

		const quarters = _.map(quartersRanges, (range, ii) =>
			<MetricsQuarterComponent
				key={ii}
				startMonth={range.start.month()}
				endMonth={range.end.month()}
			/>
		)

		const months = _.map(monthsRanges, (range, ii) =>
			<MetricsMonthComponent
				key={ii}
				month={range.start.month()}
			/>
		)

		const weeks = _.map(weeksRanges, (range, ii) =>
			<MetricsWeekComponent
				key={ii}
				start={range.start.clone()}
				end={range.end.clone()}
			/>
		)

		const metrics = (
			<div className="metrics">
				<MetricsYearComponent year={yearRange.start.year()} />
				<div className="quarters">
					{quarters}
				</div>
				<div className="months">
					{months}
				</div>
				<div className="weeks">
					{weeks}
				</div>
			</div>
		)

		return (
			<div className="page dashboard">
				<nav>
					<MobileMenu />
				</nav>
				<div className="content-scrollable">
					<div className="cover">
						<img className="cover-photo" src={user.coverPhotoUrl} />
						<img className="profile-picture" src={user.profilePictureUrl} />
						<Link to="/new-cover-photo" className="new-cover-photo btn-primary">
							{i18n.__('pages.dashboardPage.newCoverPhoto')}
						</Link>
						<Link to="/new-profile-pic" className="new-profile-pic btn-primary">
							{i18n.__('pages.dashboardPage.newProfilePic')}
						</Link>
					</div>

					<h1>{i18n.__('pages.dashboardPage.tasksTodoToday')}</h1>
					{tasksTodoContent}

					<h1>{i18n.__('pages.dashboardPage.metrics')}</h1>
					{metrics}

					<h1>{i18n.__('pages.dashboardPage.progress')}</h1>
					{tasksDone}
				</div>
			</div>
		)
	}
}

DashboardPage.contextTypes = {
	router: React.PropTypes.object
}
