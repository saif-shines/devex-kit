# The Readability Rule

Before using any FP pattern, ask: **"Would a junior developer understand this?"**

This rule is directly inspired by the "Functional-Light" perspective in Kyle Simpson's *Functional-Light JavaScript* (Chapter 1: "Readability", "Communication", "Confidence", and "How to Find Balance"). The goal of FP is not cleverness or purity for its own sake — it is *reasonable code*: code that is easier for humans to read, reason about, communicate about, and maintain over time. "Light" FP means applying these ideas only where they actually help humans.

## Too Clever (Avoid)

```typescript
const result = pipe(
  data,
  A.filter(flow(prop('status'), equals('active'))),
  A.map(flow(prop('value'), multiply(2))),
  A.reduce(monoid.concat, monoid.empty),
  O.fromPredicate(gt(threshold))
)
```

## Just Right (Prefer)

```typescript
const activeItems = data.filter(item => item.status === 'active')
const doubledValues = activeItems.map(item => item.value * 2)
const total = doubledValues.reduce((sum, val) => sum + val, 0)
const result = total > threshold ? O.some(total) : O.none
```

## The Middle Ground (Often Best)

```typescript
const result = pipe(
  data,
  A.filter(item => item.status === 'active'),
  A.map(item => item.value * 2),
  A.reduce(0, (sum, val) => sum + val),
  total => total > threshold ? O.some(total) : O.none
)
```

## Reasonable Code (Functional-Light Mindset)

From *Functional-Light JavaScript*:

- **Readability first**: Code is written for humans. If the FP version requires the reader to mentally "unfold" a long pipeline or hold many higher-order functions in their head, it has failed.
- **Communication**: Good code lets teammates (and future you) talk about *what* it does, not just *how* the combinators are wired.
- **Confidence**: FP should reduce fear of changing code, not increase it through cleverness.
- **Balance**: Use FP where it increases these qualities. Drop it (or use the imperative/middle-ground form) where it decreases them. This is the heart of "light" FP.

The examples above show the progression from too-clever → middle-ground (often the sweet spot) → plain JS when that communicates best.

---

## Cheat Sheet

| What you want | Plain language | fp-ts |
|--------------|----------------|-------|
| Handle null/undefined | "Wrap this nullable" | `O.fromNullable(x)` |
| Default for missing | "Use this if nothing" | `O.getOrElse(() => default)` |
| Transform if present | "If something, change it" | `O.map(fn)` |
| Chain nullable operations | "If something, try this" | `O.flatMap(fn)` |
| Return success | "Worked, here's the value" | `E.right(value)` |
| Return failure | "Failed, here's why" | `E.left(error)` |
| Wrap throwing function | "Try this, catch errors" | `E.tryCatch(fn, onError)` |
| Handle both cases | "Do this for error, that for success" | `E.fold(onLeft, onRight)` |
| Chain operations | "Then do this, then that" | `pipe(x, fn1, fn2, fn3)` |

---

## When to Level Up

Once comfortable with these patterns, explore:

1. **TaskEither** - Async operations that can fail (replaces Promise + try/catch)
2. **Validation** - Collect ALL errors instead of stopping at first
3. **Reader** - Dependency injection without classes
4. **Do notation** - Cleaner syntax for multiple bindings

But don't rush. The basics here will handle 80% of real-world scenarios. Get comfortable with these before adding more tools to your belt.

---

## Summary

1. **Use pipe** for 3+ operations
2. **Use Option** for nullable chains
3. **Use Either** for operations that can fail
4. **Use map** to transform wrapped values
5. **Use flatMap** to chain operations that might fail
6. **Skip FP** when it hurts readability
7. **Keep it simple** — if your team can't read it, it's not good code
