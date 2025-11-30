/**
 * Tests for meteor-public-env
 *
 * Run: meteor test-packages ./
 */

import "./test-fixtures";

import { Tinytest } from "meteor/tinytest";
import { Meteor } from "meteor/meteor";

// ============================================================================
// Isomorphic Tests - process.env.METEOR_PUBLIC_* works on both client & server
// ============================================================================

Tinytest.add("process.env has METEOR_PUBLIC_ vars", function (test) {
    test.equal(process.env.METEOR_PUBLIC_API_URL, "https://api.example.com");
    test.equal(process.env.METEOR_PUBLIC_STRIPE_KEY, "pk_test_12345");
    test.equal(process.env.METEOR_PUBLIC_FEATURE_FLAG, "true");
});

Tinytest.add("process.env preserves empty string values", function (test) {
    test.equal(process.env.METEOR_PUBLIC_EMPTY_VALUE, "");
});

Tinytest.add("process.env preserves special characters", function (test) {
    test.equal(
        process.env.METEOR_PUBLIC_WITH_SPECIAL_CHARS,
        'value with spaces & "quotes"',
    );
});

Tinytest.add("process.env preserves JSON strings", function (test) {
    const json = process.env.METEOR_PUBLIC_JSON_VALUE;
    test.equal(json, '{"key": "value", "num": 123}');

    const parsed = JSON.parse(json!);
    test.equal(parsed.key, "value");
    test.equal(parsed.num, 123);
});

// ============================================================================
// Client-only Tests
// ============================================================================

if (Meteor.isClient) {
    Tinytest.add(
        "Client-only - injected payload excludes secrets",
        function (test) {
            const injected = window.__meteor_public_env__ ?? {};
            const keys = Object.keys(injected);

            test.isFalse(keys.includes("STRIPE_SECRET_KEY"));
            test.isFalse(keys.includes("DATABASE_URL"));
            test.isFalse(keys.includes("API_SECRET"));
        },
    );

    Tinytest.add(
        "Client-only - Meteor.settings.public is populated",
        function (test) {
            const pub = Meteor.settings.public as Record<string, string>;
            test.equal(pub["API_URL"], "https://api.example.com");
            test.equal(pub["STRIPE_KEY"], "pk_test_12345");
        },
    );
}
