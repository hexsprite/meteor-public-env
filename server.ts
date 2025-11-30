/**
 * meteor-public-env - Server
 *
 * Collects METEOR_PUBLIC_* environment variables and injects them into
 * the client bundle, making them available as process.env.METEOR_PUBLIC_*
 * on both server and client (isomorphic, like Next.js).
 */

import { onPageLoad } from 'meteor/server-render'

const KEY_PREFIX = 'METEOR_PUBLIC_'

let publicEnvVars: Record<string, string> = {}

function collectPublicEnvVars(): Record<string, string> {
  const vars: Record<string, string> = {}

  Object.keys(process.env)
    .filter((key): key is string => key.startsWith(KEY_PREFIX))
    .forEach((key) => {
      const value = process.env[key]
      if (value !== undefined) {
        vars[key] = value
      }
    })

  return vars
}

// Initial collection at module load
publicEnvVars = collectPublicEnvVars()

// Inject into page for client hydration
onPageLoad((sink) => {
  // Re-collect on each page load in development to pick up test fixtures
  const vars =
    process.env.NODE_ENV === 'production' ? publicEnvVars : collectPublicEnvVars()

  const payload = JSON.stringify(vars)
  sink.appendToBody(`
<script>
  window.__meteor_public_env__ = ${payload};
</script>
`)
})

export { publicEnvVars, KEY_PREFIX, collectPublicEnvVars }
