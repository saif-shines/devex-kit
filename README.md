# devex-kit

A collection of agent skills for developer experience work.

## Skills

### docs-contribution-router

Routes documentation contributions to the right content type, placement, template, and workflow — before the contributor writes a single line.

Five branches:
- **API reference** — docs-side flow for landing a regenerated spec (does not cover the upstream source repo)
- **Agent connector** — hard stop on editing generated pages; walks through `_setup-*`, `_usage-*`, `_section-*` templates and `pnpm run sync-agent-connectors`
- **Content placement** — decision tree: cookbook / how-to / concept / reference / quickstart; explicit Aside anti-pattern rule
- **Integration guide** — section skeleton, frontmatter starter, screenshot workflow (VS Code paste-image extension)
- **Escalation** — severity-tagged (low → critical) for IA/tooling/override changes; maps to CODEOWNERS paths

Scalekit-specific paths are in `references/scalekit-*.json`. External consumers drop their own configs at `<docs-repo>/.devex-kit/` — no edits to SKILL.md required.

### docs-writing-style

Two-mode writing guide.

- **Handoff mode** — exports a paste-ready style prompt for the contributor's coding agent (Claude / Cursor / Copilot). Includes voice rules, SDK variable naming, code standards, and content-type supplements.
- **Review mode** — runs a quality rubric against a draft. Reports PASS / FAIL / WARN in priority order; ends with the single most impactful fix.

Scalekit-specific prompt block in `references/scalekit-style-prompt-block.md`. Template for other sites in `references/_template-style-prompt-block.md`.

### authoring-cookbooks

Diagnostic skill for documentation quality — skimmability, writing clarity, and reader helpfulness.

### journey-sidebar-labels

Assistive skill for **sidebar navigation**: group labels, item labels, and order should follow a **developer journey** (setup → core loop → scale → ship). Includes a reference model derived from Scalekit **Full stack auth** in [`sidebar.config.ts`](https://github.com/scalekit-inc/developer-docs/blob/main/src/configs/sidebar.config.ts) and label rules from the docs standards (concise, sentence case, outcome-focused).

---

## Using in Claude Code

Once installed, invoke any skill with its slash command directly in Claude Code:

```
/docs-contribution-router
/docs-writing-style
/authoring-cookbooks
/journey-sidebar-labels
```

Example sessions:

```
/docs-contribution-router I have a customer issue to document — users are confused
about how session tokens are revoked when an org is disabled. Where does this go?
```

```
/docs-writing-style handoff mode. I'm writing a how-to guide for agent auth in Node.js.
```

```
/docs-writing-style review mode. [paste your MDX draft or give a file path]
```

```
/authoring-cookbooks My cookbook has plenty of content but readers say it's hard to follow.
```

```
/journey-sidebar-labels Review these sidebar labels for sentence case and journey order: [paste]
```

Claude Code loads the skill and routes your request automatically. You do not need to explain the skill's rules — just describe what you are trying to do.

---

## Try it

### Install via [skills.sh](https://skills.sh) (Vercel Skills CLI)

Installs from this repo's `SKILL.md` files (all skills are discovered).

```bash
# Install everything
npx skills add saif-shines/devex-kit --yes

# Or pick one skill
npx skills add saif-shines/devex-kit --skill docs-contribution-router --yes
npx skills add saif-shines/devex-kit --skill docs-writing-style --yes
npx skills add saif-shines/devex-kit --skill authoring-cookbooks --yes
npx skills add saif-shines/devex-kit --skill journey-sidebar-labels --yes

# Inspect without installing
npx skills add saif-shines/devex-kit --list
```

### Install via [tessl](https://tessl.io)

Each skill is published as its own tile (`tile.json` next to `SKILL.md`).

```bash
tessl install saif-shines/docs-contribution-router --yes
tessl install saif-shines/docs-writing-style --yes
tessl install saif-shines/authoring-cookbooks --yes
tessl install saif-shines/journey-sidebar-labels --yes
```

### Try locally (no install)

Clone this repo and point your agent at the skill directly:

```bash
git clone https://github.com/saif-shines/devex-kit
```

Then in Claude Code:

```
/skills load ./skills/documentation/docs-contribution-router/SKILL.md
/skills load ./skills/documentation/docs-writing-style/SKILL.md
/skills load ./skills/documentation/authoring-cookbooks/SKILL.md
/skills load ./skills/documentation/journey-sidebar-labels/SKILL.md
```

---

## Use the skills

### docs-contribution-router

Invoke when starting any docs contribution. The skill identifies the branch from your stated intent.

**Route a new piece of information:**
```
I have a customer issue to document — a user was confused about how session tokens
are revoked when an organization is disabled. Where does this go and what type of
page should it be?
```

**API reference update:**
```
I have a regenerated scalekit.scalar.yaml. What do I do to land it in the docs repo?
```

**Agent connector work:**
```
I want to add setup instructions for the Notion connector. How do I do that without
editing the generated pages?
```

**Integration guide:**
```
I'm writing an integration guide for connecting Okta as an SSO provider. Give me
the template and tell me where the file goes.
```

**Escalation check:**
```
I want to add a new top-level section to the sidebar called "Workflows". Is that
something I can just do or does it need review?
```

The skill outputs: content type, file path, frontmatter starter, sidebar label suggestion, and an escalation flag with severity and required PR description content.

### docs-writing-style

Declare your mode at the start of the session.

**Handoff mode — get a style prompt for your coding agent:**
```
Handoff mode. I'm writing a how-to guide for setting up agent auth in Node.js.
Give me the style prompt to paste into my coding agent.
```

Paste the output into your agent's system instructions, `.cursorrules`, `CLAUDE.md`, or `.github/copilot-instructions.md`. Your agent will match the existing voice without you reading the full style guide.

**Review mode — check a draft before submitting:**
```
Review mode. Here's my draft: [paste MDX or file path]
```

The skill reports PASS / FAIL / WARN per criterion and ends with the single most impactful fix.

### authoring-cookbooks

Activates when you describe a documentation quality problem.

**Diagnose existing docs:**
```
My cookbook has plenty of content but readers say it's hard to follow. What's wrong?
```

**Start a new cookbook:**
```
I'm starting a new cookbook from scratch. How should I structure it?
```

**Audit a full directory:**
```
Audit all the recipes in ./docs/recipes/ for quality issues.
```

The skill maps issues to seven quality states and suggests prioritized interventions.

### journey-sidebar-labels

Use when restructuring or reviewing navigation labels.

```
Our product sidebar is alphabetical; reorder it as an implementation journey.
```

```
Review these sidebar group labels for sentence case and journey order: [paste config excerpt]
```

---

## Adapting to your docs site

`docs-contribution-router` and `docs-writing-style` ship with Scalekit-specific reference data (placement maps, escalation trigger paths, style prompt). To use them on a different docs site:

1. Copy the `_template-*.json` / `_template-*.md` files from the skill's `references/` directory.
2. Fill in your own paths, conventions, and CODEOWNERS configuration.
3. Drop the filled-in files at `<your-docs-repo>/.devex-kit/`.

The skills check for local overrides first and fall back to the bundled Scalekit samples with a note.
