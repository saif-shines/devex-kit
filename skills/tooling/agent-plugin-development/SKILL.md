---
name: agent-plugin-development
description: |
  Design, build, restructure, and ship Claude Code plugins using the modern skills-first + agents + externalized references model. Use this skill when creating a new plugin, writing or refactoring skills, building spawnable agents, externalizing reference material into references/ or docs/, de-emphasizing commands, or asking about "plugin development", "create skill", "write agent", "restructure plugin", "SKILL.md best practices", "references/ in plugins", "agent orchestration", "pr-review-toolkit", "docs-engineering plugin", or the 5 restructure principles. Also activates for questions about lean SKILL.md, progressive disclosure, scalekit-code-doctor pattern, plugin.json, tile.json, or packaging for devex-kit and marketplaces.
license: MIT
metadata:
  author: saif-shines
  version: "1.0"
  type: assistive
  mode: lifecycle
---
# Agent Plugin Development

Build Claude Code plugins the modern way: skills as the primary orchestration layer, agents only for high-agency specialists, reference material aggressively externalized, and commands reduced to structural compatibility shims. This is the post-restructure model proven in devex-kit and the authstack consolidation.

This skill covers the full lifecycle of creating or refactoring effective plugins:

| Phase | What you do | Key question |
|-------|-------------|-------------|
| **Model** | Classify work as skill orchestration, agent specialist, or pure reference data | Does this belong in a lean SKILL.md, a spawnable agent, or a references/ file? |
| **Craft** | Write lean SKILL.md using devex-kit patterns + extract to references/ | Does the main file stay focused and delegate via load calls? |
| **Specialize** | Design and implement focused agents with rich example blocks | Is this truly narrow, high-agency, and self-contained enough to spawn independently? |
| **Structure** | Lay out the plugin with skills/ primary and intentionally empty commands/agents/ where appropriate | Does the tree signal the 5 principles at a glance? |
| **Package** | Add README, plugin.json, tile.json (if devex), examples, validation | Can another developer (or agent) land here and immediately understand the architecture? |

State the phase you are in, or describe the plugin or skill you are building — the skill routes accordingly.

---

## The 5 Restructure Principles

These five points define current best practice. Every decision in this skill and every plugin you build with it must honor them.

> For the full expanded explanation with authstack before/after, migration tactics, and anti-patterns, load `references/restructure-best-practices.md`.

1. Commands de-emphasized (exist structurally but empty/unused in restructured plugins).
2. Skills are the primary orchestration layer (lean SKILL.md + heavy refs in references/ or siblings).
3. Agents remain for high-agency specialists (spawnable focused workers, reasonably self-contained).
4. Reference material aggressively externalized (references/, docs/, rules/, AUDIT-CHECKLIST.md etc.).
5. scalekit-code-doctor is the model (short SKILL.md + orchestration, massive data in references/).

Internalize these before you write a single line of a new SKILL.md or agent.

---

## Plugin Structure (Modern Skills-First)

