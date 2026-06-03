# Modern Plugin Structure

Detailed directory layout, required files, and comparison of legacy vs restructured plugins. Load this when scaffolding a new plugin or auditing an existing one.

**This skill aligns with the current official Claude Code plugin model** (see https://code.claude.com/docs/en/plugins and the full index at https://code.claude.com/docs/llms.txt). The patterns here add devex-kit conventions on top: aggressive externalization, the 5 restructure principles, lean SKILL.md + references/ load pattern, and devex-kit distribution via tile.json.

## Plugins vs Standalone Configuration

Claude Code supports two ways to add custom skills, agents, and hooks:

| Approach | Skill names | Best for |
| --- | --- | --- |
| **Standalone** (`.claude/` directory) | `/hello` | Personal workflows, project-specific customizations, quick experiments |
| **Plugins** (self-contained directories with skills, agents, hooks, or a `.claude-plugin/plugin.json` manifest) | `/plugin-name:hello` | Sharing with teammates, distributing to community, versioned releases, reusable across projects |

**Use standalone configuration when**:
- You’re customizing Claude Code for a single project
- The configuration is personal and doesn’t need to be shared
- You’re experimenting with skills or hooks before packaging them
- You want short skill names like `/hello` or `/deploy`

**Use plugins when**:
- You want to share functionality with your team or community
- You need the same skills/agents across multiple projects
- You want version control and easy updates for your extensions
- You’re distributing through a marketplace (or devex-kit)
- You’re okay with namespaced skills like `/my-plugin:hello` (namespacing prevents conflicts)

Start with standalone in `.claude/` for quick iteration, then convert to a plugin when you’re ready to share (see migration section below and in `references/examples-and-packaging.md`).

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

### Official plugin.json manifest fields (recommended)

```json
{
  "name": "my-first-plugin",
  "description": "A greeting plugin to learn the basics",
  "version": "1.0.0",
  "author": {
    "name": "Your Name"
  },
  "homepage": "https://...",
  "repository": "https://github.com/...",
  "license": "MIT"
}
```

- `name`: Unique identifier and skill namespace. Skills become `/name:skill-name`.
- `description`: Shown in plugin manager and marketplaces.
- `version`: Explicit version for updates. If omitted, git commit SHA is used for git-distributed plugins.
- `author`, `homepage`, `repository`, `license`: Useful for attribution and distribution.

For the complete schema, see the official Plugins reference.

**Critical rule**: Only `plugin.json` belongs inside `.claude-plugin/`. All other directories (`skills/`, `agents/`, `commands/`, `hooks/`, etc.) must live at the **plugin root**. Putting logic directories inside `.claude-plugin/` is a common mistake that breaks loading.

## Local development and testing (official Claude Code)

Use the `--plugin-dir` flag during development. This loads your plugin directly without installation or marketplace steps:

```
claude --plugin-dir ./my-plugin
```

The flag also accepts a `.zip` of the plugin (Claude Code v2.1.128+):

```
claude --plugin-dir ./my-plugin.zip
```

When a `--plugin-dir` plugin has the same name as an installed marketplace plugin, the local copy takes precedence for that session (except for plugins that force-enable/disable settings).

As you edit, run `/reload-plugins` inside Claude Code to pick up changes to skills, agents, hooks, MCP servers, and LSP servers without restarting.

You can load multiple plugins in one session:

```
claude --plugin-dir ./plugin-one --plugin-dir ./plugin-two
```

For a packaged `.zip` hosted at a URL (e.g. CI artifact), use `--plugin-url`:

```
claude --plugin-url https://example.com/my-plugin.zip
```

Test components:
- Skills: `/plugin-name:skill-name` (or with `$ARGUMENTS`)
- Agents: appear in `/agents`
- Hooks and other features: exercise the triggering actions

**Develop persistently in your skills directory**

Instead of passing `--plugin-dir` every time, use:

```
claude plugin init my-tool
```

This scaffolds `~/.claude/skills/my-tool/` with a manifest and starter skill. It auto-loads as `my-tool@skills-dir` on next launch. See the official "Skills-directory plugins" reference for personal vs project scope, workspace trust, and removal.

> For the full official quickstart, --plugin-dir / --plugin-url details, /reload-plugins workflow, and debugging steps, also consult the live docs at https://code.claude.com/docs/en/plugins (and fetch https://code.claude.com/docs/llms.txt for the complete index).

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

## Complex plugin components (official support)

Plugins can include more than skills and agents. Add these at the plugin root:

- **LSP servers** (`.lsp.json`): Real-time code intelligence for languages without official plugins. Users must have the language server binary on their machine.
- **Background monitors** (`monitors/monitors.json`): Watch logs/files/external status. Each stdout line becomes a notification to Claude. Use the `when` trigger and variable substitution per the official monitors reference.
- **Default settings** (`settings.json`): Apply defaults when the plugin is enabled. Currently supports `agent` (force a custom agent as main thread) and `subagentStatusLine`.
- **Hooks** (`hooks/hooks.json`): Event handlers (PostToolUse, etc.). The command receives JSON on stdin. See official hooks reference.
- **MCP servers** (`.mcp.json` at plugin root): Tool servers for the plugin.
- **Executables** (`bin/`): Added to the Bash tool PATH while the plugin is enabled.
- **More**: See the official "Plugin directory structure" and components docs.

## Migration from standalone `.claude/` configuration

If you have existing skills/hooks in `.claude/`:

1. Create the plugin skeleton with `.claude-plugin/plugin.json`.
2. Copy `commands/`, `agents/`, `skills/` to the plugin root.
3. For hooks: create `hooks/hooks.json` and move the hooks object (use `jq` to transform if needed from settings JSON).
4. Test with `claude --plugin-dir ./my-plugin`.
5. Remove or archive the original `.claude/` files to avoid duplicates (the plugin version takes precedence).

See `references/examples-and-packaging.md` for a fuller migration checklist and the official "Convert existing configurations to plugins" guide.

## Recommended README Sections (copy from restructured agentkit)

## Recommended README Sections (copy from restructured agentkit)

- Purpose (what problem + canonical content locations)
- Installation
- Canonical content layer (docs/, skills/, rules/)
- Claude runtime adapters (commands/, agents/, hooks/)
- Quick start with real `/skill-name` invocations
- The 5 principles (link to this reference)
- Links to live docs and source

