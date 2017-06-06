/* globals Meteor */
import MyDataPage from '../pages/MyDataPage.jsx'
import User from '../../api/users/users'
import { createContainer } from 'meteor/react-meteor-data'

const MyDataPageContainer = createContainer(() => {
	const userId = Meteor.user() && Meteor.user()._id
	const user = User.findOne(userId)
	return {
		user
	}
}, MyDataPage)

export default MyDataPageContainer
