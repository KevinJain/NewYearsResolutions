import Cloudinary from 'cloudinary'
import { Meteor } from 'meteor/meteor'

Meteor.methods({
	'cloudinary.sign_request': () => {
		// Inspired by 04/06/2017 comment at
		//   https://support.cloudinary.com/hc/en-us/articles/207885595-How-can-I-generate-the-signed-upload-payload-on-my-server-
		const millisecondsToSeconds = 1000
		const timestamp = Math.round(Date.now() / millisecondsToSeconds)
		const signature = Cloudinary.utils.api_sign_request(
			{ timestamp },
			Meteor.settings.cloudinary.secret
		)
		return {
			signature,
			timestamp
		}
	}
})
