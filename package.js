Package.describe({
  name: 'hexsprite:public-env',
  version: '1.0.0',
  summary: 'Expose METEOR_PUBLIC_* env vars to client as process.env (Next.js style)',
  git: 'https://github.com/hexsprite/meteor-public-env',
  documentation: 'README.md',
})

Package.onUse(function (api) {
  api.versionsFrom(['2.0', '3.0'])
  api.use('ecmascript')
  api.use('typescript')
  api.use('server-render')
  api.mainModule('server.ts', 'server')
  api.mainModule('client.ts', 'client')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('typescript')
  api.use('tinytest')
  api.use('hexsprite:public-env')
  // test-fixtures.ts sets up env vars, must load before server.ts
  api.addFiles('test-fixtures.ts', 'server')
  api.mainModule('tests.ts')
})
