import { onPageLoad } from 'meteor/server-render'

onPageLoad(sink => {
  sink.appendToBody(`
<script>
  window.__meteor_public_env = ${publicPayload};
  window.setTimeout(() => {
    window.__meteor_public_env.forEach(v => Meteor.settings.public[v[0]] = v[1])
  }, 0)
</script>
`)
})

let publicPayload = ''

const keyPrefix = 'METEOR_PUBLIC_'
function cachePublicEnv() {
  const data = []
  Object.keys(process.env).filter(k => k.startsWith(keyPrefix)).forEach(key => {
    data.push([key.replace(keyPrefix, ''), process.env[key]])
  })
  publicPayload = JSON.stringify(data)
}

cachePublicEnv()
