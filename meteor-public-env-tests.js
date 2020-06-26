// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by server.js.
import { name as packageName } from "meteor/meteor-public-env";

// Write your tests here!
// Here is an example.
Tinytest.add('meteor-public-env - example', function (test) {
  test.equal(packageName, "meteor-public-env");
});
