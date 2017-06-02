import { Meteor } from 'meteor/meteor'
import { Team } from '../../api/teams/teams'
import TeamPage from '../pages/TeamPage.jsx'
import { createContainer } from 'meteor/react-meteor-data'

const TeamPageContainer = createContainer(({ params: { teamId } }) => {
	const teamHandle = Meteor.subscribe('teamsOne', teamId)
	const loading = !teamHandle.ready()

	const team = Team.findOne(teamId)
	return {
		loading,
		team
	}
}, TeamPage)

export default TeamPageContainer
