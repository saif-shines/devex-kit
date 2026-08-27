---
name: docs-contribution-router
description: Ask which docs path a contribution should take. A user-started orchestrator.
disable-model-invocation: true
license: MIT
metadata:
  author: saif-shines
  version: "1.2"
  type: router
  mode: directive
  maturity_score: 10
---

# Docs contribution router

Route contributors to the right content type, placement, and workflow before they start writing. Output a clear action plan: content type, file path, frontmatter starter, and a sidebar label suggestion.

It does not write the page (that's `docs-writing-style`).

Do not wait for a polished proposal. Route on stated intent. "I want to document X" is enough.

## Core principle

**Every contribution has an established path. Surface it immediately so the contributor writes the right thing in the right place the first time.**

## Intent classifier

Map contributor intent to a branch. Ask one clarifying question only if the intent is genuinely ambiguous.

| Stated intent | Branch |
|---|---|
| Update the API reference / OpenAPI spec / scalar.yaml | [API reference](#api-reference) |
| Document a customer issue / add new info / new guide / new concept / FAQ | [Content placement](#content-placement) |
| Write an integration guide / add screenshots | [Integration guide](#integration-guide) |

When intent spans two branches, handle placement first, then the other branch.

For Scalekit agent-connector docs or Scalekit escalation / CODEOWNERS review, stop. That work lives in skillkit `docs-engineering`.

---

## API reference

> Load `references/api-reference-flow.md` for the full step-by-step workflow.

Key facts:
- API specs are **generated upstream**; the docs repo consumes the output.
- The contributor should receive a regenerated spec file: they should not hand-edit spec files in the docs repo.
- Direct edits to spec files are overwritten on the next generation run.
- After dropping the spec, run search-index regeneration and verify the site builds cleanly.

If the contributor wants to change what appears in the API reference (not just update it), redirect: the change must happen in the source repository.

---

## Content placement

> Load `references/placement-decisions.md` for the full decision tree and Aside anti-pattern rules.
> Load `references/scalekit-placement-map.json` (or `<docs-repo>/.devex-kit/placement-map.json` if the consumer has one).

Ask: *"What is the reader trying to accomplish when they land on this content?"*

| Reader goal | Content type | Placement |
|---|---|---|
| Solve one specific implementation problem | Cookbook recipe | `cookbooks/<slug>.mdx` |
| Follow a task step by step within a product | How-to guide | `<product>/guides/<task>.mdx` |
| Understand a concept, architecture, or pattern | Concept page | `<product>/concepts/<concept>.mdx` |
| Look up reference data (API shapes, errors, events) | Reference | `reference/<topic>.mdx` or API ref |
| Get started with a product for the first time | Quickstart | `<product>/quickstart.mdx` |

**Aside anti-pattern: promote when any of these is true:**
- The `<Aside>` exceeds 3 sentences.
- The same Aside content appears on 2+ pages.
- The Aside answers a recurring support question.
- The Aside is a workaround or exception that contradicts the main procedure.

Promote to: a dedicated page (full topic), a cookbook recipe (implementation pattern), or a `<details>` FAQ block at the bottom of the existing page (short clarification).

---

## Integration guide

> Load `references/integration-guide-template.md` for the section skeleton and frontmatter.
> Load `references/screenshot-workflow.md` for the paste-image plugin setup and naming conventions.

Key facts:
- Integration guides go in `src/content/docs/guides/integrations/<category>/<provider>/`.
- After adding a guide, update the relevant index page for that integration category.
- Screenshots: install the VS Code paste-image extension (already recommended in the repo's `.vscode/extensions.json`). It pastes images directly into the correct asset path with the correct URL pattern.

---

## Output format

For every routing decision, produce:

```
Content type: <type>
File path:    <proposed path>
Frontmatter:
  title:           '<≤60 chars>'
  description:     '<≤160 chars>'
  sidebar.label:   '<1–3 words, sentence case>'
```

Then: one short paragraph describing what the page should cover and how it fits the reader's journey.

---

## Did this help?

At the end of every session, ask: **"Did this solve what you were trying to do?"**

- If yes: done.
- If the routing was wrong, a branch was missing, or the output was unhelpful: encourage the user to file an issue at **https://github.com/saif-shines/devex-kit/issues**. Offer to help draft it using their agent. Include what they were trying to do, what the skill produced, and what was missing or incorrect.

---

## Adapt to your docs site

This skill is site-agnostic. To adapt placement:

1. Copy `references/_template-placement-map.json` → `<your-docs-repo>/.devex-kit/placement-map.json` and fill in your folder conventions.
2. The skill checks `<docs-repo>/.devex-kit/placement-map.json` first.

Scalekit agent-connector flows and Scalekit escalation / CODEOWNERS rules live in skillkit `docs-engineering`. Do not recreate them here.
