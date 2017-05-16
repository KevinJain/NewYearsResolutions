/* globals Meteor */
import BaseComponent from '../components/BaseComponent.jsx'
import { Link } from 'react-router'
import MobileMenu from '../components/MobileMenu.jsx'
import React from 'react'
import { ResolutionLog } from '../../api/resolution_logs/resolution-logs'
import { ResolutionPlan } from '../../api/resolution_plans/resolution-plans'
import i18n from 'meteor/universe:i18n'

export default class CompletionPage extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, {})
		this.completeBooleanTask = this.completeBooleanTask.bind(this)

		// TODO: Split out Cloudinary Upload into it's own react component (1 of 3)?
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
		// TODO: Split out Cloudinary Upload into it's own react component (2 of 3)?
		if (
			this.state.cloudinarySignature &&
			this.state.cloudinaryTimestamp &&
			($.fn.cloudinary_fileupload !== undefined) // eslint-disable-line no-undefined
		) {
			$('input.cloudinary-fileupload[type=file]').cloudinary_fileupload()
			$('.cloudinary-fileupload').bind('cloudinarydone', (event, data) => {
				// TODO: Something with this data and stop alerting
				alert('Done upload to cloudinary, see console. TODO: Do something w/it')
				console.log(data.result)
				console.log(data.result.secure_url)
			})
		}
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

		// TODO: Split out Cloudinary Upload into it's own react component (1 of 3)?
		// Cloudinary
		const cloudinaryConfig = JSON.stringify({
			// "callback": "https://www.example.com/cloudinary_cors.html",
			timestamp: this.state.cloudinaryTimestamp,
			signature: this.state.cloudinarySignature,
			api_key: Meteor.settings.public.cloudinary.key
		})
		const cloudinaryUpload = (
			<input
				name="file"
				type="file"
				className="cloudinary-fileupload"
				data-cloudinary-field="image_id"
				data-form-data={cloudinaryConfig}
			>
			</input>
		)

		const content = (
			<div className="page completion">
				<h3>{i18n.__('pages.completionPage.completeTodaysPlan')}</h3>
				<h1>{planTitle}</h1>
				<h2>{taskName}</h2>
				<p>{taskDescription}</p>
				<div>
					{cloudinaryUpload}
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
