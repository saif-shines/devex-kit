---
name: sdk-craft
description: |
  Design, build, document, and ship SDKs.
  Use when creating a client library, planning a breaking change, or reviewing SDK quality.
  It does not build a CLI (that's `devrel-tooling`) or an MCP server (that's `mcp-server-craft`).
license: MIT
metadata:
  author: saif-shines
  version: "1.1"
  type: assistive
  mode: lifecycle
---

# SDK Craft

Build SDKs that developers can't stop talking about. Great SDK DX is a competitive advantage: developers choose tools that make them feel productive and competent.

This skill covers the full SDK lifecycle:

| Phase | What you do | Key question |
|-------|-------------|-------------|
| **Design** | API surface, types, error messages | Does the common case require minimal code? |
| **Build** | Client implementation, internals | Is the architecture clean and extensible? |
| **Document** | Inline docs, README, generated reference | Can a developer succeed without asking for help? |
| **Ship** | Versioning, changelog, publishing, migration | Can users upgrade without pain? |

State which phase you're in, or describe what you're building: the skill routes accordingly.

---

## Design phase

> For expanded principles and examples, load `references/design-principles.md`.
> For language-specific idiom guidance (Python, JS, Go, Java), load `references/language-idioms.md`.

The five design principles that separate great SDKs from mediocre ones:

### 1. Optimize for the common case

The most frequent operation should require the least code. Progressive disclosure reveals complexity only when the developer asks for it.

```python
# Level 1: simplest usage (80% of calls)
client.messages.send("Hello", to="+1234567890")

# Level 2: common options
client.messages.send("Hello", to="+1234567890", from_="+0987654321")

# Level 3: full control (rare)
client.messages.send(body="Hello", to="+1234567890", from_="+0987654321",
                     status_callback="https://...", media_urls=["https://..."])
```

If the simplest usage requires more than 3 lines, the API needs redesign.

### 2. Fail fast with messages that guide

Every error message answers three questions: **what** happened, **why**, and **how to fix it**.

```
AuthenticationError: Invalid API key provided.

The key 'sk_test_abc...' (test key) cannot access production endpoints.

To fix this:
1. Go to https://dashboard.example.com/keys
2. Copy your production key (starts with 'sk_live_')
3. Set MY_API_KEY=sk_live_...

Docs: https://docs.example.com/authentication
```

Create specific error types (`AuthenticationError`, `RateLimitError`, `NotFoundError`) so developers can catch and handle them selectively. Generic `Error` or bare status codes are never acceptable.

### 3. Type everything

Types are documentation that never goes stale. Design for IDE autocomplete: after typing `client.users.`, the developer should see every available operation with full type information.

- Use literal/enum types for constrained values (not `string`)
- Separate input types from output types (`CreateUserInput` vs `User`)
- Use branded types to prevent mixing up IDs (`UserId` vs `OrderId`)
- Use discriminated unions for events and polymorphic responses

> For TypeScript type patterns (branded types, generics, discriminated unions, type guards), load `references/design-principles.md` § Type Safety.

### 4. Sensible defaults

A new developer should be able to write `const client = new Client({ apiKey })` and start making calls. Defaults should include: automatic retries with exponential backoff, reasonable timeouts, JSON content type, standard auth headers, connection pooling.

### 5. Feel native

Match each target language's idioms: naming, error handling, async patterns, and package conventions. A Python developer should never feel like they're using a translated JavaScript SDK.

> For language-specific patterns (Python, JS, Go, Java), load `references/language-idioms.md`.

---

## Build phase

> For full implementation patterns (package structure, client patterns, HTTP internals, config design), load `references/typescript-sdk.md`.

### Package structure

```
my-sdk/
├── src/
│   ├── index.ts              # Public barrel exports
│   ├── client.ts             # Main client class
│   ├── types.ts              # Public types/interfaces
│   ├── errors.ts             # Error class hierarchy
│   ├── internal/             # Private implementation
│   │   ├── http.ts           # HTTP client, retry, queue
│   │   ├── validation.ts     # Input validation
│   │   └── utils.ts          # Internal helpers
│   └── modules/              # Feature sub-clients (optional)
│       ├── auth/
│       └── users/
├── tests/
├── examples/
├── package.json
├── tsup.config.ts
└── README.md
```

### Client patterns

Choose based on API surface size:

| Pattern | When to use | Example |
|---------|------------|---------|
| **Single client** | Small API (< 10 methods) | `client.getUser(id)` |
| **Modular client** | Medium-large API | `client.users.get(id)` |
| **Factory function** | Tree-shaking critical | `const { users } = createClient(config)` |
| **Builder** | Complex initialization | `new ClientBuilder().baseUrl(...).build()` |

