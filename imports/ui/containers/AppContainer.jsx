import App from '../layouts/App.jsx'
import { Meteor } from 'meteor/meteor'
// TODO: no-session!
import { Session } from 'meteor/session'
import _ from 'lodash'
import { createContainer } from 'meteor/react-meteor-data'

export default createContainer(() => {
	const subscriptions = [
		Meteor.subscribe('userData'),
		Meteor.subscribe('resolutionPlansAll'),
		Meteor.subscribe('resolutionLogsUser')
	]

	return {
		user: Meteor.user(),
		loading: !_.every(subscriptions, subscription => subscription.ready()),
		connected: Meteor.status().connected,
		menuOpen: Session.get('menuOpen') // eslint-disable-line meteor/no-session
	}
}, App)
