---
name: pragmatic-fp
description: |
  Pragmatic 80/20 guide to functional programming in TypeScript with fp-ts. Master pipe, Option, Either, map, and flatMap — and know exactly when to skip FP entirely. Use this skill for a pragmatic starting point for fp-ts or functional programming in TypeScript, when the task is exploratory or educational and needs the 80/20 view of what is actually worth adopting, deciding if FP helps or hurts readability, replacing defensive null checks and try-catch with Option/Either, or getting before-and-after refactors for real code. Also activates for questions about "pragmatic functional programming", "fp-ts pipe Option Either", "when not to use functional programming", "80/20 fp-ts", or "pragmatic fp in TypeScript".
license: MIT
metadata:
  author: saif-shines
  version: "1.0"
  type: assistive
  mode: directive
---

# Pragmatic Functional Programming

**Read this first.** This guide cuts through the academic jargon and shows what actually matters. No category theory. No abstract nonsense. Just patterns that make your code better in practice.

This skill gives you the 80/20 of fp-ts in TypeScript: the five patterns that deliver most of the benefit, clear rules for when to use them, and — most importantly — when to keep code simple instead.

State what you're trying to do (e.g. "I have a chain of null checks" or "help me decide if I should introduce fp-ts here") or name the mode below.

## Modes

| Mode | What you get | Load |
|------|--------------|------|
| Core patterns | The five patterns (pipe, Option, Either, map, flatMap) with before/after and plain-language translations | `references/80-20-patterns.md` |
| When to skip | Concrete cases where FP hurts more than it helps + what to use instead | `references/when-not-to-use.md` |
| Quick wins | Five easy, high-impact changes you can make today | `references/quick-wins.md` |
| Real refactors | Before-and-after for callback hell, multi-null chains, validation, and Promise code | `references/common-refactors.md` |
| Readability + cheat sheet | The "would a junior understand this?" rule, good vs too-clever examples, and quick-reference table | `references/readability-rule.md` |

## Golden Rule

> **If functional programming makes your code harder to read, don't use it.**

FP is a tool, not a religion. Use it when it helps. Skip it when it doesn't.

---

## Limitations

> Load `references/limitations.md` for the precise scope and boundaries of this skill.

## Phase gates

**Core patterns → Apply:** You can state the golden rule and name the five patterns with their primary use case?

**Apply a pattern → Restrain:** You have identified at least one place in the current task where the simple/idiomatic version is better?

**Any change → Readability:** The result is at least as easy for a junior developer to read as the starting code?

## Quality checklist

- [ ] Golden Rule stated or referenced before recommending any FP construct
- [ ] At least one "when to skip" case considered for the current task
- [ ] Before/after examples are realistic and small enough to be copy-paste useful
- [ ] Cheat sheet or plain-language translation provided when introducing Option/Either/flatMap
- [ ] If the code is performance-critical, hot-path, or the team has low FP familiarity, the simple version was offered first
- [ ] Output ends by asking the user whether this solved what they were trying to do

## Did this help?

At the end of every session, ask: **"Did this solve what you were trying to do?"**

- If yes: done.
- If the routing to a pattern was wrong, a "when not to use" case was missed, an example was confusing, or the advice led to harder-to-read code: encourage the user to file an issue at **https://github.com/saif-shines/devex-kit/issues**. Offer to help draft it — include what they were trying to do, what this skill produced, and what felt missing or incorrect.
