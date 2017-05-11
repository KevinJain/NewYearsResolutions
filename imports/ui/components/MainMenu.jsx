import React from 'react';
import { Link } from 'react-router';
import i18n from 'meteor/universe:i18n';
import BaseComponent from './BaseComponent.jsx';
import { ResolutionLogsHelpers } from '../../api/resolution_logs/resolution-logs.js';

export default class UserMenu extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = Object.assign(this.state, {
			open: false
		});
	}

	render() {
		if (!this.props.user || !ResolutionLogsHelpers.userHas(this.props.user._id)) {
			return (<div></div>)
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
	user: React.PropTypes.object,
};
