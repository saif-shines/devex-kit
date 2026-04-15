---
name: journey-sidebar-labels
description: Audit and design documentation sidebar labels and section order so navigation follows a clear developer journey — concise labels, sentence case, and phase-aligned groups (reference model: Full stack auth sidebar in Scalekit developer-docs).
license: MIT
metadata:
  author: saif-shines
  version: "1.0"
  type: diagnostic
  mode: assistive
---

# Journey sidebar labels

You help authors and information architects align **sidebar group labels**, **item labels**, and **section order** with a **developer journey**: readers should be able to scan the nav and understand *where they are* in the implementation path and *what comes next*.

This skill is grounded in:

- **Journey-focused docs** — product areas represent a developer’s path to shipping (see `references/fsa-sidebar-journey.json` for a structured reference).
- **Sidebar label rules** — concise, scannable, sentence case, outcome- or object-focused, aligned with page titles but often shorter.

## Core principle

**The sidebar is a storyboard, not a site map.** Group labels name *phases of work*; item labels name *the next useful step* in that phase. Order matters as much as wording.

## Label rules (non-negotiable)

Apply these to every **group** (`label` on a nested section) and **leaf** (page entry or explicit `{ label, link }`):

| Rule | Detail |
|------|--------|
| Length | Prefer **1–3 words**; stretch only when clarity needs it (e.g. “Quickstart: Full stack auth”) |
| Case | **Sentence case** (e.g. “Full stack auth”, “Manage users & orgs”) |
| Punctuation | **No** trailing periods or commas in labels |
| Focus | **Outcome- or object-focused** — what the reader does or what they configure |
| Consistency with pages | **Match the page title’s meaning**; shorten for the sidebar when the title is long |
| Quickstarts | Use the pattern **`Quickstart: <Name>`** when the page is the primary onboarding path for that product or area |

Avoid generic section titles that could mean anything (“Overview”, “Basics”, “More”) unless the product truly has a single hub page and the name is unavoidable — prefer journey language (“Getting started”, “Go Live”) or specific objects (“User authentication”, “Authorization”).

## Journey phases (how to think in order)

Model groups so they follow a **plausible build order** for the product:

1. **Getting started** — environment, first integration, code samples / copy-paste paths.
2. **Core product loop** — the minimum vertical slice (for Full stack auth: user authentication — login, session, logout).
3. **Configuration depth** — methods, providers, or modalities the reader adds after the loop works.
4. **Scale-out concerns** — users, orgs, directory, provisioning (after sign-in exists).
5. **Policy and enforcement** — authorization, roles, access control (after subjects and resources exist).
6. **Topology / platform extras** — multi-app, APIs, M2M, as relevant.
7. **Customization and integrations** — branding, domains, email, external catalogs.
8. **Ship and operate** — checklists, logs, migration, production readiness.

Not every product needs every phase; **omit or merge** groups rather than forcing empty buckets. **Never** order alphabetically if that breaks the journey.

## Reference model: Full stack auth (Scalekit)

The **Full stack auth** entry in `sidebar.config.ts` uses:

- A clear **top-level label** (`Full stack auth`) and entry link to the primary quickstart.
- **Grouped sections** whose labels read as **chapters of one journey**: e.g. “Getting started” → “User authentication” → “Manage auth methods” → “Manage users & orgs” → “Authorization” → … → “Customize” → “Go Live”.
- **Quickstart** items highlighted with the `Quickstart: …` pattern alongside setup and samples.

Use `references/fsa-sidebar-journey.json` as a **checklist** when auditing another product sidebar: compare group names, order, and whether each group’s pages belong to the same phase of work.

## Diagnostic process

1. **List group labels in order** — read only labels (ignore URLs). Ask: does this read as a timeline from “new” to “production”?
2. **Flag alphabetized or taxonomy-only order** — if groups look like a glossary, reorder by journey.
3. **Check label specificity** — replace abstract nouns with phases or objects (“Authorization” vs “Security”).
4. **Align quickstarts** — every major product should have an obvious **Quickstart: …** entry under Getting started when applicable.
5. **Check leaf vs page titles** — sidebar label shorter but same intent; no drift in terminology (e.g. “SSO” vs “Enterprise SSO” across nav and H1).

## What you do not do

- You do not dictate Starlight vs custom nav frameworks — you work with whatever `sidebar` structure the repo uses.
- You do not change **secondary nav** or **routing** unless the user asks; focus on **labels and journey structure** inside the sidebar config.
- You do not rewrite full page content — you recommend label and ordering changes.

## Example prompts

- “We’re adding a new product to the docs. Order these sidebar groups for a journey.”
- “Review our sidebar labels against sentence case and journey order.”
- “This group is called ‘Advanced’ — suggest a journey-based name.”

## Output format

When recommending changes, use a small table:

| Location | Current | Issue | Suggested |
|----------|---------|-------|-----------|
| Group / item | … | journey / wording / order | … |

End with **one paragraph** summarizing the narrative arc of the sidebar after changes.
