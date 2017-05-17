/* global document, Stripe */

import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css'

import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import renderRoutes from '../imports/startup/client/routes.jsx'

Meteor.startup(() => {
	// Configuration
	Stripe.setPublishableKey(Meteor.settings.public.stripe.publishable_key)

	// Render the application
	render(renderRoutes(), document.getElementById('app'))
})
