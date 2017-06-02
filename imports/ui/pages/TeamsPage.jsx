/* globals Meteor */
import BaseComponent from '../components/BaseComponent.jsx'
import MobileMenu from '../components/MobileMenu.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

function LeaveTeamButton(props) {
	function leaveTeam() {
		Meteor.call('teams.user.leave', props.teamId, (err, res) => {
			if (err) {
				alert('Error leaving team')
			}
		})
	}
	return <button className="btn-primary" onClick={leaveTeam}>Leave Team</button>
}
LeaveTeamButton.propTypes = {
	teamId: PropTypes.string
}

function JoinTeamButton(props) {
	function joinTeam() {
		Meteor.call('teams.user.join', props.teamId, (err, res) => {
			if (err) {
				alert('Error joining team')
			}
		})
	}
	return <button className="btn-primary" onClick={joinTeam}>Join Team</button>
}
JoinTeamButton.propTypes = {
	teamId: PropTypes.string
}

function TeamBlock(props) {
	// TODO: Box teams (grid like?)
	return (
		<div className="team-block">
			<h3>{props.team.title}</h3>
			{'leave' === props.action ? <LeaveTeamButton teamId={props.team._id} /> : ''}
			{'join' === props.action ? <JoinTeamButton teamId={props.team._id} /> : ''}
		</div>
	)
}
TeamBlock.propTypes = {
	action: PropTypes.oneOf(['leave', 'join']),
	team: PropTypes.object.isRequired
}

export default class TeamsPage extends BaseComponent {
	constructor(props, context) {
		super(props)

		this.state = Object.assign(this.state, {
			newTeamName: ''
		})
		this.createTeam = this.createTeam.bind(this)
		this.changeNewTeamName = this.changeNewTeamName.bind(this)
	}

	createTeam(ev) {
		ev.preventDefault()
		Meteor.call('teams.user.create', this.state.newTeamName, (err, res) => {
			if (err) {
				alert('Error adding team')
				return
			}
			this.setState({ newTeamName: '' })
		})
	}

	changeNewTeamName(ev) {
		const newTeamName = ev.target.value
		this.setState({
			newTeamName
		})
	}

	// eslint-disable-next-line max-statements
	render() {
		if (this.props.loading) {
			return <NotFoundPage />
		}
		const myTeamEls = this.props.myTeams.map(team => (
			<div key={team._id}><TeamBlock action="leave" team={team} /></div>
		))
		const allTeamEls = this.props.allTeams.map(team => (
			<div key={team._id}>
				<TeamBlock
					action={_.includes(this.props.user.teams, team._id) ? null : 'join'}
					team={team}
				/>
				<br />
			</div>
		))

		return (
			<div className="page teams">
				<nav>
					<MobileMenu />
				</nav>
				<div className="content-scrollable">
					<div>
						<h2>My teams</h2>
						{myTeamEls}
					</div>
					<div>
						<h2>Create a team</h2>
						<form onSubmit={this.createTeam}>
							Name:
							<input
								type="text"
								value={this.state.newTeamName}
								onChange={this.changeNewTeamName}
							/>
							<br />
							<input type="submit" value="Submit" />
						</form>
					</div>
					<div>
						<h2>All teams</h2>
						{allTeamEls}
					</div>
				</div>
			</div>
		)
	}
}

TeamsPage.propType = {
	user: React.PropTypes.object,
	teams: React.PropTypes.array,
	loading: React.PropTypes.bool
}

TeamsPage.contextTypes = {
	router: React.PropTypes.object
}
