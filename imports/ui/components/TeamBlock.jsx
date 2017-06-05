/* globals Meteor */
import PropTypes from 'prop-types'
import React from 'react'

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

function ViewTeamButton(props, context) {
	function viewTeam() {
		context.router.replace(`/team/${props.teamId}`)
	}
	return <button className="btn-primary" onClick={viewTeam}>View Team Page</button>
}
ViewTeamButton.propTypes = {
	teamId: PropTypes.string
}
ViewTeamButton.contextTypes = {
	router: React.PropTypes.object
}

export default function TeamBlock(props) {
	// TODO: Box teams (grid like?)
	return (
		<div className="team-block">
			<h3>{props.team.title}</h3>
			{'leave' === props.action ? <LeaveTeamButton teamId={props.team._id} /> : ''}
			{'join' === props.action ? <JoinTeamButton teamId={props.team._id} /> : ''}
			<br />
			<br />
			<ViewTeamButton teamId={props.team._id} />
		</div>
	)
}
TeamBlock.propTypes = {
	action: PropTypes.oneOf(['leave', 'join']),
	team: PropTypes.object.isRequired
}
