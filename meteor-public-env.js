if (Meteor.isServer) {
  import { onPageLoad } from "meteor/server-render";
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
  function cachePublicEnv() {
    const data = []
    Object.keys(process.env).filter(k => k.startsWith('METEOR_PUBLIC_')).forEach(key => {
      data.push([key, process.env[key]])
    })
    publicPayload = JSON.stringify(data)
  }
  cachePublicEnv()
}

if (Meteor.isClient) {
  Meteor.startup(() => {
      console.log(Meteor.settings.public)
    }
  )
}