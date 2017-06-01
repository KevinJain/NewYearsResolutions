/* globals Meteor */
import BaseComponent from '../components/BaseComponent.jsx'
import React from 'react'
import SubscribePage from './SubscribePage.jsx'
import i18n from 'meteor/universe:i18n'

export default class BasicsPage extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = Object.assign(this.state, { errors: {} })
		this.onSubmit = this.onSubmit.bind(this)
	}

	onSubmit(event) {
		event.preventDefault()
		const userBasics = {
			firstName: this.firstname.value,
			lastName: this.lastname.value,
			phone: this.phone.value
		}
		Meteor.call('users.registration.saveBasics', userBasics, (err, res) => {
			if (err) {
				this.setState((prevState, props) => {
					const errors = {}
					// TODO: Make this display all errors (adjust server code too)
					errors[err.details[0].name] = err.details[0].message
					return {
						errors
					}
				})
			} else {
				this.context.router.replace('/subscribe-plans')
			}
		})
	}

	render() {
		const { errors } = this.state
		const errorMessages = Object.keys(errors).map(key => errors[key])
		const errorClass = key => errors[key] && 'error'

		const content = (
			<div className="wrapper-subscribe">
				<h1 className="title-subscribe">
					{i18n.__('pages.subscribePageBasics.subscribe')}
				</h1>
				<p className="subtitle-subscribe">
					{i18n.__('pages.subscribePageBasics.reason')}
				</p>
				<form onSubmit={this.onSubmit}>
					<div className="list-errors">
						{errorMessages.map(msg => <div className="list-item" key={msg}>{msg}</div>)}
					</div>
					<div className={`input-symbol ${errorClass('firstname')}`}>
						<input
							type="text"
							name="firstname"
							ref={c => {
								this.firstname = c
							}}
							placeholder={i18n.__('pages.subscribePageBasics.firstName')}
						/>
					</div>
					<div className={`input-symbol ${errorClass('lastname')}`}>
						<input
							type="text"
							name="lastname"
							ref={c => {
								this.lastname = c
							}}
							placeholder={i18n.__('pages.subscribePageBasics.lastName')}
						/>
					</div>
					<div className={`input-symbol ${errorClass('phone')}`}>
						<input
							type="text"
							name="phone"
							ref={c => {
								this.phone = c
							}}
							placeholder={i18n.__('pages.subscribePageBasics.phone')}
						/>
					</div>

					<button type="submit" className="btn-primary">
						{i18n.__('pages.subscribePageBasics.continue')}
					</button>
				</form>
			</div>
		)

		return <SubscribePage content={content} />
	}
}

BasicsPage.contextTypes = {
	router: React.PropTypes.object
}
