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
					<Link to="/dashboard" className="btn-secondary">
						Dashboard
					</Link>
				</div>
				<div>
					<Link to="/calendar" className="btn-secondary">
						Schedule
					</Link>
				</div>
			</div>
		)
	}
}

UserMenu.propTypes = {
	user: React.PropTypes.object
}
