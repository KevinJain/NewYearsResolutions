import { Meteor } from 'meteor/meteor'
import { Teams } from '../../api/teams/teams'
import TeamsPage from '../pages/TeamsPage.jsx'
import User from '../../api/users/users'
import { createContainer } from 'meteor/react-meteor-data'

const TeamsPageContainer = createContainer(() => {
	const userId = Meteor.user() && Meteor.user()._id
	const teamsHandle = Meteor.subscribe('teamsAll')
	const loading = !teamsHandle.ready()

	const user = User.findOne(userId)
	const teams = Teams.find().fetch()
	return {
		loading,
		user,
		teams
	}
}, TeamsPage)

export default TeamsPageContainer
