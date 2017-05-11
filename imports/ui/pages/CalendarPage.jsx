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
		this.state = Object.assign(this.state, {});
	}

	render() {
		const user = Meteor.user()
		if (!user) {
			const loggingOutContent = <div>Logging out</div>
			return <CalendarPage content={loggingOutContent} />;
		}

		/*
		const logs = ResolutionLog.find({user: user._id})

		let tasksTodoContent = []
		logs.forEach((log) => {
			const task = log.getTodaysScheduledTask()
			if (!task) {
				return
			}
			const linkTo = `/completion/${log._id}`
			tasksTodoContent.push(
				<div className="task-wrapper" key={task._id}>
					<Link to={linkTo} className="btn-primary">
						{task.title}
					</Link>
				</div>
			)
		})

		let tasksDone = []
		// TODO: Make this display work for more than just booleans
		logs.forEach((log) => {
			if (0 === log.completedTasks.length) {
				return
			}

			let plan = ResolutionPlan.findOne(log.resolutionPlan)
			const key = `plan::${plan._id}`
			tasksDone.push(
				<h2 key={key}>
					{plan.title}
				</h2>
			)
			let completedTasks = _.sortBy(log.completedTasks, 'completedAt').reverse()
			_.each(completedTasks, (logTask) => {
				const completedAtStr = moment(logTask.completedAt).format('dddd, MMMM Do YYYY')
				const planTask = _.find(plan.tasks, {_id: logTask.task})
				const key = `task::${logTask._id}`

				tasksDone.push(
					<div key={key}>
						{planTask.title}&nbsp;on&nbsp;{completedAtStr}
					</div>
				)
			})
		})
		*/

		/*
		const content = (
			<div>
				<h1>{i18n.__('pages.dashboardPage.tasksTodoToday')}</h1>
				{tasksTodoContent}
				<h1>{i18n.__('pages.dashboardPage.progress')}</h1>
				{tasksDone}
			</div>
		)
		*/

		const events = [
		  {
			'title': 'All Day Event',
			'allDay': true,
			'start': new Date(2015, 3, 0),
			'end': new Date(2015, 3, 1)
		  },
		  {
			'title': 'Long Event',
			'start': new Date(2015, 3, 7),
			'end': new Date(2015, 3, 10)
		  },

		  {
			'title': 'DTS STARTS',
			'start': new Date(2016, 2, 13, 0, 0, 0),
			'end': new Date(2016, 2, 20, 0, 0, 0)
		  },

		  {
			'title': 'DTS ENDS',
			'start': new Date(2016, 10, 6, 0, 0, 0),
			'end': new Date(2016, 10, 13, 0, 0, 0)
		  },

		  {
			'title': 'Some Event',
			'start': new Date(2015, 3, 9, 0, 0, 0),
			'end': new Date(2015, 3, 9, 0, 0, 0)
		  },
		  {
			'title': 'Conference',
			'start': new Date(2015, 3, 11),
			'end': new Date(2015, 3, 13),
			desc: 'Big conference for important people'
		  },
		  {
			'title': 'Meeting',
			'start': new Date(2015, 3, 12, 10, 30, 0, 0),
			'end': new Date(2015, 3, 12, 12, 30, 0, 0),
			desc: 'Pre-meeting meeting, to prepare for the meeting'
		  },
		  {
			'title': 'Lunch',
			'start':new Date(2015, 3, 12, 12, 0, 0, 0),
			'end': new Date(2015, 3, 12, 13, 0, 0, 0),
			desc: 'Power lunch'
		  },
		  {
			'title': 'Meeting',
			'start':new Date(2015, 3, 12,14, 0, 0, 0),
			'end': new Date(2015, 3, 12,15, 0, 0, 0)
		  },
		  {
			'title': 'Happy Hour',
			'start':new Date(2015, 3, 12, 17, 0, 0, 0),
			'end': new Date(2015, 3, 12, 17, 30, 0, 0),
			desc: 'Most important meal of the day'
		  },
		  {
			'title': 'Dinner',
			'start':new Date(2015, 3, 12, 20, 0, 0, 0),
			'end': new Date(2015, 3, 12, 21, 0, 0, 0)
		  },
		  {
			'title': 'Birthday Party',
			'start':new Date(2015, 3, 13, 7, 0, 0),
			'end': new Date(2015, 3, 13, 10, 30, 0)
		  }
		]
		const defaultDate = new Date(2015, 3, 12)

		const content = (
			<div>
				<h1>{i18n.__('pages.calendarPage.title')}</h1>
				<h3>{i18n.__('pages.calendarPage.subTitle')}</h3>
				<ResolutionCalendar
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
