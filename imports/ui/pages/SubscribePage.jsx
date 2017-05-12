import MobileMenu from '../components/MobileMenu.jsx'
import React from 'react'

// a common layout wrapper for subscribe pages
const SubscribePage = ({ content }) => (
	<div className="page subscribe">
		<nav>
			<MobileMenu />
		</nav>
		<div className="content-scrollable">
			{content}
		</div>
	</div>
)

SubscribePage.propTypes = {
	content: React.PropTypes.element
}

export default SubscribePage
