/**
 * meteor-public-env - Client
 *
 * Hydrates process.env on the client with METEOR_PUBLIC_* variables
 * that were injected by the server. This enables isomorphic access
 * to public configuration via process.env.METEOR_PUBLIC_*
 *
 * Also populates Meteor.settings.public for backwards compatibility.
 */

import { Meteor } from 'meteor/meteor'

declare global {
  interface Window {
    __meteor_public_env__?: Record<string, string>
  }
}

const KEY_PREFIX = 'METEOR_PUBLIC_'

// Polyfill process.env on client if needed
if (typeof process === 'undefined') {
  ;(window as any).process = { env: {} }
} else if (!process.env) {
  ;(process as any).env = {}
}

// Hydrate from server-injected payload (available immediately in HTML)
const publicEnv = window.__meteor_public_env__ ?? {}

// Populate process.env.METEOR_PUBLIC_*
for (const [key, value] of Object.entries(publicEnv)) {
  ;(process.env as Record<string, string>)[key] = value
}

// Populate Meteor.settings.public (without METEOR_PUBLIC_ prefix)
for (const [key, value] of Object.entries(publicEnv)) {
  const settingsKey = key.replace(KEY_PREFIX, '')
  ;(Meteor.settings.public as Record<string, string>)[settingsKey] = value
}
