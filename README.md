# devex-kit

A collection of agent skills for developer experience work.

## Skills

### authoring-cookbooks

Diagnostic skill for documentation quality — skimmability, writing clarity, and reader helpfulness.

### journey-sidebar-labels

Assistive skill for **sidebar navigation**: group labels, item labels, and order should follow a **developer journey** (setup → core loop → scale → ship). Includes a reference model derived from Scalekit **Full stack auth** in [`sidebar.config.ts`](https://github.com/scalekit-inc/developer-docs/blob/main/src/configs/sidebar.config.ts) and label rules from the docs standards (concise, sentence case, outcome-focused).

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
/skills load ./skills/documentation/journey-sidebar-labels/SKILL.md
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

