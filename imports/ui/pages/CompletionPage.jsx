/* globals Meteor */
import BaseComponent from '../components/BaseComponent.jsx'
import { Link } from 'react-router'
import MobileMenu from '../components/MobileMenu.jsx'
import React from 'react'
import { ResolutionLog } from '../../api/resolution_logs/resolution-logs'
import { ResolutionPlan } from '../../api/resolution_plans/resolution-plans'
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

SubTaskChecklistItem.contextTypes = {
	key: React.PropTypes.string,
	text: React.PropTypes.string
}

class UploadImage extends BaseComponent {
	constructor(props) {
		super(props)

		Meteor.call('cloudinary.sign_request', (err, cloudinary) => {
			// TODO: Real error handling
			if (err) {
				alert('Error getting cloudinary signature')
				return
			}
			this.setState({
				cloudinarySignature: cloudinary.signature,
				cloudinaryTimestamp: cloudinary.timestamp
			})
		})
	}

	componentDidUpdate() {
		if (
			this.state.cloudinarySignature &&
			this.state.cloudinaryTimestamp &&
			($.fn.cloudinary_fileupload !== undefined) // eslint-disable-line no-undefined
		) {
			$('input.cloudinary-fileupload[type=file]').cloudinary_fileupload()
			$('.cloudinary-fileupload').bind('cloudinarydone', (event, data) => {
				// TODO: Add error checking before calling success
				// TODO: Do something if error
				this.props.success(data.result)
			})
		}
	}

	render() {
		// Cloudinary
		const cloudinaryConfig = JSON.stringify({
			// "callback": "https://www.example.com/cloudinary_cors.html",
			timestamp: this.state.cloudinaryTimestamp,
			signature: this.state.cloudinarySignature,
			api_key: Meteor.settings.public.cloudinary.key
		})
		return (
			<input
				name="file"
				type="file"
				className="cloudinary-fileupload"
				data-cloudinary-field="image_id"
				data-form-data={cloudinaryConfig}
			>
			</input>
		)
	}
}

UploadImage.contextTypes = {
	success: React.PropTypes.func,
}

export default class CompletionPage extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, {})
		this.completeBooleanTask = this.completeBooleanTask.bind(this)
		this.proofUploaded = this.proofUploaded.bind(this)
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

	proofUploaded(result) {
		// TODO: Something with this data and stop alerting
		console.log(result)
		console.log(result.secure_url)
		alert('Done upload to cloudinary, see console. TODO: Do something w/it')
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

		// Setup: task
		const subTaskChecklistItems = _.map(task.subTaskChecklist, (item, ii) =>
			(
				<SubTaskChecklistItem
					key={ii}
					text={item}
				/>
			)
		)

		const content = (
			<div className="page completion">
				<h3>{i18n.__('pages.completionPage.completeTodaysPlan')}</h3>
				<h1>{planTitle}</h1>
				<h2>{taskName}</h2>
				<p>{taskDescription}</p>
				<UploadImage
					success={this.proofUploaded}
				/>

				<div className="sub-task-checklist-items">
					{subTaskChecklistItems}
				</div>

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