Follow the layout used by restructured authstack plugins and the clean docs-engineering example.

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json
├── skills/                 # The only place new logic belongs
│   └── core-skill/
│       ├── SKILL.md        # Lean, imperative, load references
│       ├── references/     # Or sibling .md files (AUDIT-CHECKLIST.md, *-reference.md)
│       └── examples/
├── agents/                 # 0–6 or intentionally empty
├── commands/               # Present but empty or .deleted shims only
├── docs/                   # Canonical durable content (link from skills with ../../)
├── references/             # Plugin-wide shared refs (optional)
├── rules/                  # Cross-cutting (optional)
├── README.md
└── tile.json               # When shipping via devex-kit
```

> For the complete tree, plugin.json example, legacy-vs-restructured comparison table, and rules about empty dirs, load `references/plugin-structure.md`.

Empty `commands/` and `agents/` directories are correct and intentional. They satisfy Claude Code layout expectations while signaling that logic lives in skills/.

---

## Skill Development

Skills are the entry point users invoke (`/agent-plugin-development`, `/sdk-craft`, etc.). They must be lean, imperative, and delegate.

Follow these devex-kit conventions exactly:

- Extended frontmatter with `license: MIT` and `metadata` block.
- Description written in third person listing concrete trigger phrases.
- Opening phase/mode table.
- Imperative voice throughout ("State the phase. Load the reference. Produce the table.").
- `> For expanded ... load `references/xxx.md`` blockquotes for every heavy section.
- Phase gates before transitions.
- Quality checklist with actionable checkboxes.
- "Did this help?" feedback section with the github issues link.
- "When to switch skills" guidance.

> For the exact frontmatter template, description best practices, full body organization, subagent handoff rules, common mistakes, and a ready-to-copy skeleton, load `references/skill-development.md`.

The target length for the SKILL.md body itself is 1,500–2,000 words. Everything beyond that lives in references/.

---

## Agent Development

Agents are for narrow, high-agency, spawnable specialists. They are not the default.

Use the pr-review-toolkit pattern as the canonical illustration: a skill (or thin shim) classifies the request, then spawns only the relevant subset of agents (code-reviewer, silent-failure-hunter, etc.) via the Task tool. The old approach of one giant command is deprecated.

Agent files live under `agents/` (preferred) or inside a skill. Each must have:

- Rich `description` containing 2–4 concrete `<example>` blocks (Context / user / assistant / commentary).
- Appropriate `model` (sonnet or opus).
- Minimal `tools` list.
- Distinct `color`.

> For the complete agent frontmatter shape, when-to-use criteria, orchestration-from-skill guidance, model/tool advice, color assignments, and checklist, load `references/agent-development.md`.

Many excellent plugins have zero agents (see docs-engineering). Add agents only when the work genuinely benefits from isolation and focused context.

---

## Common Workflows

### Starting a brand new plugin from scratch
1. Create the directory skeleton with `skills/`, empty `commands/`, empty `agents/`, `docs/`, `references/`, `rules/` as appropriate.
2. Write the first lean SKILL.md using the skeleton from `references/skill-development.md`. Frontmatter first.
3. Extract the first large decision table or checklist into a sibling or references/ file and replace with a load call.
4. Populate a minimal README that names the 5 principles and points to the skill.
5. Add `tile.json` if this skill will live in devex-kit.
6. Test immediately: place it in a test Claude Code project and invoke `/your-skill-name`.

### Refactoring an existing command-heavy plugin (pr-review-toolkit style)
1. Identify the command that contains real workflow logic.
2. Rename it to `commands/review-foo.deleted.md` (keep for history and compat).
3. Create `skills/review-foo/SKILL.md` that performs the classification and orchestration.
4. Promote each distinct concern inside the old command into its own agent under `agents/`.
5. Give every agent a rich description with 3+ `<example>` blocks drawn from the scenarios the old command handled.
6. Update README and any marketplace entries. Remove duplication.
7. Verify: the user can still say the old command name (via shim if needed) but the implementation now follows the 5 principles.

### Adding a specialist agent to an existing skill
1. Write the agent .md first with narrow charter and examples.
2. In the skill, add a decision block: "If the task matches X, spawn the Y-agent using Task with focused diff or file list."
3. Tell the user explicitly what you are spawning and why.
4. After the agent returns, integrate its findings into the skill's final output (dedupe, prioritize, format consistently).
5. Document the handoff contract in the skill's "When to spawn agents" subsection.

### Externalizing content from a bloated SKILL.md (scalekit-code-doctor style)
1. Identify the largest sections (method tables, 50-item checklists, full code samples for 6 languages).
2. Create `references/REFERENCE.md` or `references/COMMON-MISTAKES.md` (or equivalent) and move the data.
3. At the top of the skill body, after frontmatter and intro, insert the mandatory "Before doing anything else, load the references..." instruction.
4. Replace the inline content with a short summary + load blockquote.
5. The skill now stays small; the references can be consumed by other tools.

> For more migration and externalization patterns drawn from the actual authstack restructure, load `references/restructure-best-practices.md`.

---

## Packaging and Distribution

A plugin is not complete until it is self-documenting for both humans and future agents.

Required artifacts:

- `README.md` at plugin root that explains the canonical content layer (`docs/`, `skills/`, `rules/`) vs the Claude adapters (`commands/`, `agents/`, `hooks/`), states the 5 principles, and gives real invocation examples.
- `tile.json` (exact shape used by every skill in this devex-kit) when the skill is part of devex-kit.
- At least one skill with `examples/` demonstrating good usage.
- Cross-links that use the load-references pattern or relative paths into `docs/`.

> For the two primary study examples (pr-review-toolkit as agents+skill instead of command; docs-engineering as skills+refs+examples), the full authstack restructure trees, the packaging checklist, and instructions for adding a skill to this devex-kit, load `references/examples-and-packaging.md`.

## Phase Gates

**Model → Craft:** Have you classified every piece of functionality using the 5 principles? Is the primary deliverable a lean skill rather than a command or a monolithic agent?

**Craft → Specialize:** SKILL.md written and already delegating via load references calls? Heavy data extracted before the main file grew too large?

**Specialize → Structure:** Any agents have rich descriptions with concrete `<example>` blocks? Are they narrow enough that a one-sentence handoff produces reliable output? Commands/ and agents/ dirs intentionally minimal?

**Structure → Package:** Plugin root has README explaining the layers and the 5 principles? `examples/` and `references/` populated? Empty dirs documented as intentional? Tile.json present if this is a devex-kit skill?

## Quality Checklist

Before declaring the plugin or skill complete:

- [ ] Commands/ dir exists and is empty or contains only .deleted shims (no logic)
- [ ] Agents/ dir exists and is empty or contains only 0–6 focused specialists with rich example blocks in their descriptions
- [ ] Every SKILL.md uses the exact devex-kit frontmatter (license + metadata block)
- [ ] SKILL.md body is imperative, uses tables for decisions, contains phase gates + quality checklist, ends with "Did this help?", and delegates via `> For expanded ... load `references/...`` 
- [ ] All long tables, exhaustive checklists, framework samples, anti-patterns, and reference data live in references/ or sibling .md files (scalekit-code-doctor pattern)
- [ ] At least one skill demonstrates the examples/ sibling pattern
- [ ] Plugin README documents the 5 principles and canonical vs adapter layers
- [ ] Cross-references to pr-review-toolkit (agents + orchestration) and docs-engineering (skills + refs + examples) appear in the content
- [ ] The plugin was tested by actually invoking the skill and any agents inside real Claude Code
- [ ] No duplication of concerns already covered by existing devex-kit skills (sdk-craft, mcp-server-craft, docs-writing-style, etc.)

## Did this help?

At the end of every session, ask: **"Did this solve what you were trying to do?"**

- If yes: done.
- If the structure advice was incomplete, a reference was missing or stale, an example did not match current best practice, or the output led to a plugin that felt bloated: encourage the user to file an issue at **https://github.com/saif-shines/devex-kit/issues**. Offer to help draft it using their agent — include: what they were building, which phase they were in, what this skill produced, and what was missing or incorrect.

---

## Adapt and Evolve

This skill itself follows the model it teaches. The authoritative patterns live in the `references/` directory and in the live restructured plugins (authstack, skillkit examples). When official Claude Code plugin guidance or devex-kit conventions change, update the references first, then the orchestration in this SKILL.md.

When you create a new plugin using this skill, you are also contributing to the living catalog of good examples. Add it to the references when it demonstrates a new successful variation.

State the phase or the concrete task. Load the relevant reference. Build correctly.
