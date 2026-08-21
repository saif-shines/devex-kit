---
name: create-skill
description: |
  Create new skills and iteratively improve existing ones using devex-kit conventions. Use when users want to create a skill from scratch, turn a workflow into a SKILL.md, write or edit a skill, improve skill triggering/description, package a skill for distribution, or follow the lean + references + progressive disclosure model. Also activates for questions about skill anatomy, frontmatter quality, imperative writing style, test cases for skills, or when the user says "create a skill", "write SKILL.md", "improve this skill", "package my skill".
license: MIT
metadata:
  author: saif-shines
  version: "1.0"
  type: assistive
  mode: lifecycle
---

# Create Skill

Author effective, lean skills that extend agents with specialized workflows, following the exact devex-kit patterns used by every skill in this kit.

This skill is the general entry point for skill creation and improvement. For plugin-specific restructure, the 5 principles, agents, empty commands/, and examples/ layout, also load `agent-plugin-development`.

State the phase or paste the request. The skill will route and keep you on the rails.

## Phases

| Phase | What you do | Key question |
|-------|-------------|-------------|
| **Capture** | Intent, interview, research | What exactly should trigger this and what must the output look like? |
| **Draft** | Write lean SKILL.md + plan references | Is the body under control and delegating to references/? |
| **Test & Iterate** | Cases, runs, review, improve (when valuable) | Does real usage + feedback show the skill is reliable and general? |
| **Optimize** | Description tuning for triggering | Will the description make the agent load it at the right moments? |
| **Package** | Validate, tile, docs, lock, ship | Can another dev (or agent) install and use it cleanly? |

## Capture
Start from conversation history when the user says "turn this into a skill".

Ask (one at a time, regular questions):
1. What should this skill enable the agent to do?
2. When should it trigger? (collect exact phrases the user will type)
3. Expected output shape and success criteria?
4. Are objective test cases worth it? (file transforms, extraction, fixed steps → yes; pure style/art → often no)

Surface edge cases, example inputs/outputs, and dependencies early. Research in parallel via MCPs or subagents when useful.

> For the full capture + interview checklist and how to turn answers into frontmatter + body, load `references/create-skill-methodology.md`.

## Draft the Skill
Follow devex-kit conventions exactly (see also `agent-plugin-development` and its `references/skill-development.md`).

**Frontmatter template:**
```yaml
---
name: your-skill-name
description: |
  Third-person sentence(s). List the exact trigger phrases.
  "Use when the user asks to 'foo', 'bar the baz', or mentions 'widget'."
license: MIT
metadata:
  author: saif-shines
  version: "1.0"
  type: assistive
  mode: lifecycle
---
```

**Body requirements (lean target 1,500-2,000 words):**
- Phase table at the top.
- Imperative voice ("Load...", "Validate...", "Write...").
- `> For expanded X, load `references/yyy.md`` for anything heavy.
- Phase gates before transitions.
- Quality checklist with actionable boxes.
- "Did this help?" section with the github issues link.
- Explicit cross-references to sibling skills when relevant.

**Progressive disclosure (non-negotiable):**
- Keep SKILL.md body small.
- Move long tables, exhaustive lists, full examples, schemas, platform variants, and anti-patterns into `references/`.
- Always tell the model where the extra material lives.

**Writing style rules:**
- Imperative/infinitive form, not second person.
- Explain *why* a rule exists instead of shouting MUST.
- Include small, realistic input → output examples.
- Reference every supporting file so the model discovers it.

> Full details on anatomy, progressive disclosure, name/description quality, writing patterns, and the "Principle of Lack of Surprise" live in `references/create-skill-methodology.md`.

## Test & Iterate (when it adds value)
For skills with verifiable outputs, create a few realistic test prompts, save them, run with-skill + baseline subagents in parallel, review results with the user (qual + quant), improve, repeat.

Organize work in sibling workspace directories. Capture timing from notifications. Grade, aggregate, show the user (viewer or static HTML).

See the upstream full skill-creator (now also mirrored in your `~/Downloads/SKILL.md`) for the complete harness, `eval-viewer/generate_review.py`, assertion drafting, blind comparison, and environment-specific notes (Claude.ai, Cowork, etc.).

For subjective skills, lean on direct user review of outputs instead of heavy assertions.

