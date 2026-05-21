# TypeScript SDK Implementation

Detailed implementation patterns for building TypeScript SDKs. Read this during the Build phase when you need concrete code patterns for package structure, clients, HTTP internals, and configuration.

## Table of contents

1. [Client patterns](#client-patterns)
2. [Configuration design](#configuration-design)
3. [Error class hierarchy](#error-class-hierarchy)
4. [HTTP internals](#http-internals)
5. [Barrel exports](#barrel-exports)

---

## Client patterns

### Single client

For small APIs with fewer than 10 methods:

```typescript
export class MyServiceClient {
  private config: ClientConfig;
  private http: HttpClient;

  constructor(config: ClientConfig) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.http = new HttpClient(this.config);
  }

  async getUser(id: string): Promise<User> {
    return this.http.get(`/users/${id}`);
  }

  async listUsers(params?: ListParams): Promise<PaginatedResponse<User>> {
    return this.http.get('/users', { params });
  }
}
```

### Modular client

For medium-to-large APIs — the recommended default:

```typescript
export class MyServiceClient {
  readonly users: UsersClient;
  readonly orders: OrdersClient;
  readonly products: ProductsClient;

  constructor(config: ClientConfig) {
    const http = new HttpClient(config);
    this.users = new UsersClient(http);
    this.orders = new OrdersClient(http);
    this.products = new ProductsClient(http);
  }
}

class UsersClient {
  constructor(private http: HttpClient) {}

  async get(id: string): Promise<User> {
    return this.http.get(`/users/${id}`);
  }

  async list(params?: ListParams): Promise<PaginatedResponse<User>> {
    return this.http.get('/users', { params });
  }

  async create(data: CreateUserInput): Promise<User> {
    return this.http.post('/users', data);
  }
}

// Usage: client.users.get('123')
```

### Factory function

When tree-shaking matters (browser SDKs):

```typescript
export function createClient(config: ClientConfig) {
  const http = new HttpClient(config);

  return {
    users: {
      get: (id: string) => http.get<User>(`/users/${id}`),
      list: (params?: ListParams) => http.get<User[]>('/users', { params }),
      create: (data: CreateUserInput) => http.post<User>('/users', data),
    },
    orders: {
      get: (id: string) => http.get<Order>(`/orders/${id}`),
      list: (params?: ListParams) => http.get<Order[]>('/orders', { params }),
    },
  };
}
```

---

## Configuration design

```typescript
export interface ClientConfig {
  /** API base URL */
  baseUrl: string;

  /** API key or token */
  apiKey?: string;

  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;

  /** Retry configuration */
  retry?: RetryConfig;

  /** Custom fetch implementation */
  fetch?: typeof fetch;

  /** Custom headers for all requests */
  headers?: Record<string, string>;

  /** Called before each request */
  onRequest?: (request: Request) => Request | Promise<Request>;

  /** Called after each response */
  onResponse?: (response: Response) => Response | Promise<Response>;
}

export interface RetryConfig {
  attempts?: number;      // default: 3
  delay?: number;         // default: 1000ms
  backoff?: number;       // default: 2 (exponential)
  maxDelay?: number;      // default: 30000ms
  retryableStatuses?: number[];  // default: [408, 429, 500, 502, 503, 504]
}
```

Merge defaults in the constructor:

```typescript
constructor(config: ClientConfig) {
  this.config = {
    ...DEFAULT_CONFIG,
    ...config,
    retry: { ...DEFAULT_CONFIG.retry, ...config.retry },
  };
}
```

---

## Error class hierarchy

```typescript
export class SDKError extends Error {
  constructor(message: string, public code: string, public cause?: Error) {
    super(message);
    this.name = 'SDKError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return { name: this.name, message: this.message, code: this.code };
  }
}

export class APIError extends SDKError {
  constructor(message: string, code: string, public statusCode: number, public response?: unknown) {
    super(message, code);
    this.name = 'APIError';
  }

  get isRetryable(): boolean {
    return [408, 429, 500, 502, 503, 504].includes(this.statusCode);
  }
}

export class AuthenticationError extends APIError {
  constructor(message = 'Authentication required') {
    super(message, 'UNAUTHENTICATED', 401);
    this.name = 'AuthenticationError';
  }
}

export class NotFoundError extends APIError {
  constructor(resource: string, id?: string) {
    const msg = id ? `${resource} '${id}' not found` : `${resource} not found`;
    super(msg, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends APIError {
  constructor(public retryAfter?: number, message = 'Rate limit exceeded') {
    super(message, 'RATE_LIMITED', 429);
    this.name = 'RateLimitError';
  }
}

export class ValidationError extends SDKError {
  constructor(message: string, public fields: Array<{ field: string; message: string }>) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}
```

---

## HTTP internals

### Retry with exponential backoff

```typescript
async function withRetry<T>(fn: () => Promise<T>, options: RetryConfig): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt < (options.attempts ?? 3); attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      const shouldRetry = error instanceof APIError && error.isRetryable;

      if (!shouldRetry || attempt >= (options.attempts ?? 3) - 1) throw lastError;

      const delay = Math.min(
        (options.delay ?? 1000) * Math.pow(options.backoff ?? 2, attempt),
        options.maxDelay ?? 30000
      );
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}
```

### Token refresh with request deduplication

```typescript
class TokenManager {
  private refreshPromise: Promise<string> | null = null;

  async getValidToken(): Promise<string> {
    const token = this.getStoredToken();
    if (token && !this.isExpired(token)) return token;

    // Deduplicate concurrent refresh requests
    if (!this.refreshPromise) {
      this.refreshPromise = this.refreshToken();
      this.refreshPromise.finally(() => { this.refreshPromise = null; });
    }

    return this.refreshPromise;
  }
}
```

---

## Barrel exports

```typescript
// src/index.ts — public API surface

// Main client
export { MyServiceClient } from './client';
export { createClient } from './client';

// Types
export type {
  ClientConfig, RetryConfig,
  User, CreateUserInput, UpdateUserInput,
  PaginatedResponse, ListParams,
} from './types';

// Errors
export {
  SDKError, APIError, NetworkError, TimeoutError,
  ValidationError, AuthenticationError, RateLimitError,
} from './errors';

// Constants
export { SDK_VERSION } from './constants';
```

Only export what consumers need. Everything in `internal/` stays private.