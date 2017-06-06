/* globals Meteor */
/* eslint-disable lodash/import-scope */
import BaseComponent from '../components/BaseComponent.jsx'
import MobileMenu from '../components/MobileMenu.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import React from 'react'
import _ from 'lodash'

export default class TeamPage extends BaseComponent {
	constructor(props, context) {
		super(props)

		this.submitExtraInfo = this.submitExtraInfo.bind(this)
		this.changeExtraInfo = this.changeExtraInfo.bind(this)
	}
	componentWillMount() {
		this.state = {
			extrainfo: this.props.team && this.props.team.extrainfo
		}
	}

	submitExtraInfo(ev) {
		ev.preventDefault()
		Meteor.call(
			'teams.set.extrainfo',
			this.props.team._id,
			this.state.extrainfo,
			(err, newTeam) => {
				if (err) {
					console.log(err)
					alert('Error adding extra info to team')
					return
				}
				alert('Saved')
			}
		)
	}
	changeExtraInfo(ev) {
		this.setState({ extrainfo: ev.target.value })
	}

	render() {
		// TODO: Get rid of this hack, shouldn't be calling setState() render in
		// TODO: * Had to do because teams isn't loaded always when render is called
		// TODO: ** Can probably work around this in the container
		if (!this.state.extrainfo && this.props.team && this.props.team.extrainfo) {
			this.setState({ extrainfo: this.props.team.extrainfo })
		}

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
					<div>
						<h2>Team: {this.props.team.title}</h2>

						<h3>Team Members</h3>
						<div className="members">
							{memberEls}
						</div>
					</div>
					<div className="clear">
						<form onSubmit={this.submitExtraInfo}>
							<h3>Extra information</h3>
							<p>
								Stuff like: Ideas, venues, events, times, taks, speakers, images,
								arts, concepts, donations / funding needs, locations, etc.
							</p>
							<textarea value={this.state.extrainfo} onChange={this.changeExtraInfo} />
							<input type="submit" value="submit" />
						</form>

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
