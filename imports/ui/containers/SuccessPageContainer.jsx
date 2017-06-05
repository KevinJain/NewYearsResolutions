/* globals Meteor */
import { ResolutionLog } from '../../api/resolution_logs/resolution-logs'
import SuccessPage from '../pages/SuccessPage.jsx'
import { createContainer } from 'meteor/react-meteor-data'

const SuccessPageContainer = createContainer(() => {
	const userId = Meteor.user()._id
	const logsHandle = Meteor.subscribe('resolutionLogsOtherUser', userId)
	const loading = !logsHandle.ready()

	const logs = ResolutionLog.find({ user: userId }).fetch()

	return {
		loading,
		logs
	}
}, SuccessPage)

export default SuccessPageContainer
