/* global alert */

import i18n from 'meteor/universe:i18n'

export default error => {
	if (error) {
		// It would be better to not alert the error here but inform the user in some
		// more subtle way
		alert(i18n.__(error.error)) // eslint-disable-line no-alert
	}
}
