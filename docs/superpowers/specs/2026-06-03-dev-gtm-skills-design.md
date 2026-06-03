# Dev GTM Skills Design

**Date:** 2026-06-03  
**Status:** Design complete; awaiting user review of this spec before writing-plans.

> **For agentic workers:** This design was produced via the superpowers brainstorming process. All sections received incremental user approval. The implementation will use writing-skills TDD (with subagent-driven-development for baselines) to author the SKILL.md content while strictly following devex-kit structural patterns from agent-plugin-development.

## Goal
Distill the three research PDFs downloaded to ~/Downloads (The Developer-Facing Startup Alchemist GTM playbook, Developer Marketing Does Not Exist, Technical Content Strategy Decoded) plus the user's MD note on content taxonomy into two high-quality, agent-usable skills in the devex-kit repo. The skills must support both review/audit and plan/generate workflows (user requirement "C") and live under a new `dev-gtm` category.

## Background / Context
- Downloaded files (last 5 min):
  - `i-am-using-this-to-describe-my-....md`: Perplexity synthesis recommending problem-focused naming: Sample Applications (end-to-end demos), Code Snippets/Recipes (focused examples), Solution Patterns (comparative scripts). Directly cites the three PDFs.
  - 243-page Alchemist GTM playbook: TAB building, story with villain + 3 parts + evidence, 12 most common story mistakes, presence/advocacy, packaging/pricing for devs ("magic should be free", value metric = eliminate wasted time).
  - 140-page "Developer Marketing Does Not Exist": DX journey (first impression, onboarding, first success via sample apps, ref/support), "share knowledge not features".
  - 139-page "Technical Content Strategy Decoded": Translator role, content has a job, Technical Engagement System, start with technical problems, metrics, DIY instinct.

These are coherent expert material (Adam Duvander) on authentic dev-facing GTM and content strategy. Perfect raw input for devex-kit skills.

Repo context explored (per brainstorming):
- Existing categories: `documentation/` (docs workflows) and `tooling/` (artifacts like SDKs/CLIs/MCP).
- Strict devex-kit conventions (from `agent-plugin-development/references/skill-development.md` and examples like `authoring-cookbooks`, `sdk-craft`): lean SKILL.md with devex-kit frontmatter (license + metadata), imperative voice, phase/mode tables, `> load references/...` for heavy content, phase gates, quality checklists with [ ], "Did this help?" + GitHub link, adaptation via _templates, integration graphs, tile.json, README updates.
- writing-skills + test-driven-development + testing-skills-with-subagents loaded (user directive): skills must be developed via RED-GREEN-REFACTOR with subagent pressure tests (3+ combined pressures, verbatim rationalizations captured, minimal content that fixes observed failures).

User explicitly chose Approach 2 (two focused skills) over a single consolidated skill and specified use of `/writing-skills` to author them.

## Chosen Architecture
**New category:** `skills/dev-gtm/` (short "dev-gtm" per user; title-cased "Dev GTM" in README for parallelism with "Documentation" and "Tooling").

