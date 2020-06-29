import { Meteor } from 'meteor/meteor'

// will execute before any application code, but before if you have a package that depends on a value from public-env
Meteor.startup(() => {
  for (const [key, value] of window.__meteor_public_env || []) {
    Meteor.settings.public[key] = value
  }
})