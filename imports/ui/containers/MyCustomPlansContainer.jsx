import { Meteor } from 'meteor/meteor'
import MyCustomPlansPage from '../pages/MyCustomPlansPage.jsx'
import { ResolutionPlan } from '../../api/resolution_plans/resolution-plans'
import { createContainer } from 'meteor/react-meteor-data'

const MyCustomPlansPageContainer = createContainer(() => {
	const userId = Meteor.user() && Meteor.user()._id

	// TODO: Subscribe as needed, right now every user has access to every plan
	// const resolutionPlansHandle = Meteor.subscribe('', userId)
	const loading = false // !teamsHandle.ready()

	const resolutionPlans = ResolutionPlan.find({ owner: userId }).fetch()
	return {
		loading,
		resolutionPlans
	}
}, MyCustomPlansPage)

export default MyCustomPlansPageContainer
