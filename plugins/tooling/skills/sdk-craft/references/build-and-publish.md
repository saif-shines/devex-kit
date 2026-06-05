# Build, Bundle, and Publish

Detailed guidance for the Ship phase of sdk-craft. Read this when you're configuring builds, setting up package.json exports, publishing to npm, or managing changelogs.

## Table of contents

1. [Build tools](#build-tools)
2. [tsup configuration](#tsup-configuration)
3. [Package.json exports](#packagejson-exports)
4. [Publishing](#publishing)
5. [Versioning and changelogs](#versioning-and-changelogs)
6. [Migration guides](#migration-guides)
7. [CI/CD](#cicd)

---

## Build tools

| Tool | Speed | ESM | CJS | .d.ts | Recommended for |
|------|-------|-----|-----|-------|----------------|
| **tsup** | Fast | Yes | Yes | Yes | Most SDKs |
| **unbuild** | Fast | Yes | Yes | Yes | Libraries |
| **tsc** | Medium | Yes | Yes | Yes | Simple projects |
| **rollup** | Medium | Yes | Yes | Plugin | Complex bundling |

---

## tsup configuration

### Basic (recommended starting point)

```typescript
// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
});
```

### Full configuration

```typescript
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    react: 'src/react/index.ts',  // Sub-path export
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: process.env.NODE_ENV === 'production',
  external: ['react', 'react-dom'],
  splitting: false,
  treeshake: true,
  target: 'es2020',
  platform: 'neutral',
  shims: true,
});
```

---

## Package.json exports

### Modern dual-format package

```json
{
  "name": "@org/my-sdk",
  "version": "1.0.0",
  "type": "module",

  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    }
  },

  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],

  "scripts": {
    "build": "tsup",
    "test": "vitest run",
    "typecheck": "tsc --noEmit",
    "prepublishOnly": "npm run build && npm test"
  },

  "engines": { "node": ">=18.0.0" }
}
```

### Sub-path exports

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./client": "./dist/client.js",
    "./errors": "./dist/errors.js",
    "./types": "./dist/types.js"
  }
}
```

### Conditional exports (Node vs browser)

```json
{
  "exports": {
    ".": {
      "node": { "import": "./dist/node.js", "require": "./dist/node.cjs" },
      "browser": "./dist/browser.js",
      "default": "./dist/index.js"
    }
  }
}
```

---

## Publishing

### npm (public)

```bash
npm login
npm publish --dry-run      # Verify contents first
npm publish --access public  # For scoped packages
```

### npm (private / GitHub Packages)

```
# .npmrc
@org:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```json
{
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### Prerelease tags

```bash
npm version prerelease --preid=alpha  # 1.0.0 → 1.0.1-alpha.0
npm publish --tag alpha               # Users: npm install @org/sdk@alpha
```

---

## Versioning and changelogs

### Changesets (recommended)

```bash
npm install -D @changesets/cli
npx changeset init
npx changeset         # Create a changeset for your changes
npx changeset version # Apply version bumps
npx changeset publish # Publish to npm
```

### Keep a Changelog format

```markdown
## [Unreleased]

### Added
- New `users.search()` method

### Changed
- `client.timeout` default increased to 30s

### Deprecated
- `client.getUser()` — use `client.users.get()` instead

### Fixed
- Token refresh race condition
```

---

## Migration guides

Structure for every major version:

```markdown
# Migrating from v2 to v3

## Overview
Version 3 introduces [major change]. Migration typically takes [time].

## Breaking Changes

### 1. Client initialization
**Before (v2):**
client = MyClient(key="...")

**After (v3):**
client = MyClient(api_key="...")

**Why**: Consistency with other SDK parameters.

## Deprecated Features Removed
- `client.old_method()` → use `client.new_method()`

## Automation
npx @myapi/migrate-v3
```

---

## CI/CD

### GitHub Actions publish workflow

```yaml
name: Publish
on:
  push:
    tags: ['v*']

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, registry-url: 'https://registry.npmjs.org' }
      - run: npm ci
      - run: npm test
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Pre-publish checklist

- [ ] All tests pass
- [ ] Build produces ESM + CJS + .d.ts
- [ ] `npm publish --dry-run` shows correct files
- [ ] Changelog updated
- [ ] Version bumped (semver)
- [ ] Migration guide written (if major)
- [ ] Documentation generated and deployed