import BaseComponent from './BaseComponent.jsx'
import { Link } from 'react-router'
import React from 'react'
import { ResolutionLogsHelpers } from '../../api/resolution_logs/resolution-logs'
// import i18n from 'meteor/universe:i18n'

export default class UserMenu extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, {
			open: false
		})
	}

	render() {
		if (!this.props.user || !ResolutionLogsHelpers.userHas(this.props.user._id)) {
			return <div />
		}
		return (
			<div className="main-menu">
				<div>
					<Link to="/myData" className="btn-secondary">
						My Personal Data
					</Link>
				</div>
				<div>
					<Link to="/myCustomPlans" className="btn-secondary">
						My Custom Plans
					</Link>
				</div><div>
					<Link to="/dashboard" className="btn-secondary">
						My Execution Dashboard
					</Link>
				</div>
				<div>
					<Link to="/mySuccesses" className="btn-secondary">
						My Successes
					</Link>
				</div><div>
					<Link to="/calendar" className="btn-secondary">
						My Schedule
					</Link>
				</div>
				<div>
					<Link to="/teams" className="btn-secondary">
						My Teams
					</Link>
				</div>
				<div>
					<Link to="/contactUs" className="btn-secondary">
						My Contact Us / Feedback
					</Link>
				</div>
				<div>
					<Link to="/myFiles" className="btn-secondary">
						My Files
					</Link>
				</div>
			</div>
		)
	}
}

UserMenu.propTypes = {
	user: React.PropTypes.object
}
