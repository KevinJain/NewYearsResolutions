/* globals Meteor */
import BaseComponent from '../components/BaseComponent.jsx'
import MobileMenu from '../components/MobileMenu.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import React from 'react'
import TeamBlock from '../components/TeamBlock.jsx'

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
		const myTeamEls = this.props.myTeams.map(team =>
			<div key={team._id}><TeamBlock action="leave" team={team} /></div>
		)

		return (
			<div className="page teams">
				<nav>
					<MobileMenu />
				</nav>
				<div className="content-scrollable">
					<div className="clear">
						<h2>My teams</h2>
						{myTeamEls}
					</div>
					<div className="clear">
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
				</div>
			</div>
		)
	}
}

TeamsPage.propType = {
	user: React.PropTypes.object,
	myTeams: React.PropTypes.array,
	loading: React.PropTypes.bool
}

TeamsPage.contextTypes = {
	router: React.PropTypes.object
}
