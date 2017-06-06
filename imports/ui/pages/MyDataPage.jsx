import BaseComponent from '../components/BaseComponent.jsx'
import MobileMenu from '../components/MobileMenu.jsx'
import React from 'react'
import i18n from 'meteor/universe:i18n'

class MyDataPage extends BaseComponent {
	render() {
		const goalStatement = this.props.user && this.props.user.goalStatement
		return (
			<div className="page my-data">
				<nav>
					<MobileMenu />
				</nav>
				<div className="content-scrollable">
					<h2>My Goal Statement</h2>
					<p>{goalStatement}</p>
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

MyDataPage.propType = {
	user: React.PropTypes.object
}

export default MyDataPage
