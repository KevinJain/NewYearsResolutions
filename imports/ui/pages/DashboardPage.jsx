/* globals Meteor */
import {
	MetricsMonthComponent,
	MetricsQuarterComponent,
	MetricsWeekComponent,
	MetricsYearComponent
} from '../components/Metrics.jsx'
import BaseComponent from '../components/BaseComponent.jsx'
import { Link } from 'react-router'
import MobileMenu from '../components/MobileMenu.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import React from 'react'
import { ResolutionPlan } from '../../api/resolution_plans/resolution-plans'
import _ from 'lodash'
import i18n from 'meteor/universe:i18n'
import moment from 'moment'

export default class DashboardPage extends BaseComponent {
	constructor(props, context) {
		super(props)

		this.state = Object.assign(this.state, {
			date: moment()
		})

		// If no userId in url and logged in, redirect to users' own dashboard
		if (!props.params.userId && Meteor.user()) {
			// TODO: Rewrite this probably a better way with react-router
			// TODO:   than starting the constructor
			// TODO: * This is causing an error "setState(...): Cannot update"
			const userId = Meteor.user()._id
			context.router.replace(`/dashboard/${userId}`)
			return
		}

		this.createSetDateCallback = this.createSetDateCallback.bind(this)
		this.resolutionsTasks = this.resolutionsTasks.bind(this)
		this.yearRange = this.yearRange.bind(this)
		this.quartersRanges = this.quartersRanges.bind(this)
		this.monthsRanges = this.monthsRanges.bind(this)
		this.weeksRanges = this.weeksRanges.bind(this)
	}

	createSetDateCallback(momentDate) {
		return () => this.setState({ date: momentDate.clone() })
	}

	resolutionsTasks(start, end) {
		const logs = this.props.logs
		if (!logs) {
			return {
				completed: [],
				scheduled: []
			}
		}
		const startDate = start.toDate()
		const endDate = end.toDate()
		return _.filter(
			logs.map(log => ({
				plan: ResolutionPlan.findOne(log.resolutionPlan),
				scheduled: log.getScheduledTasksBetween(startDate, endDate),
				completed: _.filter(log.completedTasks, task => {
					const completedAt = task.completedAt
					return completedAt >= startDate && completedAt <= endDate
				})
			})),
			resolutionTasks =>
				resolutionTasks.scheduled.length > 0 || resolutionTasks.completed.length > 0
		)
	}

	yearRange() {
		const start = this.state.date.clone().startOf('year')
		const end = this.state.date.clone().endOf('year')
		return {
			start,
			end,
			resolutionsTasks: this.resolutionsTasks(start, end)
		}
	}

