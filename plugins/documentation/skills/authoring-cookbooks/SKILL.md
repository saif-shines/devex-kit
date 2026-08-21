---
name: authoring-cookbooks
description: Diagnose and fix documentation quality problems in cookbook-style writing: skimmability, writing clarity, and reader helpfulness.
license: MIT
metadata:
  author: saif-shines
  version: "1.1"
  type: diagnostic
  mode: diagnostic+assistive
  maturity_score: 18
---

# Authoring Cookbooks

Diagnose cookbook quality. Fix one state at a time. Do not rewrite a whole book in one pass.

## Core principle

Every structural choice must reduce the reader's load, not the author's writing effort.

## States

| ID | Name | Symptom |
|----|------|---------|
| AC1 | Structure Void | Noun titles, no TOC, dense prose |
| AC2 | Buried Takeaways | Conclusion comes after long setup |
| AC3 | Parsing Tax | Long left-branching sentences |
| AC4 | Consistency Breaks | Same idea named two ways |
| AC5 | Expertise Gap | Jargon and missing prerequisites |
| AC6 | Fragile Examples | Examples need extra pages or secrets |
| AC7 | Priority Inversion | Rare cases documented, common ones missing |

> For expanded symptoms, questions, and interventions, load `references/states.md`.

## Diagnose

1. Read 3 random recipes and match them to the states.
2. Skim headings only. Headings must tell the story.
3. Read the first sentence of each paragraph. It must stand alone.
4. Ask: can a new reader succeed with this page alone?
5. Flag anything that reads as "that's weird".
6. Check the most common reader questions against coverage.
7. Pick the one most useful state. Fix that state first.

> For triage questions and example sessions, load `references/questions-and-examples.md`.
> For anti-patterns, load `references/anti-patterns.md`.
> For recipe components, load `references/recipe-components.json`.
> For reasoning, execution, and handoff notes, load `references/operations.md`.

## Tools

Generate a recipe stub:

```bash
deno run --allow-read --allow-write scripts/recipe-scaffold.ts "recipe-name"
```

Audit a recipe folder:

```bash
deno run --allow-read scripts/coverage-audit.ts ./recipes/
```

## Do not

- Do not grade code accuracy.
- Do not rewrite entire docs. Diagnose, scaffold, and guide.
- Do not apply every intervention at once.
- Do not skip triage.

## Did this help?

At the end of every session, ask: **"Did this solve what you were trying to do?"**

- If yes: done.
- If the diagnostic missed the real problem, an intervention made things worse, or a state was not covered: encourage the user to file an issue at **https://github.com/saif-shines/devex-kit/issues**. Offer to help draft it. Include the symptoms, the state named, and what was wrong in the output.
