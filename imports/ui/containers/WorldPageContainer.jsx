/* globals Meteor */
import { Teams } from '../../api/teams/teams'
import User from '../../api/users/users'
import WorldPage from '../pages/WorldPage.jsx'
import { createContainer } from 'meteor/react-meteor-data'

const WorldPageContainer = createContainer(() => {
	const userId = Meteor.user() && Meteor.user()._id
	const teamsHandle = Meteor.subscribe('teamsAll')
	const loading = !teamsHandle.ready()

	const user = User.findOne(userId)
	const allTeams = Teams.find().fetch()

	return {
		loading,
		user,
		allTeams
	}
}, WorldPage)

export default WorldPageContainer
