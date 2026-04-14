# devex-kit

A collection of agent skills for developer experience work.

## Skills

### authoring-cookbooks

Diagnostic skill for documentation quality — skimmability, writing clarity, and reader helpfulness.

## Try it

### Install via skills.sh

```bash
npx skills add saif-shines/devex-kit
```

### Install via tessl

```bash
tessl install saif-shines/authoring-cookbooks
```

### Try locally (no install)

Clone this repo and point your agent at the skill directly:

```bash
git clone https://github.com/saif-shines/devex-kit
```

Then in Claude Code:

```
/skills load ./skills/documentation/authoring-cookbooks/SKILL.md
```

### Use the skill

Once installed, the skill activates automatically when you describe a documentation problem in Claude Code. Examples:

**Diagnose existing docs:**
```
My cookbook has plenty of content but readers say it's hard to follow. What's wrong?
```

**Start a new cookbook:**
```
I'm starting a new cookbook from scratch. How should I structure it?
```

**Fix a specific recipe:**
```
Review this recipe and tell me what's wrong with it: [paste recipe]
```

**Audit a full directory:**
```
Audit all the recipes in ./docs/recipes/ for quality issues.
```

The skill will identify which of the seven quality states applies and give you specific, prioritized interventions — not a generic checklist.

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
