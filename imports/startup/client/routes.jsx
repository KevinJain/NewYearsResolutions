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
import DashboardPageContainer from '../../ui/containers/DashboardPageContainer.jsx'
import NewProfilePic from '../../ui/pages/NewProfilePic.jsx'
import NewCoverPhoto from '../../ui/pages/NewCoverPhoto.jsx'
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx'
import SubscribePageBasics from '../../ui/pages/SubscribePageBasics.jsx'
import SubscribePageJoin from '../../ui/pages/SubscribePageJoin.jsx'
import SubscribePagePlans from '../../ui/pages/SubscribePagePlans.jsx'
import TeamsPageContainer from '../../ui/containers/TeamsPageContainer.jsx'
import TeamPageContainer from '../../ui/containers/TeamPageContainer.jsx'
import WorldPageContainer from '../../ui/containers/WorldPageContainer.jsx'
import SuccessPageContainer from '../../ui/containers/SuccessPageContainer.jsx'
import ContactUsPage from '../../ui/pages/ContactUsPage.jsx'
import MyDataPage from '../../ui/pages/MyDataPage.jsx'

i18n.setLocale('en')

// TODO: Rework esline disable of 'react/display-name'
export default () =>
	// eslint-disable-line react/display-name
	<Router history={browserHistory}>
		<Route path="/" component={AppContainer}>
			<Route path="signin" component={AuthPageSignIn} />
			<Route path="join" component={AuthPageJoin} />
			<Route path="dashboard" component={DashboardPageContainer} />
			<Route path="dashboard/:userId" component={DashboardPageContainer} />
			<Route path="completion/:resolutionLog" component={CompletionPage} />
			<Route path="subscribe-basics" component={SubscribePageBasics} />
			<Route path="contactUs" component={ContactUsPage} />
			<Route path="myData" component={MyDataPage} />
			<Route path="world" component={WorldPageContainer} />
			<Route path="mySuccesses" component={SuccessPageContainer} />
			<Route path="subscribe-plans" component={SubscribePagePlans} />
			<Route path="subscribe-join" component={SubscribePageJoin} />
			<Route path="team/:teamId" component={TeamPageContainer} />
			<Route path="teams" component={TeamsPageContainer} />
			<Route path="new-profile-pic" component={NewProfilePic} />
			<Route path="new-cover-photo" component={NewCoverPhoto} />
			<Route path="calendar" component={CalendarPage} />
			<Route path="*" component={NotFoundPage} />
		</Route>
	</Router>
