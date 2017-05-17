/* globals Meteor */
import { ProofType, ResolutionPlan } from '../../api/resolution_plans/resolution-plans'
import BaseComponent from '../components/BaseComponent.jsx'
import MobileMenu from '../components/MobileMenu.jsx'
import React from 'react'
import { ResolutionLog } from '../../api/resolution_logs/resolution-logs'
import UploadImage from '../components/UploadImage.jsx'
import _ from 'lodash'
import i18n from 'meteor/universe:i18n'

// http://stackoverflow.com/a/18628124
// TODO: Replace this cork.mp3
// TODO: 1. Could sound better
// TODO: 2. Not sure on licencing, grabbed from
// http://www.freesoundeffects.com/free-sounds/household-10036/
const goodSound = new Audio('cork.mp3')

class SubTaskChecklistItem extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, {})
		this.change = this.change.bind(this)
	}

	change(event) {
		const checked = event.target.checked
		if (checked) {
			goodSound.play()
		}
		this.setState({ checked })
	}

	render() {
		const checkClass = this.state.checked ? 'checked' : ''
		return (
			<div key={this.props.key} className={checkClass}>
				<label>
					<input
						onChange={this.change}
						type="checkbox"
						value="test"
					/>
					{this.props.text}
				</label>
			</div>
		)
	}
}
SubTaskChecklistItem.propTypes = {
	key: React.PropTypes.string,
	text: React.PropTypes.string
}

class CompleteBooleanTask extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, {})
		this.completeBooleanTask = this.completeBooleanTask.bind(this)
	}

	completeBooleanTask(e) {
		e.preventDefault()

		const task = this.props.log.getTodaysScheduledTask()
		const completedAt = new Date()

		Meteor.call(
			'resolutionlogs.tasks.complete.boolean',
			this.props.log._id,
			task._id,
			completedAt,
			(err, res) => {
				if (err) {
					alert('Error completing task')
					return
				}
				this.props.success()
			}
		)
	}

	render() {
		return (
			<div>
				<button onClick={this.completeBooleanTask} className="btn-primary">
					{i18n.__('pages.completionPage.completeTodaysTask')}
				</button>
			</div>
		)
	}
}
CompleteBooleanTask.propTypes = {
	log: React.PropTypes.object,
	success: React.PropTypes.func
}

class CompleteImageTask extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, {})
		this.imageProofUploaded = this.imageProofUploaded.bind(this)
	}

	imageProofUploaded(result) {
		const task = this.props.log.getTodaysScheduledTask()
		const completedAt = new Date()

		Meteor.call(
			'resolutionlogs.tasks.complete.image',
			this.props.log._id,
			task._id,
			completedAt,
			result.public_id,
			(err, res) => {
				if (err) {
					alert('Error completing task')
					return
				}
				this.props.success()
			}
		)
	}

	render() {
		return (
			<div>
				<h3>{i18n.__('pages.completionPage.uploadImageProof')}</h3>
				<UploadImage
					success={this.imageProofUploaded}
				/>
			</div>
		)
	}
}
CompleteImageTask.propTypes = {
	log: React.PropTypes.object,
	success: React.PropTypes.func
}

export default class CompletionPage extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, {})
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
		const success = () => {
			this.context.router.replace('/dashboard')
		}

		// Setup: task
		const subTaskChecklistItems = _.map(task.subTaskChecklist, (item, ii) =>
			(
				<SubTaskChecklistItem
					key={ii}
					text={item}
				/>
			)
		)

		let completeBooleanTask = ''
		if (_.includes(plan.proofTypes, ProofType.BOOLEAN)) {
			completeBooleanTask = (
				<CompleteBooleanTask log={log} success={success} />
			)
		}

		let completeImageTask = ''
		if (_.includes(plan.proofTypes, ProofType.IMAGE)) {
			completeImageTask = (
				<CompleteImageTask log={log} success={success} />
			)
		}

		const content = (
			<div className="page completion">
				<h3>{i18n.__('pages.completionPage.completeTodaysPlan')}</h3>
				<h1>{planTitle}</h1>
				<h2>{taskName}</h2>
				<p>{taskDescription}</p>

				<div className="sub-task-checklist-items">
					{subTaskChecklistItems}
				</div>

				{completeBooleanTask}
				{completeImageTask}
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
