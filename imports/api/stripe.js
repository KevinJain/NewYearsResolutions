import { Meteor } from 'meteor/meteor'
import { Promise } from 'meteor/promise'
import User from '../api/users/users'
import { check } from 'meteor/check'
import stripePackage from 'stripe'

const stripe = stripePackage(Meteor.settings.stripe.secret_key)

Meteor.methods({
	'stripe.subscription.create': stripeToken => {
		// Enforce logged in
		const userId = Meteor.userId()
		check(userId, String)

		// Enforce passed a stripe token
		check(stripeToken, String)

		// TODO: Add error handling
		const subscriptionId = Promise.await(
			stripe.customers
				.create({ source: stripeToken })
				.then(customer =>
					stripe.subscriptions.create({ customer: customer.id, plan: 'standard' })
				)
				.then(subscription => subscription.id)
		)

		// Save the subscription
		const user = User.findOne(userId)
		user.stripeSubscriptionId = subscriptionId
		user.save()
	}
})
