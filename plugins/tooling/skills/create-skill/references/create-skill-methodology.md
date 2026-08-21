# Skill Creation Methodology (Distilled)

Core loop for authoring effective skills (general or plugin-specific). This is the engine behind `/create-skill`. For plugin restructure + the 5 principles, also load the agent-plugin-development skill.

## Core Loop (always)
1. Capture intent from conversation + interview the user.
2. Draft or edit the SKILL.md (lean body + references).
3. (When valuable) Define test cases and run them (with-skill vs baseline).
4. Review results with the user (qualitative + any quantitative).
5. Improve based on feedback; repeat.
6. (After happy) Optimize the description for reliable triggering.
7. Package and hand off.

Stop iterating when the user is happy, feedback is empty, or no meaningful progress.

## Capture Intent
Extract from history first (tools used, steps, formats, corrections).

Ask (one at a time):
- What should the skill enable the agent to do?
- When should it trigger? (exact user phrases)
- Expected output format / success criteria?
- Test cases needed? (objective outputs yes; subjective writing/art often no)

Proactively surface edge cases, example files, dependencies. Research via MCPs or subagents in parallel when helpful.

## Write / Edit the SKILL.md
Follow devex-kit conventions (see agent-plugin-development + its references/skill-development.md for the full 5-principles and frontmatter rules).

**Frontmatter (required):**
```yaml
---
name: your-skill-name
description: |
  Third-person. List concrete trigger phrases users will type.
  "Use when ... or mentions 'keyword1', 'keyword2'."
license: MIT
metadata:
  author: saif-shines
  version: "1.0"
  type: assistive   # or router, diagnostic, etc.
  mode: lifecycle   # or directive, handoff+review, etc.
---
```

**Body shape (lean, ~1500-2000 words ideal):**
- Opening phase/mode table.
- Imperative voice throughout.
- `> For expanded ... load `references/xxx.md`` for anything long.
- Phase gates + quality checklist.
- "Did this help?" + github issue link at the end.

**Progressive disclosure (critical):**
- Metadata (name+desc) always loaded.
- SKILL.md body when triggered (<500 lines ideal).
- references/, examples/, scripts/ loaded on demand.

Move exhaustive tables, long checklists, full code samples, schemas, anti-patterns, and platform variants into references/.

**Writing rules:**
- Imperative / infinitive ("To X, do Y", "Validate...", "Load...").
- No second person ("You should...").
- Explain the *why* behind rules instead of ALL CAPS MUSTs.
- Include realistic examples (input → output) when they clarify.
- Reference supporting files explicitly so the model knows they exist.

**Name & description quality:**
- name: lowercase letters, digits, hyphens; 2-64 chars.
- description: third person; include the exact phrases that should auto-trigger the skill; be a little "pushy" to combat under-triggering.

## Testing & Iteration (when objective outputs or high stakes)
- Put runs in `<skill-name>-workspace/iteration-N/eval-M/{with_skill,old_skill,without_skill}/`.
- Spawn with-skill + baseline subagents together in one turn.
- While running, draft assertions (objective, verifiable, descriptive names).
- On completion: grade (grader agent or script), aggregate, launch viewer (or static HTML in Cowork/headless).
- Read user feedback.json; improve; repeat.

For subjective skills, favor qualitative review over heavy assertions.

See the full upstream skill-creator (your local `~/Downloads/SKILL.md` after the replacement step, or the installed `/skill-creator`) for the detailed eval harness, timing capture, viewer invocation, blind-comparison agents, and Cowork/Claude.ai/Cowork adaptation notes.

## Description Optimization (after the skill is good)
Offer this step. It improves auto-triggering.

- Generate 15-20 realistic eval queries (mix should-trigger / should-not-trigger). Real user phrasing, file names, context, edge cases. Near-misses are gold.
- Use the HTML review template (see upstream `assets/eval_review.html` or re-implement a simple version) so the user can edit/toggle and export `~/Downloads/eval_set.json`.
- Run the optimization loop (upstream `scripts/run_loop.py` or equivalent). It trains on 60%, holds out 40%, iterates descriptions, returns best_description by test score.
- Apply the winner to the frontmatter; show before/after + scores.

Triggering note: simple one-step tasks often bypass skills even with perfect descriptions (the model can just do them). Target multi-step, specialized, or high-context work in your queries.

## Packaging & Distribution
- Validate first (frontmatter, structure, naming, references exist, description quality).
- `python -m scripts.package_skill <path-to-skill-dir>` (or the upstream package_skill.py) produces a `.skill` zip.
- For kit skills: write drafts in `in-progress/<name>/`. Promote to `plugins/<plugin>/skills/<name>/`. Do not add a second tree. Follow the promotion checklist in the root contracts (`CLAUDE.md` / `AGENTS.md`).

For updating an installed skill later: copy to /tmp first (installed locations can be read-only), edit the copy, re-package.

## When to Use the Full Upstream Skill-Creator vs This
- Use **this create-skill** (devex-kit) for: learning the devex-kit conventions, writing your first devex skill, keeping SKILL.md lean, following the 5 principles, routing through ask-devex.
- Use the **full /skill-creator** (or the copy now in your ~/Downloads) when you need the complete eval harness, subagent grading, benchmark viewer, description optimizer scripts, blind A/B, or the heavy iteration loop with quantitative variance.

Both are valuable. Start here for anything that will live in (or follow the style of) devex-kit.