Keep going until the user is happy, all feedback is empty/positive, or further changes yield no value.

## Optimize Description
After the skill body is solid, offer to tune the frontmatter description for better auto-triggering.

- Generate 15-20 realistic eval queries (good coverage of should-trigger + tricky near-miss should-not-trigger cases).
- Let the user review/edit via a simple HTML form that exports to `~/Downloads/eval_set.json`.
- Run the optimization loop (splits train/held-out, iterates, picks best by test score).
- Apply the winner and show the delta.

Triggering reality: simple one-step tasks often bypass skills. Target the complex, multi-step, high-context, or specialized work the user actually repeats.

Full mechanics and example queries are in `references/create-skill-methodology.md` (and the complete upstream in `~/Downloads/SKILL.md`).

## Package & Ship
- Run validation (frontmatter, structure, description quality, referenced files exist).
- Produce the `.skill` (or just commit for this kit).
- Write an unfinished kit skill in `in-progress/<name>/`. Do not put drafts under a plugin `skills/` folder.
- For a shipped kit skill: move it to `plugins/<plugin>/skills/<name>/` under documentation, tooling, or dev-gtm. That is the only live tree.
- Load the root contracts (`CLAUDE.md` / `AGENTS.md`) and complete the promotion checklist before calling the skill shipped.
- Do not add skills under `.agents/` or any other second tree.

When updating an already-installed skill later, copy to a writable location first.

> Packaging commands live in `references/create-skill-methodology.md`. The promotion checklist lives in the root contracts.

## Phase Gates
**Capture → Draft:** Clear triggers collected? Success criteria stated? Test-cases decision made with the user?

**Draft → Test/Iterate:** SKILL.md uses exact devex frontmatter? Body is imperative, <~2000 words, delegates via load references? Quality checklist present?

**Test/Iterate → Optimize:** User has reviewed real outputs and is happy (or has given specific feedback that is now addressed)?

**Optimize → Package:** Description updated with the optimized version? Scores shown to user?

**Package:** skill is under `plugins/<plugin>/skills/<name>/`? Root-contract promotion checklist complete?

## Quality Checklist
- [ ] Frontmatter has `name`, third-person `description` with concrete triggers, `license: MIT`, and the standard metadata block.
- [ ] Body opens with a phase table and uses imperative voice.
- [ ] Long content is in `references/` and referenced with the exact `> For ... load `references/...`` blockquote.
- [ ] SKILL.md body is lean; progressive disclosure is obvious.
- [ ] Phase gates and a quality checklist (with boxes) are present.
- [ ] Ends with "Did this help?" + link to https://github.com/saif-shines/devex-kit/issues.
- [ ] Cross-references `agent-plugin-development` for plugin restructure work.
- [ ] `tile.json` exists and follows the canonical shape.
- [ ] The skill directory is `plugins/<plugin>/skills/<name>/`.
- [ ] The root-contract promotion checklist is complete.

## Did this help?
At the end of every session, ask: **"Did this solve what you were trying to do?"**

- If yes: done.
- If the structure, examples, or cross-links were incomplete, a reference was stale, or the output led to a skill that felt bloated or hard to trigger: encourage the user to file an issue at **https://github.com/saif-shines/devex-kit/issues**. Offer to help draft it: include what they were building, which phase, what this skill produced, and what felt missing or incorrect.

## When to Switch Skills
- You are inside a plugin and the task is about the 5 restructure principles, agents, empty commands/, or plugin.json → `agent-plugin-development`.
- You need the full eval harness, subagent grading, benchmark viewer, or the packaged `run_loop.py` optimizer right now → invoke the installed `/skill-creator` (or load the copy from `~/Downloads/SKILL.md`).
- You are doing non-skill work (SDK, docs, CLI, MCP, stories, DX) → `ask-devex` first, then the target skill.

## Relation to the Upstream Skill-Creator
This skill distills the methodology into devex-kit form and keeps the orchestrator lean. The complete version (with every script, agent, viewer, and platform note) is the one you just replaced into `~/Downloads/SKILL.md` (and the installed `/skill-creator`). Use either: start here for anything that should follow the style of this kit.

State the phase or describe the skill you are building. Load the references when told. Ship a good one.
