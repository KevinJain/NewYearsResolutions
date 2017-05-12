/* global document */

import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { renderRoutes } from '../imports/startup/client/routes.jsx'
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css'

Meteor.startup(() => {
	// Global subscriptions ; data we always want availble
	Meteor.subscribe('userData')
	Meteor.subscribe('resolutionPlansAll')
	Meteor.subscribe('resolutionLogsUser')

	// Configuration
	Stripe.setPublishableKey(Meteor.settings.public.stripe.publishable_key)

	// Render the application
	render(renderRoutes(), document.getElementById('app'))
})
