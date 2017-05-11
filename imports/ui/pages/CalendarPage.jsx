import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import MobileMenu from '../components/MobileMenu.jsx';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';
import { ResolutionPlan } from '../../api/resolution_plans/resolution-plans.js';
import { ResolutionLog } from '../../api/resolution_logs/resolution-logs.js';
import { ResolutionLogsHelpers } from '../../api/resolution_logs/resolution-logs.js';
import BigCalendar from 'react-big-calendar';
import NotFoundPage from '../pages/NotFoundPage.jsx';

import { User } from '../../api/users/users.js'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class ResolutionCalendar extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = Object.assign(this.state, {})
	}

	render() {
		return (
			<div>
				<BigCalendar
					selectable
					onNavigate={this.props.onNavigate}
					events={this.props.events}
					defaultView='month'
					scrollToTime={new Date(1970, 1, 1, 6)}
					defaultDate={this.props.defaultDate}
					views={['month']}
					onSelectEvent={event => alert(event.title)}
					onSelectSlot={(slotInfo) => alert(
						`selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
						`\nend: ${slotInfo.end.toLocaleString()}`
					)}
				/>
			</div>
		)
	}
}

export default class CalendarPage extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = Object.assign(this.state, {
			start: moment().startOf('month').toDate(),
			end: moment().endOf('month').toDate()
		})
		this.onNavigate = this.onNavigate.bind(this)
	}

	onNavigate(to, type) {
		this.setState({
			start: moment(to).startOf('month').toDate(),
			end: moment(to).endOf('month').toDate()
		})
	}

	render() {
		const user = Meteor.user()
		if (!user) {
			return <NotFoundPage />;
		}


		const logs = ResolutionLog.find({user: user._id})

		let events = []
		logs.forEach((log) => {
			const tasks = log.getScheduledTasksBetween(this.state.start, this.state.end)
			_.forEach(tasks, (task) => {
				const taskStart = task.when
				const taskEnd = moment(task.when).endOf('day').toDate()
				events.push(
					{
						title: `${task.task.title}`,
						allDay: true,
						start: taskStart,
						end: taskEnd
					}
				)
			})
		})

		const defaultDate = new Date()
		const content = (
			<div>
				<h1>{i18n.__('pages.calendarPage.title')}</h1>
				<h3>{i18n.__('pages.calendarPage.subTitle')}</h3>
				<ResolutionCalendar
					onNavigate={this.onNavigate}
					events={events}
					defaultDate={defaultDate}
				/>
			</div>
		)

		return (
			<div className="page calendar">
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

CalendarPage.contextTypes = {
	router: React.PropTypes.object,
};
