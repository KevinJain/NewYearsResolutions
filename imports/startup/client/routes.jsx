import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import i18n from 'meteor/universe:i18n';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import ListPageContainer from '../../ui/containers/ListPageContainer.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
import SubscribePageBasics from '../../ui/pages/SubscribePageBasics.jsx';
import SubscribePagePlans from '../../ui/pages/SubscribePagePlans.jsx';
import SubscribePageJoin from '../../ui/pages/SubscribePageJoin.jsx';
import DashboardPage from '../../ui/pages/DashboardPage.jsx';
import CompletionPage from '../../ui/pages/CompletionPage.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

i18n.setLocale('en');

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <Route path="lists/:id" component={ListPageContainer} />
      <Route path="signin" component={AuthPageSignIn} />
      <Route path="join" component={AuthPageJoin} />
      <Route path="dashboard" component={DashboardPage} />
      <Route path="completion/:resolutionPlan" component={CompletionPage} />
      <Route path="subscribe-basics" component={SubscribePageBasics} />
      <Route path="subscribe-plans" component={SubscribePagePlans} />
      <Route path="subscribe-join" component={SubscribePageJoin} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
);
