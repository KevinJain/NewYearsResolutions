import BaseComponent from '../components/BaseComponent.jsx'
import React from 'react'
import _ from 'lodash'
import i18n from 'meteor/universe:i18n'
import moment from 'moment'

// TODO: Remove this helper when not used?
function getSummary(resolutionsTasks) {
	if (resolutionsTasks && resolutionsTasks.length) {
		return _.map(resolutionsTasks, (resolutionTasks, ii) => {
			const completed = resolutionTasks.completed.length
			const scheduled = resolutionTasks.scheduled.length
			const total = scheduled + completed
			return (
				<div key={ii}>
					<strong>{resolutionTasks.plan.title}</strong><br />
					{completed} / {total} {i18n.__('components.metrics.completed')}
				</div>
			)
		})
	}
	return '-'
}

export class MetricsYearComponent extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, {})
	}

	render() {
		return (
			<div className="metric metric-year current">
				<div className="inner">
					<div className="last-year" onClick={this.props.jumpLastYear}>&lt;</div>
					<div className="this-year">
						<h1>{this.props.year}</h1>
						{getSummary(this.props.resolutionsTasks)}
					</div>
					<div className="next-year" onClick={this.props.jumpNextYear}>&gt;</div>
				</div>
			</div>
		)
	}
}

export class MetricsQuarterComponent extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, {})
	}

	render() {
		const start = moment().month(this.props.startMonth).format('MMM')
		const end = moment().month(this.props.endMonth).format('MMM')
		const current = this.props.current ? 'current' : ''
		const className = `metric metric-quarter ${current}`
		return (
			<div className={className}>
				<div className="inner" onClick={this.props.click}>
					<h2>Q: {start}-{end}</h2>
					{getSummary(this.props.resolutionsTasks)}
				</div>
			</div>
		)
	}
}

export class MetricsMonthComponent extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, {})
	}

	render() {
		const month = moment().month(this.props.month).format('MMMM')
		const current = this.props.current ? 'current' : ''
		const className = `metric metric-month ${current}`
		return (
			<div className={className}>
				<div className="inner" onClick={this.props.click}>
					<h3>{month}</h3>
					{getSummary(this.props.resolutionsTasks)}
				</div>
			</div>
		)
	}
}

export class MetricsWeekComponent extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, {})
	}

	render() {
		const format = 'M/D'
		const start = this.props.start.format(format)
		const end = this.props.end.format(format)
		return (
			<div className="metric metric-week">
				<div className="inner">
					<h4>{start}-{end}</h4>
					{getSummary(this.props.resolutionsTasks)}
				</div>
			</div>
		)
	}
}
