/* globals Meteor */
import '/imports/startup/server'
import { BrowserPolicy } from 'meteor/browser-policy'

Meteor.startup(() => {
	BrowserPolicy.content.allowOriginForAll('https://js.stripe.com/')
	BrowserPolicy.content.allowOriginForAll('https://www.youtube.com/')
	BrowserPolicy.content.allowOriginForAll('https://ajax.googleapis.com/')
	BrowserPolicy.content.allowOriginForAll('https://res.cloudinary.com/')
	BrowserPolicy.content.allowOriginForAll('https://platform-api.sharethis.com/')
	BrowserPolicy.content.allowOriginForAll('http://buttons-config.sharethis.com')
})