	quartersRanges() {
		const year = this.state.date.clone().year()
		const month = this.state.date.clone().month()
		const monthRanges = [[0, 2], [3, 5], [6, 8], [9, 11]]
		return _.map(monthRanges, range => {
			const startMonth = range[0]
			const endMonth = range[1]
			const start = moment().year(year).month(startMonth).startOf('month')
			const end = moment().year(year).month(endMonth).endOf('month')
			const current = month >= startMonth && month <= endMonth

			return {
				current,
				start,
				end,
				resolutionsTasks: this.resolutionsTasks(start, end)
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
			const start = m.clone().startOf('month')
			const end = m.clone().endOf('month')
			const current = month === mon

			return {
				current,
				start,
				end,
				resolutionsTasks: this.resolutionsTasks(start, end)
			}
		})
	}

	weeksRanges() {
		const weekNumbers = _.uniq(
			_.map(_.range(0, 31), day =>
				this.state.date.clone().startOf('month').day(day).week()
			)
		)
		return _.map(weekNumbers, week => {
			const m = this.state.date.clone().week(week)
			const start = m.clone().startOf('week')
			const end = m.clone().endOf('week')
			return {
				start,
				end,
				resolutionsTasks: this.resolutionsTasks(start, end)
			}
		})
	}

	render() {
		// eslint-disable-line max-statements
		if (this.props.loading || !this.props.params.userId) {
			return <NotFoundPage />
		}
		const user = this.props.user
		const logs = this.props.logs

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
				let taskText = ''
				if (logTask.proof.text) {
					taskText = (
						<div className="proof-text">
							"{logTask.proof.text}"
						</div>
					)
				}

				tasksDone.push(
					<div className="task-completed-container" key={key2}>
						<h4>{planTask.title}&nbsp;on&nbsp;{completedAtStr}</h4>
						{taskImage}
						{taskText}
					</div>
				)
			})
		})

		const yearRange = this.yearRange()
		const quartersRanges = this.quartersRanges()
		const monthsRanges = this.monthsRanges()
		const weeksRanges = this.weeksRanges()

		const quarters = _.map(quartersRanges, (range, ii) => (
			<MetricsQuarterComponent
				key={ii}
				startMonth={range.start.month()}
				endMonth={range.end.month()}
				resolutionsTasks={range.resolutionsTasks}
				current={range.current}
				click={this.createSetDateCallback(range.start)}
			/>
		))

		const months = _.map(monthsRanges, (range, ii) => (
			<MetricsMonthComponent
				key={ii}
				month={range.start.month()}
				resolutionsTasks={range.resolutionsTasks}
				current={range.current}
				click={this.createSetDateCallback(range.start)}
			/>
		))

		const weeks = _.map(weeksRanges, (range, ii) => (
			<MetricsWeekComponent
				key={ii}
				start={range.start.clone()}
				end={range.end.clone()}
				current={range.current}
				resolutionsTasks={range.resolutionsTasks}
			/>
		))

		const lastYear = yearRange.start.clone().subtract(1, 'year').startOf('year')
		const nextYear = yearRange.start.clone().add(1, 'year').startOf('year')
		const metrics = (
			<div className="metrics">
				<MetricsYearComponent
					year={yearRange.start.year()}
					resolutionsTasks={yearRange.resolutionsTasks}
					jumpLastYear={this.createSetDateCallback(lastYear)}
					jumpNextYear={this.createSetDateCallback(nextYear)}
				/>
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

		let newCoverPhoto = ''
		let newProfilePic = ''
		let tasksTodo = ''
		let nameText = ''
		if (this.props.onUsersOwnDashboard) {
			newCoverPhoto = (
				<Link to="/new-cover-photo" className="new-cover-photo btn-primary">
					{i18n.__('pages.dashboardPage.newCoverPhoto')}
				</Link>
			)
			newProfilePic = (
				<Link to="/new-profile-pic" className="new-profile-pic btn-primary">
					{i18n.__('pages.dashboardPage.newProfilePic')}
				</Link>
			)
			tasksTodo = (
				<div>
					<h1>{i18n.__('pages.dashboardPage.tasksTodoToday')}</h1>
					{tasksTodoContent}
				</div>
			)
		} else {
			nameText = (
				<h2 className="name-text">
					{this.props.user.firstName} {this.props.user.lastName}
				</h2>
			)
		}

		return (
			<div className="page dashboard">
				<nav>
					<MobileMenu />
				</nav>
				<div className="content-scrollable">
					{/*
					<div className="cover">
						<img className="cover-photo" src={user.coverPhotoUrl} />
						<img className="profile-picture" src={user.profilePictureUrl} />
						{newCoverPhoto}
						{newProfilePic}
						{nameText}
					</div>
					*/}

					{tasksTodo}

					<h1>{i18n.__('pages.dashboardPage.metrics')}</h1>
					{metrics}

					<h1>{i18n.__('pages.dashboardPage.progress')}</h1>
					{tasksDone}
				</div>
			</div>
		)
	}
}

DashboardPage.propType = {
	user: React.PropTypes.object,
	todos: React.PropTypes.array,
	loading: React.PropTypes.bool,
	onUsersOwnDashboard: React.PropTypes.bool
}

DashboardPage.contextTypes = {
	router: React.PropTypes.object
}
