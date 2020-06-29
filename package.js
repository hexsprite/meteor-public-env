Package.describe({
  name: 'hexsprite:public-env',
  version: '0.0.4',
  // Brief, one-line summary of the package.
  summary: 'Expose public environment variables in Meteor.settings.public',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.9');
  api.use('ecmascript');
  api.mainModule('server.js', 'server');
  api.mainModule('client.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('hexsprite:public-env');
  api.mainModule('meteor-public-env-tests.js');
});
