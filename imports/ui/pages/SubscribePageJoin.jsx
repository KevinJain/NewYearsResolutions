/* Globals Stripe */
import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';

import SubscribePage from './SubscribePage.jsx';

export default class JoinPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, { errors: {} });
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
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
		if (status !== 200) {
			this.setState((prevState, props) => {
				const errors = {}
				errors.stripe = response.error.message;
				return {
					errors
				}
			})
			return
		}

		stripeToken = response.id
		Meteor.call('stripe.subscription.create', stripeToken, (err, res) => {
			if(err) {
				console.log(err)
				// TODO: Add real error handling if bad value returned from Meteor?
				alert('Error subscribing, see console')
			} else {
				// TODO: Add in real flow here / adjust form / etc as needed
				alert('Subscription successful TODO: Redirect user somewhere')
			}
		});
	})
    event.preventDefault();
	/*
    const email = this.email.value;
    const password = this.password.value;
    const confirm = this.confirm.value;
    const errors = {};

    if (!email) {
      errors.email = i18n.__('pages.subscribePageJoin.emailRequired');
    }
    if (!password) {
      errors.password = i18n.__('pages.subscribePageJoin.passwordRequired');
    }
    if (confirm !== password) {
      errors.confirm = i18n.__('pages.subscribePageJoin.passwordConfirm');
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Accounts.createUser({
      email,
      password,
    }, (err) => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
      }
      this.context.router.push('/');
    });
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
          {i18n.__('pages.subscribePageJoin.subscribe')}
        </h1>
        <p className="subtitle-subscribe">
          {i18n.__('pages.subscribePageJoin.reason')}
        </p>
        <form onSubmit={this.onSubmit}>
          <div className="list-errors">
            {errorMessages.map(msg => (
              <div className="list-item" key={msg}>{msg}</div>
            ))}
          </div>
          <div className={`input-symbol ${errorClass('ccnumber')}`}>
            <input
			  type="text"
              name="ccnumber"
              ref={(c) => { this.ccnumber= c; }}
              placeholder={i18n.__('pages.subscribePageJoin.ccNumber')}
            />
          </div>
          <div className={`input-symbol ${errorClass('ccexpmonth')}`}>
            <input
			  type="text"
              name="ccexpmonth"
              ref={(c) => { this.ccexpmonth= c; }}
              placeholder={i18n.__('pages.subscribePageJoin.ccExpMonth')}
            />
          </div>
          <div className={`input-symbol ${errorClass('ccexpyear')}`}>
            <input
			  type="text"
              name="ccexpyear"
              ref={(c) => { this.ccexpyear= c; }}
              placeholder={i18n.__('pages.subscribePageJoin.ccExpYear')}
            />
          </div>
          <div className={`input-symbol ${errorClass('cccvc')}`}>
            <input
			  type="text"
              name="cccvc"
              ref={(c) => { this.cccvc= c; }}
              placeholder={i18n.__('pages.subscribePageJoin.ccCvc')}
            />
          </div>
          <button type="submit" className="btn-primary">
            {i18n.__('pages.subscribePageJoin.subscribeNow')}
          </button>
        </form>
      </div>
    );

	/*
    const link = (
      <Link to="/signin" className="link-subscribe-alt">
        {i18n.__('pages.subscribePageJoin.haveAccountSignIn')}
      </Link>
    );
	*/

    return <SubscribePage content={content} />;
  }
}

JoinPage.contextTypes = {
  router: React.PropTypes.object,
};
