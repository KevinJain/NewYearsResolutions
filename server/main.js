import '/imports/startup/server';
import { BrowserPolicy } from 'meteor/browser-policy';

Meteor.startup(() => {
	BrowserPolicy.content.allowOriginForAll("https://js.stripe.com/")
	BrowserPolicy.content.allowOriginForAll("https://www.youtube.com/")
});
