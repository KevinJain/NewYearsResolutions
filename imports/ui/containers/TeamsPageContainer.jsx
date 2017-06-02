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
	const allTeams = Teams.find().fetch()
	const myTeams = Teams.find({ _id: { $in: user.teams } }).fetch()
	return {
		loading,
		user,
		allTeams,
		myTeams
	}
}, TeamsPage)

export default TeamsPageContainer
