import { Route, Router, browserHistory } from 'react-router'
import React from 'react'
import i18n from 'meteor/universe:i18n'

/* eslint-disable sort-imports */
// route components
import AppContainer from '../../ui/containers/AppContainer.jsx'
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx'
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx'
import CalendarPage from '../../ui/pages/CalendarPage.jsx'
import CompletionPage from '../../ui/pages/CompletionPage.jsx'
import DashboardPage from '../../ui/pages/DashboardPage.jsx'
import NewProfilePic from '../../ui/pages/NewProfilePic.jsx'
import NewCoverPhoto from '../../ui/pages/NewCoverPhoto.jsx'
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx'
import SubscribePageBasics from '../../ui/pages/SubscribePageBasics.jsx'
import SubscribePageJoin from '../../ui/pages/SubscribePageJoin.jsx'
import SubscribePagePlans from '../../ui/pages/SubscribePagePlans.jsx'

i18n.setLocale('en')

// TODO: Rework esline disable of 'react/display-name'
export default () => ( // eslint-disable-line react/display-name
	<Router history={browserHistory}>
		<Route path="/" component={AppContainer}>
			<Route path="signin" component={AuthPageSignIn} />
			<Route path="join" component={AuthPageJoin} />
			<Route path="dashboard" component={DashboardPage} />
			<Route path="dashboard/:userId" component={DashboardPage} />
			<Route path="completion/:resolutionLog" component={CompletionPage} />
			<Route path="subscribe-basics" component={SubscribePageBasics} />
			<Route path="subscribe-plans" component={SubscribePagePlans} />
			<Route path="subscribe-join" component={SubscribePageJoin} />
			<Route path="new-profile-pic" component={NewProfilePic} />
			<Route path="new-cover-photo" component={NewCoverPhoto} />
			<Route path="calendar" component={CalendarPage} />
			<Route path="*" component={NotFoundPage} />
		</Route>
	</Router>
)
