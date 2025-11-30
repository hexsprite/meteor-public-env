# meteor-public-env

Expose `METEOR_PUBLIC_*` environment variables to the client as `process.env.METEOR_PUBLIC_*`, similar to how Next.js handles `NEXT_PUBLIC_*` variables.

## Features

- **Isomorphic access**: Use `process.env.METEOR_PUBLIC_*` on both server and client
- **Next.js-style naming**: Variables keep their full name (no mangling)
- **Backwards compatible**: Also populates `Meteor.settings.public.*` (without prefix)
- **TypeScript support**: Full type definitions included
- **Secure**: Only exposes variables explicitly prefixed with `METEOR_PUBLIC_`

## Installation

```bash
meteor add hexsprite:public-env
```

**Important**: Add this package near the top of your `.meteor/packages` file, before any packages that need to access the environment variables.

## Usage

### 1. Set environment variables

```bash
# Server-side (stays private)
export STRIPE_SECRET_KEY=sk_live_...

# Client-side (will be exposed)
export METEOR_PUBLIC_STRIPE_KEY=pk_live_...
export METEOR_PUBLIC_SEGMENT_KEY=abc123
```

### 2. Access in your code

```typescript
// Works on both client and server!
const stripePublicKey = process.env.METEOR_PUBLIC_STRIPE_KEY
const segmentKey = process.env.METEOR_PUBLIC_SEGMENT_KEY

// Also available via Meteor.settings.public (backwards compat)
// METEOR_PUBLIC_STRIPE_KEY -> Meteor.settings.public.STRIPE_KEY
const alsoWorks = Meteor.settings.public.STRIPE_KEY
```

## How It Works

1. **Server startup**: Collects all `METEOR_PUBLIC_*` environment variables
2. **Page render**: Injects them into the HTML as `window.__meteor_public_env__`
3. **Client load**: Hydrates `process.env` and `Meteor.settings.public` immediately at module load

## Security

Only environment variables prefixed with `METEOR_PUBLIC_` are exposed to the client. Never put secrets in `METEOR_PUBLIC_*` variables - they will be visible in the browser.

```bash
# SAFE - stays on server only
export STRIPE_SECRET_KEY=sk_live_...
export DATABASE_URL=mongodb://...

# EXPOSED - visible in browser, use only for public config
export METEOR_PUBLIC_STRIPE_KEY=pk_live_...
export METEOR_PUBLIC_API_URL=https://api.example.com
```

## Migration from Meteor.settings

Before:
```json
{
  "public": {
    "stripeKey": "pk_live_..."
  }
}
```

After:
```bash
export METEOR_PUBLIC_STRIPE_KEY=pk_live_...
```

Access:
```typescript
// Old way (still works for backwards compat)
Meteor.settings.public.STRIPE_KEY

// New way (isomorphic, like Next.js)
process.env.METEOR_PUBLIC_STRIPE_KEY
```

## Running Tests

```bash
meteor test-packages ./
```

## Compatibility

- Meteor 2.x and 3.x
- Works with SSR (`server-render` package)
- TypeScript 4.x+

## License

MIT
