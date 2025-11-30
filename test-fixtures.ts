/**
 * Test fixtures - these MUST be set before the server module loads
 *
 * This file runs first (before server.ts) to set up test env vars.
 */

if (typeof process !== 'undefined' && process.env) {
  // These should be exposed to client
  process.env.METEOR_PUBLIC_API_URL = 'https://api.example.com'
  process.env.METEOR_PUBLIC_STRIPE_KEY = 'pk_test_12345'
  process.env.METEOR_PUBLIC_FEATURE_FLAG = 'true'
  process.env.METEOR_PUBLIC_EMPTY_VALUE = ''
  process.env.METEOR_PUBLIC_WITH_SPECIAL_CHARS = 'value with spaces & "quotes"'
  process.env.METEOR_PUBLIC_JSON_VALUE = '{"key": "value", "num": 123}'

  // These should NEVER be exposed to client
  process.env.STRIPE_SECRET_KEY = 'sk_live_supersecret'
  process.env.DATABASE_URL = 'mongodb://user:pass@host/db'
  process.env.API_SECRET = 'secret-api-key'
  process.env.ENCRYPTION_KEY = 'aes-256-key-here'
}
