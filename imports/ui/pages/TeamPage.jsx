/* eslint-disable lodash/import-scope */
import BaseComponent from '../components/BaseComponent.jsx'
import MobileMenu from '../components/MobileMenu.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import React from 'react'
import _ from 'lodash'

export default class TeamPage extends BaseComponent {
	constructor(props, context) {
		super(props)
	}

	render() {
		if (this.props.loading) {
			return <NotFoundPage />
		}
		const memberEls = _.map(this.props.members, member =>
			<div className="member" key={member._id}>
				<h4>{member.firstName} {member.lastName}</h4>
				<p>Phone: {member.phone}</p>
			</div>
		)

		return (
			<div className="page team">
				<nav>
					<MobileMenu />
				</nav>
				<div className="content-scrollable">
					<h2>Team: {this.props.team.title}</h2>

					<h3>Team Members</h3>
					<div className="members">
						{memberEls}
					</div>
					<div>
						<h2>Invite someone to your team</h2>
						<div className="sharethis-inline-share-buttons" />
					</div>
				</div>
			</div>
		)
	}
}

TeamPage.propType = {
	team: React.PropTypes.object,
	members: React.PropTypes.array,
	loading: React.PropTypes.bool
}

TeamPage.contextTypes = {
	router: React.PropTypes.object
}
