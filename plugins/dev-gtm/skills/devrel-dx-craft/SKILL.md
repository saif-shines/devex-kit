---
name: devrel-dx-craft
description: |
  Design DX for first success and adoption, choose the right content types (Sample Applications, Code Snippets/Recipes, Solution Patterns), apply "content has a job" and translator principles, and run an effective technical engagement system. Use when working on getting-started experiences, sample apps vs recipes vs patterns decisions, content strategy, onboarding, or DX audits for developer-facing products. Also activates for mentions of "first success", "sample applications", "code snippets", "recipes", "solution patterns", "dx journey", "onboarding", "content has a job", "translator", "share knowledge not features", "technical engagement system", or "dev gtm".
license: MIT
metadata:
  author: saif-shines
  version: "1.0"
  type: assistive
  mode: lifecycle
---

# DevRel DX Craft

State the area (DX Journey & First Success, Content Taxonomy, Content Jobs & Strategy) and whether you want review/audit or help planning/generating.

| Area                          | Review / Audit                                      | Plan / Generate                                      |
|-------------------------------|-----------------------------------------------------|------------------------------------------------------|
| DX Journey & First Success    | Audit getting-started for first-success gaps        | Map DX journey, design first-success path            |
| Content Taxonomy              | Audit against 3 patterns (Sample Apps / Recipes / Patterns) | Decide taxonomy using decision table from MD note    |
| Content Jobs & Strategy       | Audit for "features not knowledge", unclear jobs    | Map content to jobs, generate plans via Engagement System |

> For the full DX journey stages, first-success criteria, common onboarding mistakes, and elements of great DX, load `references/dx-journey.md`.
>
> For the exact 3 Content Patterns table (Sample Applications, Code Snippets/Recipes, Solution Patterns) with decision criteria, when-to-use, examples, and anti-patterns, load `references/content-taxonomy.md`.
>
> For translator role, "content has a job", Technical Engagement System, start with technical problems, DIY instinct, numbers that matter, and how to generate plans, load `references/content-jobs.md`.

## How to use this skill

1. Declare the area and mode up front: e.g. "Content Taxonomy, decide for the auth accelerator first-success" or "DX Journey, audit this getting-started for first-success gaps".
2. The skill will first enforce phase gates (you may not choose taxonomy until first-success path is defined).
3. For any output, the agent must cite the specific section or rule from the loaded references.
4. Under pressure (tight deadline, "just pick a sample app", "list the features first"): the counters in the references are mandatory. "Features list before first success? Delete and restart with the job and sample path. No exceptions."

## DX Journey & First Success (Review or Generate)

**Review mode:** Take the getting-started experience or onboarding flow. Run it against the stages and common mistakes in `references/dx-journey.md`. Flag gaps in first success (no runnable sample that delivers a real use case win in <5 min). Check that it leads with problem not feature list.

**Generate / Plan mode:**
- Map the current state to the 4 stages: First Impression, First Experience, First Success, Last Visit.
- Design the first-success path using a concrete sample application that lets the dev experience the core value without leaving the experience.
- Produce checklists, gap analysis, and the exact first-success criteria.

**Mandatory before declaring first success reachable:**
- There is a complete, runnable Sample Application (or justified Recipe/Pattern) that achieves a real-world use case win.
- The dev can go from zero to "it works for my problem" without reading a features list first.
- Onboarding avoids the common mistakes: long setup, no code, features dump, skipping the "why this solves my daily pain".

First impression is reputation and discovery; first success must be use-case driven via sample apps.

> Load `references/dx-journey.md` for the full list of "Avoid These Common Getting Started Mistakes", the mandatory First Success Criteria (runnable repo + visible win in minutes + tutorial that teaches knowledge), the four stages, and the "Elements of a Great Developer Experience" checklist.

## Content Taxonomy (Review or Generate)

**Review mode:** Audit the proposed content or existing getting-started against the exact 3 patterns table in `references/content-taxonomy.md`. If a full end-to-end demo is presented as a short recipe, or a simple feature is given a full sample app repo, flag the mismatch with "Why bad" and recommended name.

