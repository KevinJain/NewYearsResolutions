/* globals Meteor */
import BaseComponent from '../components/BaseComponent.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import React from 'react'
import UploadImage from '../components/UploadImage.jsx'
import User from '../../api/users/users'
import i18n from 'meteor/universe:i18n'

export default class NewProfilePicPage extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, {})
		this.picUploaded = this.picUploaded.bind(this)
	}

	picUploaded(result) {
		Meteor.call('users.newCoverPhoto', result.public_id, (err, res) => {
			// TODO: Real error handling
			if (err) {
				alert('Error saving new profile picture')
				return
			}
			this.context.router.replace('/dashboard')
		})
	}

	render() {
		// Confirm logged in
		let user = Meteor.user()
		if (!user) {
			return <NotFoundPage />
		}

		// Grab user object
		user = User.findOne(user._id)

		const content = (
			<div>
				<h3>{i18n.__('pages.newCoverPhoto.title')}</h3>
				<h4>{i18n.__('pages.newCoverPhoto.current')}</h4>
				<img src={user.coverPhotoUrl} />
				<h4>{i18n.__('pages.newCoverPhoto.new')}</h4>
				<UploadImage
					success={this.picUploaded}
				/>
			</div>
		)

		return (
			<div className="page newprofilepic">
				<div className="content-scrollable">
					{content}
				</div>
			</div>
		)
	}
}

NewProfilePicPage.contextTypes = {
	router: React.PropTypes.object
}
