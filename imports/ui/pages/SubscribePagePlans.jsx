import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';
import { ResolutionPlan } from '../../api/resolution_plans/resolution-plans.js';
import { ResolutionLog } from '../../api/resolution_logs/resolution-logs.js';
import { ResolutionLogsHelpers } from '../../api/resolution_logs/resolution-logs.js';

import SubscribePage from './SubscribePage.jsx';
import { User } from '../../api/users/users.js'

export default class PlansPage extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = Object.assign(this.state, { selectingPlan: false });
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

	togglePlan(event, resolutionPlan, toggleOn) {
		const user = Meteor.user()
		this.setState({ selectingPlan: true })
		if (toggleOn) {
			const logBasics = {
				resolutionPlanId: resolutionPlan._id,
				daysPerWeekSuggested: resolutionPlan.daysPerWeekSuggested
			}
			Meteor.call('resolutionlogs.user.start', logBasics, (err, res) => {
				this.setState({ selectingPlan: false })
				if (err) {
					console.log(err)
					alert('Error')
				}
			});
		} else {
			Meteor.call('resolutionlogs.user.destroy', resolutionPlan._id, (err, res) => {
				this.setState({ selectingPlan: false })
				if (err) {
					console.log(err)
					alert('Error')
				}
			});
		}
	}

	render() {
		const user = Meteor.user()

		const plans = ResolutionPlan.find()
		const plansContent = plans.map((plan) => {
			const query = {user: user._id, resolutionPlan: plan._id}
			const log = ResolutionLog.findOne(query)

			if (log) {
				return (
					<button
						key={plan._id}
						className="btn-secondary"
						onClick={(e) => this.togglePlan(e, plan, false)}>Unfollow plan: {plan.title}
					</button>
				)
			} else {
				return (
					<button
						key={plan._id}
						className="btn-primary"
						onClick={(e) => this.togglePlan(e, plan, true)}>Follow plan: {plan.title}
					</button>
				)
			}
		})

		const content = (
			<div className="wrapper-subscribe">
				<h1 className="title-subscribe">
				  {i18n.__('pages.subscribePagePlans.pickPlans')}
				</h1>
				<p className="subtitle-subscribe">
				  {i18n.__('pages.subscribePagePlans.reason')}
				</p>
				{plansContent}
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
