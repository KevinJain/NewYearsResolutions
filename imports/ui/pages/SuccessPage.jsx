/* eslint-disable lodash/import-scope */
import BaseComponent from '../components/BaseComponent.jsx'
import MobileMenu from '../components/MobileMenu.jsx'
import React from 'react'
import { ResolutionPlan } from '../../api/resolution_plans/resolution-plans'
import _ from 'lodash'
import i18n from 'meteor/universe:i18n'
import moment from 'moment'

class SuccessPage extends BaseComponent {
	render() {
		const logs = this.props.logs

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

		return (
			<div className="page success-page">
				<nav>
					<MobileMenu />
				</nav>
				<div className="content-scrollable">
					<h2>
						{i18n.__('pages.SuccessPage.title')}
					</h2>

					<h3>{i18n.__('pages.dashboardPage.progress')}</h3>
					{tasksDone}
				</div>
			</div>
		)
	}
}

export default SuccessPage
