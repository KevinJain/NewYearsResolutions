/* global document */

import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.jsx';

Meteor.startup(() => {
  Stripe.setPublishableKey(Meteor.settings.public.stripe.publishable_key);
  render(renderRoutes(), document.getElementById('app'));
});
