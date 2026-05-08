# Content placement decisions

Use this when you have new information to document and need to decide where it goes and what form it takes.

## The core question

**What is the reader trying to accomplish when they land on this content?**

Answer this before deciding the content type. Content that solves the wrong problem at the wrong moment adds noise, not value.

## Decision tree

```
New information to document
│
├─ Solves one specific implementation problem?
│  Useful even to someone not using this product?
│  Standalone — no context needed from other pages?
│       └─ YES → Cookbook recipe
│
├─ Step-by-step task a developer follows within a product?
│  Part of the product's normal journey (setup → use → configure)?
│       └─ YES → How-to guide (in the product folder)
│
├─ Explains why something works, the architecture, a concept, or a mental model?
│  Reader needs understanding before they can act?
│       └─ YES → Concept page (in the product folder)
│
├─ Lookup data: API shapes, event schemas, error codes, config options?
│       └─ YES → Reference page (under reference/ or API reference)
│
├─ First experience with a product, from zero to working?
│       └─ YES → Quickstart (one per product, at product/quickstart.mdx)
│
└─ A short note that clarifies or warns?
         └─ See Aside anti-pattern below
```

## Aside anti-pattern

`<Aside>` callouts communicate incidental context — a caution, a tip, a note the reader might need but can read past. They are NOT containers for real content.

**Promote an Aside to a dedicated page or block when any of these is true:**

| Signal | What to do |
|---|---|
| Aside exceeds 3 sentences | Extract to a `<details>` FAQ block at bottom of page, or a dedicated page |
| Same Aside content appears on 2+ pages | Consolidate into one dedicated page or concept page; link from each |
| Aside answers a recurring support question | Promote to FAQ `<details>` block or cookbook recipe |
| Aside contradicts or complicates the main procedure | Restructure the procedure; the conflict is a sign the page has a clarity problem |

Pages that accumulate Asides become unmaintainable. Each new Aside adds reading tax for every future visitor. When in doubt, promote.

## Content types at a glance

### Cookbook recipe
- One specific problem, one solution, independently useful
- Goes in `cookbooks/<slug>.mdx`
- Does not appear in the sidebar (auto-listed at `/cookbooks/`)
- Uses `starlight-blog` frontmatter: `title`, `description`, `date`, `tags`, `excerpt`, `authors`
- P.A.T. structure: Problem → Angle → Teach

### How-to guide
- Task-oriented, procedure-driven
- Structure: Overview → Prerequisites → Steps (`<Steps>`) → Verify → Next steps → optional FAQ
- Goes in `<product>/guides/<task>.mdx` or `guides/<cross-cutting-topic>.mdx`

### Concept page
- Explanatory, no procedure
- Structure: Overview → How it works → Key concepts → Use cases → Best practices → Related guides
- Goes in `<product>/concepts/<concept>.mdx` or alongside related how-to guides in the product folder

### Reference page
- Lookup, not reading
- Structure: summary table → detailed entries → examples
- Goes in `reference/<topic>.mdx` or under the product's reference section

### Quickstart
- One per product, focused on the shortest path to a working result
- Goes at `<product>/quickstart.mdx`
- If a quickstart exists, do not create another; update the existing one or create a how-to guide for the variant

## Checking for duplication before creating

Before creating a new page:
1. Search for existing pages covering the same topic.
2. If an existing page is close but incomplete, update it.
3. If the topic overlaps with a journey page, extend it — don't create a parallel page that diverges.
4. If the information does not fit any existing journey and is genuinely standalone, use a cookbook.

Creating a new page when an existing one could be updated is the most common source of doc sprawl.

## Frontmatter starter (how-to guide)

```yaml
---
title: '<Action verb + object, ≤60 chars>'
description: '<One sentence: what the reader will do and why, ≤160 chars>'
sidebar:
  label: '<1–3 words, sentence case>'
  order: <integer, if position matters>
---
```

## Frontmatter starter (cookbook recipe)

```yaml
---
title: '<Verb-first task title, ≤60 chars>'
description: '<Problem + outcome, ≤160 chars>'
date: YYYY-MM-DD
tags: ['tag-one', 'tag-two']
excerpt: >
  2–3 sentence teaser: problem, approach, why it matters.
featured: false
authors:
  - name: 'Your Name'
    title: 'Your Role'
    url: 'https://linkedin.com/in/yourprofile'
    picture: '/images/blog/authors/your-photo.jpg'
---
```
