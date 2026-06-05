# SDK Design Principles

Expanded guidance for the Design phase of sdk-craft. Read this when you're making API surface decisions, designing error types, or reviewing an SDK for developer experience quality.

## Table of contents

1. [Progressive disclosure](#progressive-disclosure)
2. [Error message framework](#error-message-framework)
3. [Type safety patterns](#type-safety-patterns)
4. [Autocomplete-driven design](#autocomplete-driven-design)
5. [Sensible defaults](#sensible-defaults)

---

## Progressive disclosure

Start simple. Reveal complexity only when asked.

```javascript
// Level 1: Simplest possible usage
const result = await client.analyze("Hello world");

// Level 2: Common options
const result = await client.analyze("Hello world", {
  language: "en",
  features: ["sentiment", "entities"]
});

// Level 3: Full control
const result = await client.analyze("Hello world", {
  language: "en",
  features: ["sentiment", "entities"],
  model: "v2-large",
  timeout: 30000,
  retries: { max: 3, backoff: "exponential" }
});
```

The anti-pattern is requiring full configuration for simple operations:

```python
# Bad: every call requires full ceremony
message = Message(
    body="Hello world",
    to=PhoneNumber("+1234567890"),
    from_=PhoneNumber(config.get_default_from()),
    options=MessageOptions(status_callback=None, media_urls=[])
)
client.messages.send(message)
```

## Error message framework

Every error message answers three questions:

| Question | What to include |
|----------|----------------|
| **What** happened? | Specific error name and description |
| **Why** did it happen? | Context about the input, state, or config that triggered it |
| **How** do I fix it? | Numbered steps, links to docs, commands to run |

### Error types to distinguish

Create specific error types developers can catch:

```python
from myapi.errors import (
    AuthenticationError,  # Invalid/missing credentials
    AuthorizationError,   # Valid creds, insufficient permissions
    ValidationError,      # Invalid input data
    NotFoundError,        # Resource doesn't exist
    RateLimitError,       # Too many requests (include retryAfter)
    ServerError,          # Our fault, retry might help
)

try:
    client.users.get(user_id)
except NotFoundError as e:
    # Handle specifically
except AuthenticationError as e:
    # Handle specifically
except MyAPIError as e:
    # Catch-all for API errors
```

### Include context in errors

```javascript
// Bad: generic
throw new Error("Invalid parameter");

// Good: contextual
throw new ValidationError({
  message: "Invalid phone number format",
  field: "to",
  value: "+1abc",
  expected: "E.164 format (e.g., +14155551234)",
  docs: "https://docs.example.com/phone-numbers"
});
```

## Type safety patterns

### Input vs output types

Always separate them. Create types never match read types — the server generates `id`, `createdAt`, etc.

```typescript
// Output (from API)
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: string;
  updatedAt: string;
}

// Input for creation
interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

// Input for update (all optional)
interface UpdateUserInput {
  email?: string;
  name?: string;
}
```

### Branded types

Prevent mixing up IDs at compile time:

```typescript
declare const brand: unique symbol;
type Brand<T, B> = T & { [brand]: B };

type UserId = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;

function getUser(id: UserId): Promise<User>;
function getOrder(id: OrderId): Promise<Order>;

getUser(userId);   // OK
getUser(orderId);  // Type error — caught at compile time
```

### Discriminated unions

For events, webhooks, or polymorphic responses:

```typescript
type WebhookEvent =
  | { type: 'user.created'; data: User }
  | { type: 'user.deleted'; data: { id: string } }
  | { type: 'invoice.paid'; data: Invoice };

function handleWebhook(event: WebhookEvent) {
  switch (event.type) {
    case 'user.created':
      console.log(event.data.email); // TypeScript knows this is User
      break;
    case 'invoice.paid':
      console.log(event.data.amount); // TypeScript knows this is Invoice
      break;
  }
}
```

### Type guards

```typescript
// Manual
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null
    && 'id' in value && 'email' in value;
}

// With Zod (recommended for runtime validation)
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['admin', 'user', 'guest']),
});

type User = z.infer<typeof UserSchema>;
```

## Autocomplete-driven design

Structure APIs so IDE features do the teaching:

```typescript
// Good: autocomplete shows all operations after 'client.users.'
client.users.get(id)
client.users.list()
client.users.create(data)
client.users.update(id, data)
client.users.delete(id)

// Bad: requires memorization of string keys
client.send("messages", { /* what goes here? */ });
```

Use literal types for constrained values:

```typescript
// Good: IDE shows valid values
type MessageStatus = "queued" | "sending" | "sent" | "failed";

// Bad: any string accepted, errors at runtime
type MessageStatus = string;
```

## Sensible defaults

A new developer should succeed with minimal configuration:

```javascript
// This should just work
const client = new MyClient({ apiKey: process.env.MY_API_KEY });

// Implicit defaults:
// - Automatic retries (3 attempts, exponential backoff)
// - 30s timeout
// - JSON content type
// - Standard auth headers
// - Connection pooling
```

Configuration should be overridable but never required:

```typescript
interface ClientConfig {
  apiKey: string;                // required
  baseUrl?: string;              // default: production URL
  timeout?: number;              // default: 30000ms
  retry?: RetryConfig;           // default: 3 attempts, exp backoff
  fetch?: typeof fetch;          // default: globalThis.fetch
  headers?: Record<string, string>; // default: {}
}
```