**Generate / Plan mode:**
- Use the decision table exactly: End-to-End Demos = Sample Applications; Feature Examples = Code Snippets/Recipes; Comparative Scripts = Solution Patterns.
- Justify the choice with the expanded criteria (problem complexity, time to first success, need for comparison).
- Produce the taxonomy decision + rationale + examples tailored to the product.

**Anti-patterns to call out explicitly:**
- Using Sample Application for a single API call (too heavy; use Recipe instead).
- Using Recipe/Snippet when the value requires seeing the full system working together (use Sample App).
- Jumping to Solution Patterns before the dev has a first success to compare against.

> Load `references/content-taxonomy.md` for the EXACT MD note table, the full expanded decision criteria, when-to-use rules per pattern, anti-patterns, and the explicit counters for rationalizations such as "Auth is sensitive so recipe is safer" or "Recipe is faster to ship under deadline". The Rationalization Counter Table (REFACTOR) must be cited under pressure.

## Content Jobs & Strategy (Review or Generate)

**Review mode:** Audit the content series or plan for "features not knowledge" language, unclear job, starting with product instead of technical problem. Use the principles in `references/content-jobs.md`.

**Generate / Plan mode:**
- Act as translator: start with the technical problem the dev faces.
- Map each piece of content to a job in the Technical Engagement System.
- Generate plans that respect DIY instinct, search for solutions not products, use the lingua franca of code + problems.

Translate between the product's capabilities and the developer's daily technical reality. Good content has a job.

> Load `references/content-jobs.md` for "You Are a Translator", "Start With Technical Problems", "Good Content Has a Job", the full 5-stage Technical Engagement System, "Understand the DIY Instinct", "Search Solutions, Not Products", "The Lingua Franca", "Numbers That Matter", and the exact 7-step mapping practice that must be followed before any content is planned or written. Cite the combined Rationalization Counter Tables from content-jobs.md and content-taxonomy.md.

## Phase Gates

Before moving between areas, verify:

**DX Journey & First Success → Content Taxonomy:** The first-success path has been explicitly designed (the concrete use case the dev must achieve, the time-to-win target, the runnable artifact that delivers it). If only features or onboarding steps without a winning sample/use-case are defined, return to DX Journey. Taxonomy choice is meaningless without first success defined.

**Content Taxonomy → Content Jobs & Strategy:** The chosen pattern (Sample App / Recipe / Pattern) is documented with justification from the table. The content plan must start with the job (problem the dev is solving) not the output format.

**Content Jobs & Strategy → Done:** Every content item is mapped to a job in the Engagement System, starts with technical problem, respects translator role, and can be measured against "did the dev achieve their job?" (not pageviews or signups alone).

**Any area → Done:** The output cites the specific rule, table row, or checklist used from the references. The user can see which mistake (e.g. "features list first", "sample for a snippet problem") was avoided.

## REFACTOR Hardening (pressure-specific rules added after GREEN re-tests)

When the user adds time pressure, "just pick one", "features list is fine for now", "long onboarding is what we have", "ship the comparison for awareness, sample can come later":

- First-success is non-negotiable: you may not recommend a taxonomy or generate content plans until a concrete Sample Application (or justified alternative) that delivers a real use-case win is defined.
- "Just list the features for the getting started page" is always rejected. Restart with the problem the dev has and the sample that lets them solve it.
- Never use "sample app" for anything smaller than an end-to-end runnable use case that proves the value. Cite the table.
- The job comes before the content type. If the job is unclear, stop and define the technical problem + DIY pain first (per content-jobs.md).
- Under any "audit this bad getting started quickly", still run the full dx-journey checklist and taxonomy audit before suggesting "improvements" that leave the core gaps.
- Comparisons and "best practices" (Solution Patterns) may not be generated or recommended until the audience has a first-success baseline (see content-taxonomy.md Rationalization Counter Table row on "ship the comparison now").
- "The tiny sample is basically a recipe": label by the job and table criteria (multiple components in one runnable context = Sample Application), not by code size.
- Even after taxonomy is "settled", every artifact must still obey dx-journey "no features list first" and content-jobs "start with technical problem". "We can fix the body later" is rejected.
- Cite the full Rationalization Counter Table rows from content-taxonomy.md and content-jobs.md by number when any shortcut temptation appears.

