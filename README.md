# devex-kit

A collection of agent skills for developer experience work.

## Skills

### authoring-cookbooks

Diagnostic skill for documentation quality — skimmability, writing clarity, and reader helpfulness.

## Try it

### Install via skills.sh

```bash
npx skills add saif-at-scalekit/authoring-cookbooks
```

### Install via tessl

```bash
tessl install saif-at-scalekit/authoring-cookbooks
```

### Try locally (no install)

Clone this repo and point your agent at the skill directly:

```bash
git clone https://github.com/saif-at-scalekit/devex-kit
```

Then in Claude Code:

```
/skills load ./skills/documentation/authoring-cookbooks/SKILL.md
```

### Try the scripts

Generate a recipe template:

```bash
deno run --allow-read --allow-write \
  skills/documentation/authoring-cookbooks/scripts/recipe-scaffold.ts \
  "my-recipe-name"

# Quick (minimal) template
deno run --allow-read --allow-write \
  skills/documentation/authoring-cookbooks/scripts/recipe-scaffold.ts \
  "my-recipe-name" --tier quick

# Deep (comprehensive) template
deno run --allow-read --allow-write \
  skills/documentation/authoring-cookbooks/scripts/recipe-scaffold.ts \
  "my-recipe-name" --tier deep
```

Audit existing documentation for quality issues:

```bash
deno run --allow-read \
  skills/documentation/authoring-cookbooks/scripts/coverage-audit.ts \
  ./path/to/your/docs/

# Check one dimension only
deno run --allow-read \
  skills/documentation/authoring-cookbooks/scripts/coverage-audit.ts \
  ./path/to/your/docs/ --check skimmability

# JSON output
deno run --allow-read \
  skills/documentation/authoring-cookbooks/scripts/coverage-audit.ts \
  ./path/to/your/docs/ --json
```
