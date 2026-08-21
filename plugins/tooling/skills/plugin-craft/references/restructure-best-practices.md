# Restructure Best Practices and the 5 Confirmed Principles

Expanded guidance on the post-2026 Claude Code plugin model. Read this when planning a new plugin, refactoring an existing one, or deciding where logic belongs.

This document codifies the lessons from the authstack consolidation (5 plugins → 2) and the move of pr-review-toolkit style workflows from commands to skills+agents.

## The 5 Points Confirmed

These are non-negotiable for skills and plugins in the devex-kit ecosystem and modern Claude Code plugins:

1. **Commands de-emphasized (exist structurally but empty/unused in restructured plugins).**
   - In restructured plugins (see agentkit/, saaskit/ in claude-code-authstack on restructure branches), `commands/` directory is present for compatibility shims and legacy slash-command aliases only.
   - The actual implementation lives in skills/. Commands may be `.deleted.md` or thin shims that immediately delegate to `/skill-name`.
   - Never put primary logic, workflows, or orchestration in a command file.
   - Old pattern (pre-restructure): everything crammed into `commands/review-pr.md` with 100+ lines of workflow.
   - New pattern: command (if kept) is 10 lines that says "use the review-pr skill or spawn agents".

2. **Skills are the primary orchestration layer (lean SKILL.md + heavy refs in references/ or siblings).**
   - Every skill directory contains a `SKILL.md` that is the entrypoint and router.
   - Keep SKILL.md lean: frontmatter, short intro, phase/mode tables, imperative steps, checklists, "When to switch skills", and `> For expanded... load `references/xxx.md`` calls.
   - Move: long tables of data, exhaustive checklists, framework samples, anti-pattern catalogs, full templates, and reference material into `references/` (subdirectory) or sibling files next to SKILL.md (e.g. `go-reference.md`, `AUDIT-CHECKLIST.md`).
   - See `migrating-to-saaskit/SKILL.md` + siblings `AUDIT-CHECKLIST.md` + `IMPORT-SAMPLES.md`.
   - See `scalekit-code-doctor/SKILL.md` (orchestration only) + `references/REFERENCE.md` + `references/COMMON-MISTAKES.md`.

3. **Agents remain for high-agency specialists (spawnable focused workers, reasonably self-contained).**
   - Agents are not deprecated. They are the tool for work that benefits from isolation, different model (opus for deep reasoning), specific tool sets, color-coded identity, and rich trigger descriptions with concrete `<example>` blocks.
   - Use the Task tool (or equivalent subagent spawning) from a skill or thin command to launch them in parallel or sequence.
   - Good agent: `code-reviewer`, `silent-failure-hunter`, `type-design-analyzer` from pr-review-toolkit. Each has narrow charter, example invocations in its description frontmatter, and can be described to the user as "I will spawn the code-reviewer agent on the diff."
   - Bad agent: a generic "do everything" agent that duplicates a skill.
   - Agents live at plugin root `agents/` (shared) or occasionally skill-local. Keep their number small (0-6 per plugin).

4. **Reference material aggressively externalized (references/, docs/, rules/, AUDIT-CHECKLIST.md etc.).**
   - Durable, canonical, non-runtime content belongs outside the Claude-invoked files.
   - `docs/` at plugin root: long-form canonical knowledge (auth-flows, connections, tool-discovery). Skills link to `../../docs/xxx.md`.
   - `references/` at plugin root or inside skill/: data tables, connector catalogs, method signatures, anti-patterns, full samples, placement maps, style blocks.
   - `rules/`: cross-cutting always-on guidance (terminology, live-metadata-first).
   - Skill-local siblings: `AUDIT-CHECKLIST.md`, `IMPORT-SAMPLES.md`, `*-reference.md`.
   - This keeps the active context (SKILL.md + loaded refs on demand) small while preserving completeness.
   - Tessl and future consumers benefit: they can index the canonical layer independently of Claude-specific adapters.

5. **scalekit-code-doctor is the model (short SKILL.md + orchestration, massive data in references/).**
   - The gold standard: SKILL.md tells the agent "Before doing anything else, read the reference files in this skill's `references/` directory" then provides mode detection, checklists, and output formats.
   - All the "what is correct" data lives in the references so it can be updated without touching orchestration logic, and so it can be consumed by non-Claude tools.
   - Every complex skill (reviewers, generators, doctors, routers with large decision trees) should follow this split.
   - The Scalekit-only doctor lives in skillkit. This kit does not ship it. The pattern is what matters.

## Migration Tactics

When you encounter an old plugin:

- Inventory: list every command, every monolithic skill >150 lines, every duplicated agent.
- Classify each piece: orchestration → skill; deep narrow expertise → agent; data/tables/checklists/samples → reference file.
- Create `commands/review-foo.deleted.md` (or leave the dir empty) and move logic.
- For each new skill dir: write lean SKILL.md first, then extract.
- Add plugin-root `docs/`, `references/`, `rules/` as needed.
- Update README to document the new locations and the 5 principles.
- Preserve one copy of shared agents (e.g. setup-scalekit) and delete duplicates.
- Test by actually running the `/new-skill` and spawning agents in Claude Code.

See the authstack-restructure-plan.md and the restructured agentkit/saaskit trees for before/after diffs.

## Anti-Patterns to Avoid

- Putting 300-line workflow inside a command.
- Duplicating the same 80-line SKILL.md across 5 plugins.
- Burying reference data inside SKILL.md "for convenience".
- Creating agents for one-off tasks that a skill + subagent prompt would handle.
- Leaving commands/ full of logic "because it worked before".
- Forgetting the "Did this help?" feedback loop and issue link.

## Relation to Official Guidance

The official Claude Code plugin docs (https://code.claude.com/docs/en/plugins) describe the supported layout (skills/, agents/, commands/, hooks/, .claude-plugin/). The restructure model is a *content architecture* layered on top of that supported layout: skills/ becomes the primary authored content, with aggressive externalization for maintainability and multi-consumer reuse (Claude Code, Codex, Cursor, Tessl, etc.).

Follow the supported layout for files that Claude Code loads automatically. Follow the 5 principles for what you put inside them and where the bulk of your knowledge lives.