All agents must cite the Rationalization Counter Table in content-taxonomy.md and content-jobs.md when they feel the urge to shortcut.

## Quality Checklist

Before declaring the session complete for any area:

- [ ] Frontmatter matches exact devex-kit shape (license + metadata, third-person description with real trigger phrases).
- [ ] Phase/mode tables present and support both review + generate.
- [ ] All heavy content externalized to references/ with load blockquotes for dx-journey.md, content-taxonomy.md, and content-jobs.md.
- [ ] The MD note table for 3 patterns is used EXACTLY in content-taxonomy.md, with expanded decision criteria, examples, and anti-patterns synthesized from the books.
- [ ] DX journey stages + first success via samples, "share knowledge not features", translator, content has a job, Technical Engagement System, DIY instinct are synthesized actionable checklists (not pasted book text).
- [ ] Explicit counters for rationalizations ("Features list before first success? Delete... No exceptions.") are present and referenced in outputs. Rationalization Counter Table present in references (REFACTOR hardened).
- [ ] Phase gates are stated and enforced in the response.
- [ ] Integration graph + "When to switch skills" + "Did this help?" present.
- [ ] writing-skills TDD baselines passed (RED captured in tmp/, GREEN showed compliance, REFACTOR closed loopholes with table + re-tests); agents comply under pressure and cite sections.
- [ ] No duplication with existing skills; clear complementary links to devrel-story-craft, docs-writing-style, authoring-cookbooks, devrel-tooling.
- [ ] tile.json present and correct.

## Integration Graph

**Inbound triggers:**
- From docs-writing-style or authoring-cookbooks: "The getting started doesn't land" or "this tutorial series feels like feature dump" → route to DX audit + taxonomy.
- From devrel-story-craft: Weak story means unclear villain/pain → first success path will fail; return to story-craft.
- From devrel-tooling: Need to generate the actual sample repo or recipe scaffold once DX path is chosen.
- From any skill mentioning "onboarding", "getting started", "sample app", "first success", "content strategy", "dev gtm".

**Outbound handoffs:**
- After first-success path + taxonomy decided → hand off to authoring-cookbooks or docs-writing-style for the actual tutorial/recipe writing.
- After taxonomy requires code artifacts → devrel-tooling for SDK patterns, CLI generators, or sample scaffolding.
- Cross-link to devrel-story-craft: A first-success sample is only as good as the validated story behind the problem it solves.

## When to switch skills

- For actual authoring of the tutorials, recipes, or sample explanations: use `docs-writing-style` or `authoring-cookbooks` after the taxonomy and jobs are defined here.
- For the underlying story/villain/TAB validation that makes the first-success problem authentic: use `devrel-story-craft`.
- For building the actual sample apps, CLI tools, or SDKs that power the DX path: use `devrel-tooling` (after this skill designs the path).
- For docs contribution routing or style: documentation/ skills.

## Did this help?

At the end of every session, ask: **"Did this solve what you were trying to do?"**

- If yes: done.
- If the taxonomy choice was wrong for the use case, or first success still has gaps (long onboarding, features first), or content plans still start with product instead of the dev's technical job: encourage the user to file an issue at **https://github.com/saif-shines/devex-kit/issues**. Offer to help draft it using their agent. Include what they were trying to do, what the skill produced, and what was missing or incorrect.

## Attribution

Synthesized from "Developer Marketing Does Not Exist" (DX journey, first impression/experience/success, share knowledge not features, elements of great DX, sample apps for first success) and "Technical Content Strategy Decoded" (translator, content has a job, Technical Engagement System, start with technical problems, DIY instinct, numbers that matter, search solutions not products) plus the user's MD note synthesis on the 3 content patterns (Sample Applications / Code Snippets/Recipes / Solution Patterns). See `references/attribution.md` and the three dx references for detailed provenance. Not a verbatim reproduction; principles, tables, and checklists have been made actionable for agent use in the devex-kit format.

This skill was authored via writing-skills TDD (RED pressure baselines with subagent dispatches, GREEN minimal content fixing observed failures, REFACTOR with explicit counters, rationalization table, and re-tests).
