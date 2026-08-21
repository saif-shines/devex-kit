# DevEx Kit

Skills for documentation, SDKs, CLIs, MCP servers, and developer go-to-market.

You install a plugin or a single skill. Then you type a slash command. The agent follows that skill.

This kit is generic. Scalekit-only docs work (agent connectors, CODEOWNERS escalation) lives in [skillkit](https://github.com/saif-shines/skillkit) `docs-engineering`.

Longer install examples and author notes: [saifshines.dev/devex-kit](https://saifshines.dev/devex-kit).

## What you need

Nothing extra to read the skills.

To install and use them you need one of:

- Claude Code, or
- `npx` (for [skills.sh](https://skills.sh))

To change this kit you also need Node.js. Then run `npm install` in this repo.

## Install

### Claude Code (plugins)

Add the marketplace once:

```
/plugin marketplace add saif-shines/devex-kit
```

Install the plugins you want:

```
/plugin install tooling@devex-kit
/plugin install documentation@devex-kit
/plugin install dev-gtm@devex-kit
```

`tooling` includes the router (`ask-devex`). Start there if you are unsure.

### Any agent (`npx skills`)

Install the whole kit:

```bash
npx skills add saif-shines/devex-kit --yes
```

Or install one skill:

```bash
npx skills add saif-shines/devex-kit --skill ask-devex --yes
```

List names first with `--list`. Do not install a name from `in-progress/`.

### Local clone (no install)

```bash
git clone https://github.com/saif-shines/devex-kit
```

Load one skill by path, for example:

```
/skills load ./plugins/tooling/skills/ask-devex/SKILL.md
```

The path for every skill is `plugins/<plugin>/skills/<name>/SKILL.md`.

## Use

Type `/ask-devex` and state the job. The human starts this skill. The model does not.

```
/ask-devex I need to design first-success DX and then write the getting-started docs
```

The router names the next skill and gives a command you can paste.

You can also start a skill directly:

```
/docs-contribution-router Where does this customer issue go?
/docs-writing-style review mode. [paste draft]
/sdk-craft Design the public API for our TypeScript SDK
```

The three user-started skills are `ask-devex`, `docs-contribution-router`, and `create-skill`. The rest may start from a description match.

Full list: [docs/skills.md](docs/skills.md).

## The three plugins

| Plugin | Use it for |
|--------|------------|
| `documentation` | Where a page goes, writing style, cookbooks, sidebar labels |
| `tooling` | Router, SDKs, CLIs, MCP servers, skills, plugins, code style |
| `dev-gtm` | Launch stories and first-success DX |

## Adapt a docs site

Optional. Drop site files in the docs repo:

- `.devex-kit/placement-map.json` for `docs-contribution-router`
- `.devex-kit/style-prompt-block.md` for `docs-writing-style`

The skill uses those files when they exist.

## Change this kit

Read the contract first: [`CLAUDE.md`](CLAUDE.md) (same file as `AGENTS.md`).

Drafts go in [`in-progress/`](in-progress/). A skill is not shipped until the promotion checklist in that contract is done.

Check the kit:

```bash
npm test
npm run check
```

Record a plugin version bump with Changesets. Do not edit `plugin.json` version by hand.

```bash
npm run changeset          # record
npm run version            # apply
npm run check-plugin-versions
```

The three packages are `documentation`, `tooling`, and `dev-gtm`.

Use `patch` for a small fix.
Use `minor` for a new shipped skill.
Use `major` when a slash command or skill name goes away.
Use `npx changeset add --empty` when the change does not bump a plugin.

Before you call a skill shipped, run:

```bash
dora review plugins/<plugin>/skills/<name> --quick
```

If `dora` is missing, use `npx @hacksmith/doraval review plugins/<plugin>/skills/<name> --quick`.
