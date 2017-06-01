import BaseComponent from '../components/BaseComponent.jsx'
import MobileMenu from '../components/MobileMenu.jsx'
import React from 'react'
import i18n from 'meteor/universe:i18n'

class ContactUsPage extends BaseComponent {
	render() {
		return (
			<div className="page contact-us">
				<nav>
					<MobileMenu />
				</nav>
				<div className="content-scrollable">
					<h2>{i18n.__('pages.contactUs.title')}</h2>
					<div>{i18n.__('pages.contactUs.mission')}</div>
				</div>
			</div>
		)
	}
}

export default ContactUsPage
