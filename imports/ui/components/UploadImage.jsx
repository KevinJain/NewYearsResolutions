/* globals Meteor */
import BaseComponent from '../components/BaseComponent.jsx'
import React from 'react'

export default class UploadImage extends BaseComponent {
	constructor(props) {
		super(props)

		Meteor.call('cloudinary.sign_request', (err, cloudinary) => {
			// TODO: Real error handling
			if (err) {
				alert('Error getting cloudinary signature')
				return
			}
			this.setState({
				cloudinarySignature: cloudinary.signature,
				cloudinaryTimestamp: cloudinary.timestamp
			})
		})
	}

	componentDidUpdate() {
		const el = $('.cloudinary-fileupload')
		const events = $._data(el[0], 'events')
		const cloudinaryFileuploadIsSetup = events && events.length > 0
		if (
			!cloudinaryFileuploadIsSetup &&
			this.state.cloudinarySignature &&
			this.state.cloudinaryTimestamp &&
			$.fn.cloudinary_fileupload !== undefined // eslint-disable-line no-undefined
		) {
			el.cloudinary_fileupload()
			el.bind('cloudinarydone', (event, data) => {
				// TODO: Add error checking before calling success
				// TODO: Do something if error
				this.props.success(data.result)
			})
		}
	}

	render() {
		// Cloudinary
		const cloudinaryConfig = JSON.stringify({
			// "callback": "https://www.example.com/cloudinary_cors.html",
			timestamp: this.state.cloudinaryTimestamp,
			signature: this.state.cloudinarySignature,
			api_key: Meteor.settings.public.cloudinary.key
		})
		return (
			<input
				name="file"
				type="file"
				className="cloudinary-fileupload"
				data-cloudinary-field="image_id"
				data-form-data={cloudinaryConfig}
			/>
		)
	}
}

UploadImage.contextTypes = {
	success: React.PropTypes.func
}
