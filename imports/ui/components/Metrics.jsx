import BaseComponent from '../components/BaseComponent.jsx'
import React from 'react'

export class MetricsYearComponent extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, {})
	}

	render() {
		return (
			<div className="metric metric-year">
				<div className="inner">
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
		return (
			<div className="metric metric-quarter">
				<div className="inner">
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
		return (
			<div className="metric metric-month">
				<div className="inner">
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
		return (
			<div className="metric metric-week">
				<div className="inner">
				</div>
			</div>
		)
	}
}
