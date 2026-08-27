---
name: pragmatic-fp
description: |
  Apply 80/20 fp-ts in TypeScript and skip FP when it hurts readability.
  Use when choosing pipe, Option, or Either, or deciding whether FP helps the code.
  It does not apply named community styles (that's `code-style-patterns`).
license: MIT
metadata:
  author: saif-shines
  version: "1.1"
  type: assistive
  mode: directive
---

# Pragmatic Functional Programming

**Read this first.** This guide cuts through the academic jargon and shows what actually matters. No category theory. No abstract nonsense. Just patterns that make your code better in practice.

This skill gives you the 80/20 of fp-ts in TypeScript, informed by the "Functional-Light" mindset from Kyle Simpson's *Functional-Light JavaScript*: focus on readable, "reasonable" code; use FP where it increases confidence and communication; stop where it hurts clarity.

The five patterns deliver most of the benefit. Clear rules tell you when to use them: and, most importantly, when to keep code simple instead.

State what you're trying to do (e.g. "I have a chain of null checks" or "help me decide if I should introduce fp-ts here") or name the mode below.

## Modes

| Mode | What you get | Load |
|------|--------------|------|
| Core patterns | The five patterns (pipe, Option, Either, map, flatMap) with before/after and plain-language translations, grounded in practical composition and side-effect management | `references/80-20-patterns.md` |
| When to skip | Concrete cases where FP hurts more than it helps + what to use instead (including "reasonable code" balance from Functional-Light principles) | `references/when-not-to-use.md` |
| Quick wins | Five easy, high-impact changes you can make today | `references/quick-wins.md` |
| Real refactors | Before-and-after for callback hell, multi-null chains, validation, and Promise code | `references/common-refactors.md` |
| Readability + cheat sheet | The "would a junior understand this?" rule (echoing FLJS emphasis on readability and communication), good vs too-clever examples, and quick-reference table | `references/readability-rule.md` |

## Golden Rule

> **If functional programming makes your code harder to read, don't use it.**

This is the core of "Functional-Light" thinking (see Kyle Simpson's *Functional-Light JavaScript*, especially Chapter 1 on readability, confidence, and finding balance). FP is a tool for writing more *reasonable* code: code that is easier for humans (including future you and junior teammates) to understand, communicate about, and maintain. It is not a religion or an end in itself.

Use the patterns below when they increase clarity and reduce surprises. Skip them (or use simpler idioms) when they add noise. The goal is better code, not "more FP."

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
- If the routing to a pattern was wrong, a "when not to use" case was missed, an example was confusing, or the advice led to harder-to-read code: encourage the user to file an issue at **https://github.com/saif-shines/devex-kit/issues**. Offer to help draft it: include what they were trying to do, what this skill produced, and what felt missing or incorrect.
