/* eslint-disable lodash/import-scope */
import BaseComponent from '../components/BaseComponent.jsx'
import MobileMenu from '../components/MobileMenu.jsx'
import React from 'react'
import TeamBlock from '../components/TeamBlock.jsx'
import _ from 'lodash'
import i18n from 'meteor/universe:i18n'

class WorldPage extends BaseComponent {
	render() {
		const allTeamEls = this.props.allTeams.map(team =>
			<div key={team._id}>
				<TeamBlock
					action={_.includes(this.props.user.teams, team._id) ? null : 'join'}
					team={team}
				/>
				<br />
			</div>
		)

		return (
			<div className="page world-page">
				<nav>
					<MobileMenu />
				</nav>
				<div className="content-scrollable">
					<div>
						<h2>
							{i18n.__('pages.WorldPage.title')}
						</h2>
						<ol>
							<li>
								0. This is a test by Kevin Jain, hello world!!
								1. End World Hunger => Ensure Nobody on the world Dies of
								Starvation => Make sure everybody has enough food to eat =>
								<br />
								SHORT TERM: DONATE FOOD
								<br />
								MEDIUM TERM: HEIFFER INTERNATIONAL & FEEDING AMERICA
								<br />
								LONG TERM: UNITY
								<ul>
									<li>
										Break down into tasks people can do
									</li>
								</ul>
							</li>
							<li>
								2. End Top 10 Causes of Death: Heart Disease, Stroke,
								<a href="http://www.who.int/mediacentre/factsheets/fs310/en/">
									http://www.who.int/mediacentre/factsheets/fs310/en/
								</a>

								EMERGENCY: Preventive Health Movement
								Set Goals, Exercise with accountability and Teams
							</li>
							<li>
								3. Clean Our Oceans => Daily Actions
							</li>
						</ol>
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
WorldPage.propType = {
	user: React.PropTypes.object,
	allTeams: React.PropTypes.array,
	loading: React.PropTypes.bool
}

export default WorldPage
