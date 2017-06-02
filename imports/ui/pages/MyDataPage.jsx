import BaseComponent from '../components/BaseComponent.jsx'
import MobileMenu from '../components/MobileMenu.jsx'
import React from 'react'
import i18n from 'meteor/universe:i18n'

class MyDataPage extends BaseComponent {
	render() {
		return (
			<div className="page not-found">
				<nav>
					<MobileMenu />
				</nav>
				<div className="content-scrollable">
					<h2>
						{i18n.__('pages.myDataPage.title')}
					</h2>
					<div>
						{i18n.__('pages.myDataPage.myBloodType')}
						<input type="text" />
					</div>
					<div>
						{i18n.__('pages.myDataPage.myCholesterol')}
						<input type="text" />
					</div>
					<input type="submit" value="Submit" />
				</div>
			</div>
		)
	}
}

export default MyDataPage
