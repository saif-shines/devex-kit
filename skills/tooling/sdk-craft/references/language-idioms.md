# Language Idioms for SDKs

How to make SDKs feel native in each target language. A Python developer should never feel like they're using a translated JavaScript SDK.

## Table of contents

1. [Python](#python)
2. [JavaScript / TypeScript](#javascript--typescript)
3. [Go](#go)
4. [Java](#java)

---

## Python

**Naming**: snake_case for everything. `get_user`, `create_order`, `api_key`.

**Context managers** for resource lifecycle:

```python
# Pythonic — automatic cleanup
with client.batch() as batch:
    for user in client.users.list():
        batch.add(user.send_notification("Hello"))

# Not Pythonic — manual lifecycle
batch = client.create_batch()
try:
    for user in client.get_users():
        batch.add_operation(user.send_notification("Hello"))
    batch.execute()
finally:
    batch.close()
```

**Generators** for pagination:

```python
# Pythonic — lazy iteration
for user in client.users.list():
    process(user)
# Automatically fetches next page when current page exhausted

# Not Pythonic — load all at once
users = client.users.list_all()  # Loads everything into memory
```

**Type hints** for IDE support:

```python
from typing import Optional

def get_user(self, user_id: str) -> User:
    """Retrieve a user by ID."""
    ...

def list_users(
    self,
    page: int = 1,
    per_page: int = 20,
    sort: Optional[str] = None,
) -> PaginatedResponse[User]:
    ...
```

**Async support** via separate async client:

```python
# Sync (default)
user = client.users.get("123")

# Async
user = await async_client.users.get("123")
```

---

## JavaScript / TypeScript

**Naming**: camelCase for methods, PascalCase for types/classes.

**Promises and async/await**:

```javascript
// Idiomatic — async/await
const user = await client.users.get(id);

// Also idiomatic — destructuring
const { data, error } = await client.users.get(id);

// Not idiomatic — callbacks
client.users.get(id, function(err, result) { ... });
```

**Method chaining** where it makes sense:

```javascript
const results = await client.users
  .list()
  .filter({ role: 'admin' })
  .sort('createdAt', 'desc')
  .limit(10);
```

**Named parameters via options objects**:

```typescript
// Good: clear at call site
await client.users.create({
  email: "jane@example.com",
  name: "Jane",
  role: "admin"
});

// Bad: positional args become unreadable
await client.users.create("jane@example.com", "Jane", "admin");
```

**Exports**: named exports, never default exports (better tree-shaking and autocomplete).

---

## Go

**Naming**: PascalCase for exported, camelCase for unexported. Short names for local vars.

**Context everywhere**:

```go
// Idiomatic — context as first param
user, err := client.Users.Get(ctx, userID)
if err != nil {
    return fmt.Errorf("getting user %s: %w", userID, err)
}

// Not idiomatic — no context, panics on error
user := client.Users.Get(userID) // panics on error
```

**Error wrapping**:

```go
// Wrap errors with context
user, err := client.Users.Get(ctx, userID)
if err != nil {
    var notFound *scalekit.NotFoundError
    if errors.As(err, &notFound) {
        // Handle 404 specifically
    }
    return fmt.Errorf("getting user: %w", err)
}
```

**Functional options** for configuration:

```go
client, err := scalekit.NewClient(
    scalekit.WithAPIKey(os.Getenv("API_KEY")),
    scalekit.WithTimeout(30 * time.Second),
    scalekit.WithRetries(3),
)
```

**Interfaces** for testability:

```go
type UsersService interface {
    Get(ctx context.Context, id string) (*User, error)
    List(ctx context.Context, opts ...ListOption) ([]*User, error)
    Create(ctx context.Context, input CreateUserInput) (*User, error)
}
```

---

## Java

**Naming**: camelCase methods, PascalCase classes, UPPER_SNAKE constants.

**Builder pattern** for complex objects:

```java
MyClient client = MyClient.builder()
    .apiKey(System.getenv("API_KEY"))
    .timeout(Duration.ofSeconds(30))
    .retries(3)
    .build();
```

**Checked exceptions** for recoverable errors:

```java
try {
    User user = client.users().get(userId);
} catch (NotFoundException e) {
    // Handle 404
} catch (AuthenticationException e) {
    // Handle 401
} catch (ApiException e) {
    // Catch-all for API errors
}
```

**Fluent API** for list operations:

```java
List<User> admins = client.users()
    .list()
    .filter("role", "admin")
    .sort("createdAt", SortOrder.DESC)
    .limit(10)
    .execute();
```

**Null safety**: use `Optional<T>` for values that may be absent. Never return `null` from SDK methods — throw or return `Optional`.