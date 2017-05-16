import App from '../layouts/App.jsx'
import { Meteor } from 'meteor/meteor'
// TODO: no-session!
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'

export default createContainer(() => (
	// TODO: Add our loading here
	// const publicHandle = Meteor.subscribe('lists.public');
	// const privateHandle = Meteor.subscribe('lists.private');
	{
		user: Meteor.user(),
		// loading: !(publicHandle.ready() && privateHandle.ready()),
		loading: false,
		connected: Meteor.status().connected,
		menuOpen: Session.get('menuOpen') // eslint-disable-line meteor/no-session
	}
), App)
