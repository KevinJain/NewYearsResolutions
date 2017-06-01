/* globals Meteor */
const config = {
	cloud_name: Meteor.settings.public.cloudinary.name,
	api_key: Meteor.settings.public.cloudinary.key
}
$.cloudinary.config(config)