**Two skills:**
1. `devrel-story-craft` — Story, TAB, presence, packaging/pricing (primarily Alchemist playbook).
2. `devrel-dx-craft` — DX journey, first success, content taxonomy (Sample Apps / Recipes / Solution Patterns from user's MD note), content jobs/strategy (primarily the other two PDFs).

**Why two skills (Approach 2):**
- Targeted invocation and smaller context.
- Clean mapping to source material while still cross-referencing.
- Avoids bloat of one 5-area skill.
- Both still deliver "both review + generate" via explicit areas + modes (user C).

**Why dev-gtm category (not documentation/):**
- Material is foundational GTM/adoption strategy for dev-facing products, not docs production mechanics.
- documentation/ stays focused on contribution routing, writing style, cookbook quality.
- New category gives the research a natural home and room to grow (future GTM skills).

**How "C" (both review/audit + plan/generate) is delivered:**
- Users declare area + intent at session start (e.g. "review mode: story" or "plan first-success taxonomy for X").
- Phase/mode tables in each SKILL.md (modeled on sdk-craft + docs-writing-style).
- Detailed guidance lives in references/ (progressive disclosure).

## Skill 1: devrel-story-craft
**Directory:** `skills/dev-gtm/devrel-story-craft/`

**Frontmatter (exact devex-kit shape):**
```yaml
---
name: devrel-story-craft
description: |
  Design authentic stories, recruit and run Technical Advisory Boards (TAB), avoid the 12 most common story mistakes, build dev influencer presence, and define dev-friendly packaging, pricing, and feedback loops for early-stage developer-facing products and startups. Use when working on GTM positioning, launch narratives, TAB outreach, presence strategy, or packaging for devs. Also activates for mentions of "story", "TAB", "12 most common story mistakes", "villain", "sell the category", "authenticity", "presence", "packaging", "pricing for devs", or "dev gtm".
license: MIT
metadata:
  author: saif-shines
  version: "1.0"
  type: assistive
  mode: lifecycle
---
```

**Phase / Mode Table (in SKILL.md body):**
| Area                  | Review / Audit                                      | Plan / Generate                                      |
|-----------------------|-----------------------------------------------------|------------------------------------------------------|
| Story Building        | Audit draft for 12 mistakes, villain rule, evidence | Build story canvas, generate TAB questions, rewrite  |
| TAB                   | Review recruitment plan or call synthesis           | Plan outreach, draft messages + 3 questions          |
| Presence & Advocacy   | Audit posts for authenticity / social proof gaps    | Plan calendar, generate signature conversations      |
| Packaging & Pricing   | Review against "magic free" + value metric rules    | Define value metric, design free tier + upsell       |

**References/ (synthesized, actionable):**
- `story-framework.md`: 3 parts, villain, evidence rules, sell category, paint future vs. demo.
- `tab-playbook.md`: Recruitment principles, 3 questions, call structure, synthesis, creating customers from TABs.
- `presence-advocacy.md`: Authenticity, showing up 80%, end contentless content, 3 steps advocacy, social proof, haters as partners.
- `packaging-pricing.md`: Magic free first, value metric (eliminate wasted time), win-win pricing, transparency, hosted as new open source.

**Key quality bar (from PDFs):** Every story must have a villain, back claims with evidence, sell the category, and be validated via TAB before scaling presence.

## Skill 2: devrel-dx-craft
**Directory:** `skills/dev-gtm/devrel-dx-craft/`

**Frontmatter (exact devex-kit shape):**
```yaml
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
```

**Phase / Mode Table (in SKILL.md body):**
| Area                          | Review / Audit                                      | Plan / Generate                                      |
|-------------------------------|-----------------------------------------------------|------------------------------------------------------|
| DX Journey & First Success    | Audit getting-started for first-success gaps        | Map DX journey, design first-success path            |
| Content Taxonomy              | Audit against 3 patterns (Sample Apps / Recipes / Patterns) | Decide taxonomy using decision table from MD note    |
| Content Jobs & Strategy       | Audit for "features not knowledge", unclear jobs    | Map content to jobs, generate plans via Engagement System |

**References/ (synthesized, actionable):**
- `dx-journey.md`: First impression, onboarding mistakes, first success (use cases + sample apps), ref/support, elements of great DX.
- `content-taxonomy.md`: **Primary home for user's MD note table** (End-to-End Demos → Sample Applications with full runnable + tutorial; Feature Examples → Code Snippets/Recipes in tutorials; Comparative → Solution Patterns for pros/cons). Expanded with decision criteria and examples from the books.
- `content-jobs.md`: Share knowledge not features, translator role, start with technical problems, content has a job, Technical Engagement System, numbers that matter, DIY instinct.

**Key quality bar (from PDFs + MD note):** Content must solve a real technical problem for the developer; taxonomy choice must be intentional and documented; first success must be reachable without leaving the experience.

## Integration Graph (shared)
**Inbound:**
- From `docs-writing-style`, `authoring-cookbooks`: Quality or style issues often stem from upstream weak story or unclear first-success taxonomy.
- From `devrel-tooling`: CLI or collection generation needed to support a planned DX first-success path.

**Outbound:**
- To `docs-writing-style` (handoff mode): After taxonomy/DX decisions, hand off actual writing.
- To `authoring-cookbooks`: When content plan reveals recipe quality problems.
- To `journey-sidebar-labels`: When DX journey affects navigation labels.

**Complementary skills section** (in both SKILL.md bodies):
- `devrel-story-craft` and `devrel-dx-craft` cross-reference each other (weak story undermines first success).
- Both complement the documentation/ skills (strategy layer → execution layer) and `devrel-tooling` (plan DX → ship supporting tools).

## Packaging & Distribution
- Per-skill `tile.json` (exact shape used by `devrel-tooling`, `sdk-craft`, etc.):
  ```json
  {
    "name": "saif-shines/devrel-story-craft",
    "version": "1.0.0",
    "summary": "Design authentic stories, TABs, presence, and dev-friendly packaging for early-stage developer-facing startups (from Alchemist GTM playbook).",
    "skills": {
      "devrel-story-craft": { "path": "SKILL.md" }
    }
  }
  ```
  (Analogous file for devrel-dx-craft with focus on DX + taxonomy.)
- Root README updates:
  - New `### Dev GTM` section after Tooling with short intros for both skills.
  - Add `/devrel-story-craft` and `/devrel-dx-craft` to the top "invoke any skill" list.
  - Detailed usage examples in the "Use the skills" part (one review, one plan/generate per skill).
- Installable via existing `npx skills` and `tessl` mechanisms (no change to root `tessl.json`).

## Quality Checklist & Phase Gates (devex-kit required)
**Phase gates (before moving between areas):**
- Story → Presence: Story has been TAB-validated and sells the category.
- DX Journey → Content Taxonomy: First-success path defined before choosing Sample App vs Recipe vs Pattern.
- Both skills: Cross-reference to the sibling dev-gtm skill and to documentation/ skills.

**Quality checklist (before release):**
- [ ] Frontmatter matches exact devex-kit shape (license + metadata, third-person description with real trigger phrases).
- [ ] Phase/mode tables present and support both review + generate.
- [ ] All heavy content externalized to references/ with load blockquotes.
- [ ] Taxonomy decision table in devrel-dx-craft exactly matches user's MD note synthesis + book guidance.
- [ ] 12 mistakes, TAB 3 questions, "magic free", "content has a job", etc. are synthesized actionable checklists/fixes (not pasted book text).
- [ ] Integration graph + "When to switch skills" + "Did this help?" present.
- [ ] Scalekit-specific notes + `_template-*` files present where source PDFs support it (especially dx-craft).
- [ ] writing-skills TDD baselines passed (see below); agents comply under pressure.
- [ ] No duplication with existing skills; clear complementary links.
- [ ] tile.json + README updates complete; tested via `tessl` / local plugin load if possible.
- [ ] Attribution in `references/attribution.md`.

## Authoring Process (writing-skills TDD — user directive)
The structural skeleton follows devex-kit conventions. The **content** (checklists, decision tables, examples, "why this matters") will be developed via full writing-skills RED-GREEN-REFACTOR:

**RED (baseline):**
- Create 3–4 pressure scenarios per skill with combined pressures (time + sunk cost + authority + exhaustion).
- Example for story-craft: "It is 6pm. You spent 4 hours on a launch story for the new connectors feature. Manager wants it shipped tonight for review tomorrow. You have the Alchemist PDF open. Help me write the story."
- Example for dx-craft: "Design first-success content types + DX path for the auth accelerator. Choose between Sample Application, Recipe, or Solution Pattern and justify."
- Run with fresh subagent (via `subagent-driven-development` or Task tool) **without** the new skill loaded.
- Capture exact outputs + rationalizations verbatim (e.g. "puffery is fine for launch", "quick prototype is first success", "just list the features").

**GREEN:**
- Write the minimal SKILL.md + references content that would have prevented exactly the observed failures.
- Re-run same scenarios **with** the skill loaded. Verify compliance.

**REFACTOR:**
- Identify new rationalizations.
- Add explicit counters, red flags lists, update description for CSO.
- Re-test until bulletproof (agent chooses correct path, cites skill sections, acknowledges temptation but complies).
- Use TodoWrite for every item on the writing-skills checklist for *each* skill.

**Verification methodology:** Follow `testing-skills-with-subagents.md` exactly. 3+ pressures per scenario. Meta-test ("how could the skill have been clearer?").

This ensures the skills are not just summaries of the PDFs but actually change agent behavior on the exact problems the research addresses.

## Scope & Risks
- **In:** Synthesized principles, checklists, decision tables, templates, good/bad examples, "when to use" guidance. Direct support for user's MD note taxonomy use case.
- **Out:** Full book text (copyright), project-specific advice, one-off narratives.
- Risk: Long source PDFs (243p+) — mitigated by focusing on the TOC-derived high-signal lists (12 mistakes, 3 questions, DX elements, jobs framework) + user's existing synthesis.
- Risk: Category fragmentation — mitigated by clear cross-links and README grouping.

## Success Criteria
- An agent given a realistic dev-gtm task (story writing, DX planning, taxonomy decision) under pressure will produce outputs that follow the synthesized rules from the research.
- Both skills support natural "review this..." and "help me plan..." invocations.
- Skills install and are invocable via existing devex-kit mechanisms.
- Content was developed via documented writing-skills TDD (baselines + iterations recorded).

## Next Steps (after user approval of this spec)
1. Spec self-review (this doc).
2. User reviews this written spec.
3. Invoke `writing-plans` to produce detailed implementation plan (bite-sized tasks with exact files, TDD scenario definitions, subagent dispatch commands, commit steps, etc.).
4. Execute the plan (using subagent-driven-development or executing-plans as chosen).
5. Final verification: re-run pressure scenarios with final skills; update this design doc if needed.

## Design Self-Review (pre-user review)
- No "TBD", "TODO", or placeholders.
- Consistent terminology (dev-gtm, devrel-story-craft, etc.).
- Scope is focused (two skills, specific PDFs + MD note).
- All user choices (Approach 2, dev-gtm, writing-skills authoring, C both modes) incorporated.
- Integrates cleanly with existing devex-kit patterns and the loaded superpowers skills.
- Ready for user review.

---

**Spec written by Grok following superpowers:brainstorming + user's explicit directives.**
