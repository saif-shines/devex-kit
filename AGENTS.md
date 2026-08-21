# DevEx Kit contract

`CLAUDE.md` and `AGENTS.md` are the same file. Load this contract before adding or changing a skill.

## Skill tree

Put shipped skills only under `plugins/<plugin>/skills/<name>/`.
The three plugins are documentation, tooling, and dev-gtm.
Do not add a second skill tree.

## Promotion checklist

A skill is not shipped until every item is done:

1. Live path: `plugins/<plugin>/skills/<name>/SKILL.md`
2. `tile.json` in that skill directory
3. Human index row in `docs/skills.md`
4. Promotion list: add the skill to that plugin's `.claude-plugin/plugin.json` `skills` array
5. Kit router table: add or update the row so the next skill name stays true
6. Codex invocation file: `agents/openai.yaml` in that skill directory
7. Changeset for the plugin version

Draft skills live in repo-root `in-progress/`. Do not put drafts under a plugin `skills/` folder.

## Kit-router update rule

When adding, renaming, removing, or changing when a skill should be used, update the kit router table.
A router that omits a new skill, or still routes to a removed skill, is a router that lies.
The kit router skill is `plugins/tooling/skills/using-devex-kit/SKILL.md`.

## Voice

Write skill text in imperative voice.
Do not start a skill with "You are".
Do not use em-dashes.
Keep `metadata.type` and `metadata.mode` in frontmatter.
