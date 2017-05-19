import DashboardPage from '../pages/DashboardPage.jsx'
import { Meteor } from 'meteor/meteor'
import { ResolutionLog } from '../../api/resolution_logs/resolution-logs'
import User from '../../api/users/users'
import { createContainer } from 'meteor/react-meteor-data'

const DashboardPageContainer = createContainer(({ params: { userId } }) => {
	if (!userId) {
		return { loading: false }
	}
	const userHandle = Meteor.subscribe('otherUser', userId)
	const logsHandle = Meteor.subscribe('resolutionLogsOtherUser', userId)
	const loading = !userHandle.ready() && !logsHandle.ready()

	const user = User.findOne(userId)
	const logs = ResolutionLog.find({ user: userId })
	return {
		loading,
		user,
		logs
	}
}, DashboardPage)

export default DashboardPageContainer
