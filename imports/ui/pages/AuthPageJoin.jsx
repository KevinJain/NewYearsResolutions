import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';

import AuthPage from './AuthPage.jsx';

export default class JoinPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, { errors: {} });
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.email.value;
    const password = this.password.value;
    const confirm = this.confirm.value;
    const errors = {};

    if (!email) {
      errors.email = i18n.__('pages.authPageJoin.emailRequired');
    }
    if (!password) {
      errors.password = i18n.__('pages.authPageJoin.passwordRequired');
    }
    if (confirm !== password) {
      errors.confirm = i18n.__('pages.authPageJoin.passwordConfirm');
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
  }

  render() {
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    const content = (
      <div className="wrapper-auth">
        <h1 className="title-auth">
			Coming soon
        </h1>
        <p className="subtitle-auth">
			A webapp to help you reach your goals!
        </p>
		<iframe className="intro-video" src="https://www.youtube.com/embed/GPaYrhUZSYQ" frameBorder="0" allowFullScreen></iframe>
      </div>
    );

    const link = (
      <Link to="/signin" className="link-auth-alt">
        {i18n.__('pages.authPageJoin.haveAccountSignIn')}
      </Link>
    );

    return <AuthPage content={content} />;
  }
}

JoinPage.contextTypes = {
  router: React.PropTypes.object,
};
