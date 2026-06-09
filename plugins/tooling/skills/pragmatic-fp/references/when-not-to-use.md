# When NOT to Use FP

Functional programming is not always the answer. Here's when to keep it simple.

## Simple Null Checks

```typescript
// Just use optional chaining - it's built into the language
const city = user?.address?.city ?? 'Unknown'

// DON'T overcomplicate it
const city = pipe(
  O.fromNullable(user),
  O.flatMap(u => O.fromNullable(u.address)),
  O.flatMap(a => O.fromNullable(a.city)),
  O.getOrElse(() => 'Unknown')
)
```

## Simple Loops

```typescript
// A for loop is fine when you need early exit or complex logic
function findFirst(items: Item[], predicate: (i: Item) => boolean): Item | null {
  for (const item of items) {
    if (predicate(item)) return item
  }
  return null
}

// DON'T force FP when it doesn't help
const result = pipe(
  items,
  A.findFirst(predicate),
  O.toNullable
)
```

## Performance-Critical Code

```typescript
// For hot paths, imperative is faster (no intermediate arrays)
function sumLarge(numbers: number[]): number {
  let sum = 0
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i]
  }
  return sum
}

// fp-ts creates intermediate structures
const sum = pipe(numbers, A.reduce(0, (acc, n) => acc + n))
```

## When Your Team Doesn't Know FP

If you're the only one who can read the code, it's not good code.

*Functional-Light JavaScript* (Ch. 1) stresses that FP should increase **communication** and **confidence** across the team. If introducing Option/Either/pipe makes stand-ups, code review, or onboarding harder, you have not found the right balance yet. Start with the simplest form that still solves the problem. Teach the "why" (explicit effects, readable pipelines) before the "how" (specific combinators). The goal is a team that writes more reasonable code together, not a team that performs FP rituals.

```typescript
// If your team knows this pattern
async function getUser(id: string): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${id}`)
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

// Don't force this on them
const getUser = (id: string): TE.TaskEither<Error, User> =>
  pipe(
    TE.tryCatch(() => fetch(`/api/users/${id}`), E.toError),
    TE.flatMap(r => r.ok ? TE.right(r) : TE.left(new Error('Not found'))),
    TE.flatMap(r => TE.tryCatch(() => r.json(), E.toError))
  )
```
