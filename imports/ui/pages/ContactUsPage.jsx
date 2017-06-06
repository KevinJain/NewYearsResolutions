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
					<h2>Leave a note</h2>
					<ul>
						<li>Feature requests</li>
						<li>Things you like</li>
						<li>Other Feedback</li>
					</ul>
					<h2>
						JOIN OUR TEAM!
					</h2>
					<p>
						TO INTERVIEW NOW, CALL 949-482-9555!!
					</p>
					<p>
						Developers contact
						{' '}
						<a href="mailto:AnthonyAstige+KJ8000000000Dev@gmail.com">
							AnthonyAstige+KJ8000000000Dev@gmail.com
						</a>
					</p>
					{/*
					<form>
						<textarea></textarea>
						<input type="submit" />
					<form>
					*/}
				</div>
			</div>
		)
	}
}

export default ContactUsPage
