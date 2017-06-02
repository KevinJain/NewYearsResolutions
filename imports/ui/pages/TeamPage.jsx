import BaseComponent from '../components/BaseComponent.jsx'
import MobileMenu from '../components/MobileMenu.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import React from 'react'

export default class TeamPage extends BaseComponent {
	constructor(props, context) {
		super(props)
	}

	render() {
		if (this.props.loading) {
			return <NotFoundPage />
		}

		return (
			<div className="page teams">
				<nav>
					<MobileMenu />
				</nav>
				<div className="content-scrollable">
					<div>
						<h2>Team: {this.props.team.title}</h2>
					</div>
					<div />
				</div>
			</div>
		)
	}
}

TeamPage.propType = {
	team: React.PropTypes.object,
	loading: React.PropTypes.bool
}

TeamPage.contextTypes = {
	router: React.PropTypes.object
}