The modular pattern (`client.users.get()`) is the sweet spot for most SDKs: it namespaces logically, autocomplete works naturally, and it scales as you add resources.

### Error hierarchy

```
SDKError (base)
├── ConfigurationError
├── ValidationError
├── NetworkError
├── TimeoutError
└── APIError
    ├── AuthenticationError (401)
    ├── AuthorizationError (403)
    ├── NotFoundError (404)
    └── RateLimitError (429)
```

Every error carries: `message`, `code`, `cause`. API errors add `statusCode` and `response`. Include `toJSON()` for logging and `isRetryable` for retry logic.

---

## Document phase

SDK documentation has three layers: all three are needed:

### 1. Inline docs (JSDoc / docstrings)

Every public method gets: one-line summary, parameter descriptions, return type, thrown errors, and a usage example. This powers IDE hover-tooltips: for many developers, this is the *only* documentation they read.

```typescript
/**
 * Creates a new user in your organization.
 *
 * @param input - The user details
 * @param input.email - Must be a valid email address
 * @param input.name - Display name (max 100 characters)
 * @returns The created user with generated ID
 * @throws {ValidationError} If email format is invalid
 * @throws {ConflictError} If email already exists
 *
 * @example
 * const user = await client.users.create({
 *   email: "jane@example.com",
 *   name: "Jane Developer"
 * });
 */
```

### 2. README

The README is your SDK's landing page. It must contain:
- One-sentence description of what this SDK does
- Install command
- Quickstart (working example in < 10 lines)
- Link to full documentation
- Requirements (runtime versions, dependencies)

The quickstart must achieve a visible result (not just "client initialized successfully").

### 3. Generated reference

Use the language's standard doc generator:

| Language | Tool | Output |
|----------|------|--------|
| TypeScript | TypeDoc | HTML/Markdown |
| Python | Sphinx, pdoc | HTML |
| Go | GoDoc | pkg.go.dev |
| Java | Javadoc | HTML |

Wire doc generation into CI so it stays current.

---

## Ship phase

> For detailed build configuration, bundling, npm publishing, changelogs, and CI/CD, load `references/build-and-publish.md`.

### Build targets

Ship both ESM and CJS with type declarations. Use `tsup` (recommended) or `unbuild`.

```typescript
// tsup.config.ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
});
```

Configure `package.json` exports properly:

```json
{
  "type": "module",
  "exports": {
    ".": {
      "import": { "types": "./dist/index.d.ts", "default": "./dist/index.js" },
      "require": { "types": "./dist/index.d.cts", "default": "./dist/index.cjs" }
    }
  },
  "files": ["dist"]
}
```

### Versioning

Follow semver. Every major version bump needs a migration guide (before/after code for each breaking change, codemods when possible). Deprecate before removing: warnings include what to use instead and when removal happens.

> For detailed versioning, changelog, and migration guide patterns, load `references/build-and-publish.md`.

---

## Phase gates

Before moving between phases, verify:

**Design → Build:** Tool descriptions reviewed? Error types mapped to HTTP status codes? Type hierarchy sketched? If building multi-language, idiom guide consulted for each target?

**Build → Document:** All public methods have inline docs? Error hierarchy implemented and tested? Config validates at construction time?

**Document → Ship:** README quickstart achieves a visible result in < 10 lines? `npm publish --dry-run` shows correct files? Exports verified with [`publint`](https://publint.dev/) or [`attw`](https://github.com/arethetypeswrong/arethetypeswrong.github.io)?

## Quality checklist

Before any SDK release:

- [ ] Common case requires ≤ 3 lines of code
- [ ] All public APIs have types and inline docs
- [ ] Error messages include what/why/fix
- [ ] Errors are catchable by specific type
- [ ] IDE autocomplete works for all operations
- [ ] README quickstart achieves a visible result
- [ ] ESM + CJS + .d.ts all ship correctly
- [ ] Changelog updated
- [ ] Migration guide exists (if breaking)
- [ ] CI runs tests and generates docs

## When to switch skills

- CLI, completions, or Postman collection → `devrel-tooling`
- MCP server tools or transport → `mcp-server-craft`

## Did this help?

At the end of every session, ask: **"Did this solve what you were trying to do?"**

- If yes: done.
- If the API surface was wrong, an error message missed a fix, or the ship checklist skipped a file: encourage the user to file an issue at **https://github.com/saif-shines/devex-kit/issues**. Offer to help draft it. Include the phase, the public API, and what was missing.

