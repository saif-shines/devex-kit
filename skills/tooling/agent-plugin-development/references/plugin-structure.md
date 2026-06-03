# Modern Plugin Structure

Detailed directory layout, required files, and comparison of legacy vs restructured plugins. Load this when scaffolding a new plugin or auditing an existing one.

## Canonical Modern Layout (Skills-First)

```
my-agent-plugin/                     # or saas-plugin, mcp-foo, etc.
├── .claude-plugin/
│   └── plugin.json                  # Required metadata for Claude Code
├── skills/                          # PRIMARY LAYER — the orchestration heart
│   └── my-core-skill/
│       ├── SKILL.md                 # Lean (frontmatter + tables + calls to refs). Imperative. 1.5-2k words.
│       ├── references/              # Heavy data, tables, checklists (or use siblings at this level)
│       │   ├── detailed-decision-tree.md
│       │   └── data-catalog.json
│       └── examples/                # Annotated good + bad samples (see docs-engineering)
│   └── another-skill/
│       ├── SKILL.md
│       ├── AUDIT-CHECKLIST.md       # Skill-local externalized ref (see migrating-to-saaskit)
│       └── sibling-reference.md
├── agents/                          # 0-N high-agency specialists. Empty dir is fine and preferred.
│   └── code-reviewer.md             # Example: rich description with <example> blocks
│   └── silent-failure-hunter.md
├── commands/                        # Structural for compat. Keep empty or use only for thin shims / .deleted.
│   └── review-foo.deleted.md        # Historical marker from pr-review-toolkit refactor
├── docs/                            # (Recommended) Canonical durable docs. Skills link here with ../../
│   ├── index.md
│   ├── core-concepts.md
│   └── workflows/
├── references/                      # (Optional) Plugin-wide shared reference material
│   └── terminology.md
├── rules/                           # (Optional) Cross-cutting always-applied rules
│   └── terminology.md
├── README.md                        # 7-section format: purpose, install, structure, canonical locations, examples, principles, links
├── LICENSE                          # MIT recommended
└── tile.json                        # If this skill ships via devex-kit (see sdk-craft etc.)
```

## Key Directories Explained

- **skills/**: The only place new logic and workflows should be added. One skill = one coherent responsibility or lifecycle phase.
- **agents/**: Narrow, spawnable, high-agency experts. Description frontmatter must contain concrete invocation examples so the main agent knows when and how to launch them.
- **commands/**: Legacy/compat only. In fully restructured plugins this dir exists but contains no active implementation. Users invoke skills directly (`/my-core-skill`) or the skill itself orchestrates agents.
- **docs/**, **references/**, **rules/**: The "Tessl layer" — content that can be consumed by documentation systems, other agents, or static indexers without executing Claude-specific frontmatter.
- **examples/** inside skill: Working, copy-pastable or annotated demonstrations (see docs-engineering plugin in skillkit marketplace).

## plugin.json (minimal modern example)

```json
{
  "name": "my-agent-plugin",
  "version": "2.0.0",
  "description": "Skills-first plugin for ...",
  "skills": {
    "my-core-skill": {
      "path": "skills/my-core-skill/SKILL.md"
    }
  }
}
```

Additional fields (hooks, etc.) as needed. See installed plugins under `~/.claude/plugins/...` for full current schemas.

## Legacy vs Restructured Comparison

| Aspect              | Pre-Restructure (old)                     | Post-Restructure (current best practice)                  |
|---------------------|-------------------------------------------|-----------------------------------------------------------|
| Commands            | Full workflows, 100-300 lines             | Empty dir or .deleted + thin shim                         |
| Skills              | Monolithic SKILL.md with everything       | Lean SKILL.md + references/ + siblings                    |
| Agents              | Duplicated 5-10 copies, vague descriptions| 0-6 unique, rich <example> blocks, focused charters       |
| Content location    | Inside runtime .md files                  | docs/, references/, rules/, AUDIT-*.md etc.               |
| Duplication         | High (setup agent in every plugin)        | Single shared copy + references                           |
| Example of good     | —                                         | pr-review-toolkit (agents + orchestration skill), docs-engineering (skills + refs + examples/), agentkit/saaskit restructured plugins |

## Empty Dirs Are Intentional

In git, empty dirs need a placeholder or are created on clone. In restructured authstack plugins, `agents/` and `commands/` are literally empty (0 entries). This signals "we follow the model; these are present only for layout compatibility."

If you need a placeholder for git:

```
agents/.gitkeep
commands/.gitkeep
```

But prefer to document in README that the dirs are intentionally empty per the 5 principles.

## How Skills Reference External Content

Inside SKILL.md always use the exact pattern used across devex-kit:

```
> For expanded X, load `references/yyy.md`.
> For the full decision tree, load `references/placement-decisions.md`.
```

Or relative links for plugin-root content when the skill is inside a larger plugin:

```
- Auth flows: [../../docs/auth-flows.md](../../docs/auth-flows.md)
```

Never duplicate the content of a reference inside the SKILL.md body.

## Adding a New Skill to an Existing Plugin

1. Create `skills/new-skill-name/SKILL.md` with correct devex-kit frontmatter (license + metadata).
2. Write the lean body using tables, imperatives, load calls.
3. Extract any large block into a sibling or references/ file in the same skill dir.
4. Update the plugin's root README and (if present) `.claude-plugin/plugin.json`.
5. Add examples/ if the skill demonstrates patterns.
6. If this is a devex-kit skill, also add `tile.json` at the skill root and place the whole thing under `skills/tooling/` or `skills/documentation/`.

## Recommended README Sections (copy from restructured agentkit)

- Purpose (what problem + canonical content locations)
- Installation
- Canonical content layer (docs/, skills/, rules/)
- Claude runtime adapters (commands/, agents/, hooks/)
- Quick start with real `/skill-name` invocations
- The 5 principles (link to this reference)
- Links to live docs and source

