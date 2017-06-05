import { Meteor } from 'meteor/meteor'
import { Team } from '../../api/teams/teams'
import TeamPage from '../pages/TeamPage.jsx'
// import User from '../../api/users/users'
import { createContainer } from 'meteor/react-meteor-data'

const TeamPageContainer = createContainer(({ params: { teamId } }) => {
	const teamHandle = Meteor.subscribe('teamsOne', teamId)
	const membersHandle = Meteor.subscribe('teamMembers', teamId)
	const loading = !(teamHandle.ready() && membersHandle.ready())

	const team = Team.findOne(teamId)
	const members = Meteor.users.find({ teams: teamId }).fetch()
	return {
		loading,
		members,
		team
	}
}, TeamPage)

export default TeamPageContainer
