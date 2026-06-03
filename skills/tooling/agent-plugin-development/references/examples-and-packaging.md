# Real-World Examples and Packaging

Study these canonical examples. Then package your plugin so others can study it the same way.

## Primary Recommended Example 1: pr-review-toolkit (Agents + Skill/Orchestration Instead of Command)

Location (in claude-plugins-official marketplace and caches): `plugins/pr-review-toolkit/`

**What it demonstrates:**
- A formerly monolithic command (`review-pr`) was the old way.
- Refactored to 6 focused agents (code-reviewer, pr-test-analyzer, silent-failure-hunter, type-design-analyzer, comment-analyzer, code-simplifier) + orchestration logic.
- In the restructure era, the orchestration moves into a skill (or a very thin command shim that immediately delegates to the skill).
- Each agent .md has a rich description with multiple `<example>` blocks describing exactly when the parent should spawn it.
- Parallel and sequential launching patterns are explicit.
- Output formats are standardized so the orchestrator can merge reports cleanly.

**Lesson for you:**
If you are tempted to write a long "do X, then based on results do Y" command, stop. Create the specialists as agents and a thin skill that classifies scope and spawns the right subset. Users still get the one-invocation experience (`/pr-review` or `/review-pr-toolkit:review-pr` shim) but the implementation follows the 5 principles.

See the `review-pr.deleted.md` in skillkit/scalekit for the before picture.

## Primary Recommended Example 2: docs-engineering (Skills + refs + examples/ in a Plugin)

Location: `plugins/docs-engineering/` under the skillkit marketplace.

**Directory inside the plugin:**
```
docs-engineering/
├── commands/
│   └── review-docs.md          # Thin top-level shim (legacy compat)
├── README.md
└── skills/
    └── docs-engineering/
        ├── examples/
        │   └── good-cookbook.md
        ├── references/
        │   └── writing-style.md
        └── SKILL.md
```

**What it demonstrates:**
- No agents dir (or empty) — not every plugin needs them.
- Skill is self-contained under `skills/<name>/`.
- Uses `references/` and `examples/` exactly as prescribed.
- SKILL.md is short, routes, points at the siblings, enforces imperative style and quality dimensions.
- The top-level command is present but minimal.
- This is the clean "skills + refs + examples" pattern you should copy for most new work.

The SKILL.md itself even says: "Point to the appropriate references or examples when deeper patterns apply."

## Secondary Study: Restructured Authstack Plugins (agentkit + saaskit)

In the claude-code-authstack repo on restructure branches (and the worktree copies under .grok/...):

- `plugins/agentkit/` and `plugins/saaskit/`
- `commands/` and `agents/` dirs are empty (0 files).
- `skills/<many>/SKILL.md` are thin routers that say "Use this skill as the ... entrypoint. It should stay thin and route into the canonical docs in `docs/`."
- Heavy content lives in:
  - plugin-root `docs/`, `references/`, `rules/`
  - skill-local siblings (`go-reference.md`, `AUDIT-CHECKLIST.md`, `IMPORT-SAMPLES.md`)
  - Some skills still have their own `references/` (scalekit-code-doctor is the extreme)
- Shared single `setup-scalekit` agent (deduped from 5 copies).
- Every skill has a "When to switch skills" section.
- README at plugin root explains the canonical vs adapter layers.

This is the largest real-world demonstration of "commands de-emphasized", "skills primary", "aggressive externalization", and "scalekit-code-doctor model".

## Packaging Checklist (Before You Publish or PR)

Use this in addition to the quality checklist in the main SKILL.md.

- [ ] `skills/<name>/SKILL.md` has the exact devex-kit frontmatter (name, description with triggers, license: MIT, metadata author/version/type/mode)
- [ ] `tile.json` present if the skill is meant to ship via devex-kit (see tooling/ examples)
- [ ] `commands/` dir exists and is empty or contains only `.deleted.md` / trivial shims
- [ ] `agents/` dir exists and is empty or contains only 0-6 well-described specialist agents
- [ ] Every heavy artifact (tables > 10 rows, full checklists, long samples, decision trees) is in a `references/` file or sibling .md next to the SKILL that needs it
- [ ] README.md at plugin root (7+ sections) explains purpose, canonical locations (docs/skills/rules), the 5 principles, and gives real `/skill-name` examples
- [ ] `examples/` present under at least one skill with good/bad or before/after annotated content (copy docs-engineering style)
- [ ] Cross-links use the `> For expanded... load `references/...`` pattern or relative `../../docs/` links
- [ ] "Did this help?" feedback instruction present in main skills
- [ ] No duplication of content that belongs in an existing devex-kit skill (sdk-craft, mcp-server-craft, docs-writing-style, etc.)
- [ ] Tested end-to-end: install the plugin (or use the local path), invoke the skill, exercise load references, spawn any agents, verify output quality and context size

## plugin.json and Marketplace Considerations

- Keep `name` short and stable (`agentkit`, `docs-engineering`).
- Version bumps should be meaningful (major when the 5-principle structure changes).
- If you maintain a marketplace.json (like the old scalekit-auth-stack one), update it when you consolidate or rename.
- For Codex / other consumers, the `skills/`, `references/`, `docs/`, and `rules/` layers are the valuable parts — the Claude-specific `commands/` and `agents/` are thin adapters.

## How to Add Your New Skill to devex-kit

1. Create the dir under `skills/tooling/agent-plugin-development/` (or documentation/ if it's purely docs-related).
2. Include SKILL.md + tile.json + references/ (at minimum one reference explaining the domain).
3. Add a short section to the root README.md under the appropriate heading with one-sentence summary + example invocation.
4. The skill is now part of the canonical collection and can be referenced by future "agent-plugin-development" sessions.

## Final Packaging Note

A well-packaged plugin following this skill is self-documenting. A new contributor (or an agent using this skill) should be able to land in the repo root, read only the README and the top-level SKILL.md, and know exactly where to put new content and why the structure looks the way it does.

That is the measure of success for agent-plugin-development.

