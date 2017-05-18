import BaseComponent from '../components/BaseComponent.jsx'
import React from 'react'
import moment from 'moment'

export class MetricsYearComponent extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, {})
	}

	render() {
		return (
			<div className="metric metric-year">
				<div className="inner">
					<h1>{this.props.year}</h1>
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
		return (
			<div className="metric metric-quarter">
				<div className="inner">
					<h2>Q: {start}-{end}</h2>
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
		return (
			<div className="metric metric-month">
				<div className="inner">
					<h3>{month}</h3>
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
					{start}-{end}
				</div>
			</div>
		)
	}
}
