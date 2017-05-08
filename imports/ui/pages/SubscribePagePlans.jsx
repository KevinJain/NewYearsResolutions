import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';
import { ResolutionLog } from '../../api/resolution_logs/resolution-logs.js';
import { ResolutionLogsHelpers } from '../../api/resolution_logs/resolution-logs.js';

import SubscribePage from './SubscribePage.jsx';
import { User } from '../../api/users/users.js'

export default class PlansPage extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = Object.assign(this.state, { errors: {} });
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(event) {
		event.preventDefault();

		const user = Meteor.user();
		if (!ResolutionLogsHelpers.userHas(user._id)) {
			alert("Please follow one or more plans before continuing")
			return
		}
		this.context.router.replace('/subscribe-join')
	}

	togglePlan(event) {
		alert('TODO: Toggle plan selection')
	}

	render() {
		const plans = []
		// TODO: Populate all with actual plan data (including key)
		plans.push(<div key="plan-a" className="" onClick={this.togglePlan}>Plan A</div>)
		plans.push(<div key="plan-b" className="" onClick={this.togglePlan}>Plan B</div>)

		const content = (
			<div className="wrapper-subscribe">
				<h1 className="title-subscribe">
				  {i18n.__('pages.subscribePagePlans.pickPlans')}
				</h1>
				<p className="subtitle-subscribe">
				  {i18n.__('pages.subscribePagePlans.reason')}
				</p>
				{plans}
				<form onSubmit={this.onSubmit}>
					<button type="submit" className="btn-primary">
					{i18n.__('pages.subscribePagePlans.continue')}
					</button>
				</form>
			</div>
		)

		return <SubscribePage content={content} />;
	}
}

PlansPage.contextTypes = {
  router: React.PropTypes.object,
};
