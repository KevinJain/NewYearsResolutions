/* Globals Stripe */
import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';

import SubscribePage from './SubscribePage.jsx';

export default class BasicsPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, { errors: {} });
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
	alert('Submission received: TODO: Make this actually save');
	this.context.router.replace('/subscribe-join')
	/*
	const number = this.ccnumber.value;
	const expirationMonth = this.ccexpmonth.value;
	const expirationYear = this.ccexpyear.value;
	const cvc = this.cccvc.value;
	Stripe.card.createToken({
		number,
		cvc,
		exp_month: expirationMonth,
		exp_year: expirationYear
	}, (status, response) => {
		// TODO: Add error handling bad return value from Stripe
		// TODO: * Like bad cc, etc as can test with https://stripe.com/docs/testing#cards-responses

		stripeToken = response.id
		Meteor.call('stripe.subscription.create', stripeToken, (err, res) => {
			if(err) {
				// TODO: Add real error handling if bad value returned from Meteor?
				alert('Error subscribing')
			} else {
				// TODO: Add in real flow here / adjust form / etc as needed
				alert('Subscription successful')
			}
		});
	})
    event.preventDefault();
	*/
  }

  render() {
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';
	const stripePublishableKey = Meteor.settings.public.stripe.publishable_key;

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
            {errorMessages.map(msg => (
              <div className="list-item" key={msg}>{msg}</div>
            ))}
          </div>
          <div className={`input-symbol ${errorClass('firstname')}`}>
            <input
			  type="text"
              name="firstname"
              ref={(c) => { this.firstname= c; }}
              placeholder={i18n.__('pages.subscribePageBasics.firstName')}
            />
          </div>
          <div className={`input-symbol ${errorClass('lastname')}`}>
            <input
			  type="text"
              name="lastname"
              ref={(c) => { this.lastname= c; }}
              placeholder={i18n.__('pages.subscribePageBasics.lastName')}
            />
          </div>
          <div className={`input-symbol ${errorClass('phone')}`}>
            <input
			  type="text"
              name="phone"
              ref={(c) => { this.phone= c; }}
              placeholder={i18n.__('pages.subscribePageBasics.phone')}
            />
		  </div>

		  <p className="divide">{i18n.__('pages.subscribePageBasics.optional')}</p>

          <div className={`input-symbol ${errorClass('ssn')}`}>
            <input
			  type="text"
              name="ssn"
              ref={(c) => { this.ssn= c; }}
              placeholder={i18n.__('pages.subscribePageBasics.ssn')}
            />
          </div>
          <div className={`input-symbol ${errorClass('driverlicencenumber')}`}>
            <input
			  type="text"
              name="driverlicencenumber"
              ref={(c) => { this.driverlicencenumber= c; }}
              placeholder={i18n.__('pages.subscribePageBasics.driverLicenceNumber')}
            />
          </div>
          <div className={`input-symbol ${errorClass('passportnumber')}`}>
            <input
			  type="text"
              name="passportnumber"
              ref={(c) => { this.passportnumber= c; }}
              placeholder={i18n.__('pages.subscribePageBasics.passportNumber')}
            />
          </div>

          <button type="submit" className="btn-primary">
            {i18n.__('pages.subscribePageBasics.continue')}
          </button>
        </form>
      </div>
    );

    return <SubscribePage content={content} />;
  }
}

BasicsPage.contextTypes = {
  router: React.PropTypes.object,
};
