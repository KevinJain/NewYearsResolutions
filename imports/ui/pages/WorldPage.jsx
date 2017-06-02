import BaseComponent from '../components/BaseComponent.jsx'
import MobileMenu from '../components/MobileMenu.jsx'
import React from 'react'
import i18n from 'meteor/universe:i18n'

class WorldPage extends BaseComponent {
	render() {
		return (
			<div className="page world-page">
				<nav>
					<MobileMenu />
				</nav>
				<div className="content-scrollable">
					<h2>
						{i18n.__('pages.WorldPage.title')}
					</h2>
				</div>
			</div>
		)
	}
}

export default WorldPage
