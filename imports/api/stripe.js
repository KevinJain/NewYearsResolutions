import { Meteor } from 'meteor/meteor'
import stripePackage from 'stripe'
import { check } from 'meteor/check'
const stripe = stripePackage(Meteor.settings.stripe.secret_key);

Meteor.methods({
	'stripe.subscription.create': (stripeToken) => {
		// Enforce logged in
		const userId = Meteor.userId()
		check(userId, String)

		// Enforce passed a stripe token
		check(stripeToken, String)

		stripe.customers
			.create({source: stripeToken})
			.then((customer) => stripe.subscriptions.create({customer: customer.id, plan: 'standard'}))
			.then((subscription) => {
				// TODO: Do something with this subscription -- Save it to the user?
				console.log('Created Subscription')
				console.log(subscription)
			})
	}
})
