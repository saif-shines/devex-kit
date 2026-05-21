---
name: sdk-craft
description: |
  Design, build, document, and ship SDKs that developers love. Covers the full SDK lifecycle — from API surface design and type safety through implementation, bundling, documentation, versioning, and publishing. Use this skill whenever someone is creating a new SDK, extracting shared code into a client library, improving SDK developer experience, planning a breaking change or migration guide, or reviewing an SDK for quality. Also activates for questions about error message design, client library patterns, type-safe API design, SDK packaging (ESM/CJS), or npm publishing.
license: MIT
metadata:
  author: saif-shines
  version: "1.0"
  type: assistive
  mode: lifecycle
---

# SDK Craft

Build SDKs that developers can't stop talking about. Great SDK DX is a competitive advantage — developers choose tools that make them feel productive and competent.

This skill covers the full SDK lifecycle:

| Phase | What you do | Key question |
|-------|-------------|-------------|
| **Design** | API surface, types, error messages | Does the common case require minimal code? |
| **Build** | Client implementation, internals | Is the architecture clean and extensible? |
| **Document** | Inline docs, README, generated reference | Can a developer succeed without asking for help? |
| **Ship** | Versioning, changelog, publishing, migration | Can users upgrade without pain? |

State which phase you're in, or describe what you're building — the skill routes accordingly.

---

## Design phase

> For expanded principles and examples, load `references/design-principles.md`.
> For language-specific idiom guidance (Python, JS, Go, Java), load `references/language-idioms.md`.

The five design principles that separate great SDKs from mediocre ones:

### 1. Optimize for the common case

The most frequent operation should require the least code. Progressive disclosure reveals complexity only when the developer asks for it.

```python
# Level 1 — simplest usage (80% of calls)
client.messages.send("Hello", to="+1234567890")

# Level 2 — common options
client.messages.send("Hello", to="+1234567890", from_="+0987654321")

# Level 3 — full control (rare)
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

Types are documentation that never goes stale. Design for IDE autocomplete — after typing `client.users.`, the developer should see every available operation with full type information.

- Use literal/enum types for constrained values (not `string`)
- Separate input types from output types (`CreateUserInput` vs `User`)
- Use branded types to prevent mixing up IDs (`UserId` vs `OrderId`)
- Use discriminated unions for events and polymorphic responses

> For TypeScript type patterns (branded types, generics, discriminated unions, type guards), load `references/design-principles.md` § Type Safety.

### 4. Sensible defaults

A new developer should be able to write `const client = new Client({ apiKey })` and start making calls. Defaults should include: automatic retries with exponential backoff, reasonable timeouts, JSON content type, standard auth headers, connection pooling.

### 5. Feel native

Match the idioms of each target language:

| Language | Conventions |
|----------|-------------|
| Python | snake_case, context managers, generators, type hints |
| JavaScript | camelCase, async/await, destructuring, Promises |
| Go | PascalCase exports, error returns, context.Context, interfaces |
| Java | camelCase methods, Builder pattern, checked exceptions |

A Python developer should never feel like they're using a JavaScript SDK that was machine-translated.

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

The modular pattern (`client.users.get()`) is the sweet spot for most SDKs — it namespaces logically, autocomplete works naturally, and it scales as you add resources.

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

SDK documentation has three layers — all three are needed:

### 1. Inline docs (JSDoc / docstrings)

Every public method gets: one-line summary, parameter descriptions, return type, thrown errors, and a usage example. This powers IDE hover-tooltips — for many developers, this is the *only* documentation they read.

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

Follow semver strictly. What counts as breaking:
- Removing a public method or property
- Changing method signatures or return types
- Changing default behavior
- Dropping runtime version support

What doesn't: adding methods, adding optional parameters, deprecating (not removing), fixing incorrect behavior.

### Migration guides

Every major version needs a migration guide structured as:

1. **Overview** — what changed and why, time estimate
2. **Breaking changes** — before/after code for each change
3. **Removed features** — what was deprecated and its replacement
4. **Automation** — codemods or migration scripts when possible

### Deprecation

Deprecate before removing. Warnings should include: what to use instead, when the removal happens, and a link to the migration guide.

---

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

---

## Did this help?

At the end of every session, ask: **"Did this solve what you were trying to do?"**

If the guidance was wrong for your SDK's domain, or the patterns didn't fit your architecture, encourage the user to file an issue at **https://github.com/saif-shines/devex-kit/issues**. Offer to help draft it — include: which phase they were in, what they were building, and what was missing or unhelpful.