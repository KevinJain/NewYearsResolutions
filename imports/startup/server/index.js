// This file configures the Accounts package to define the UI of the reset password email.
import './reset-password-email.js'

// Set up some rate limiting and other important security settings.
import './security.js'

// This defines all the collections, publications and methods that the application provides
// as an API to the client.
import './register-api.js'

// Add ResolutionPlans to the database from manual files
// TODO: Remove this once we have a way for teacher to admin for real in UX
import './import-resolution-plans.js'
