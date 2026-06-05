#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * recipe-scaffold.ts
 *
 * Generates a documentation recipe template following quality principles:
 * - Informative verb-phrase title (not abstract noun)
 * - "Use this when" before code (takeaway up front)
 * - Self-contained code example (no unexplained dependencies)
 * - Short standalone topic sentences
 * - Troubleshooting section
 *
 * Usage:
 *   deno run --allow-read --allow-write scripts/recipe-scaffold.ts "recipe-name"
 *   deno run --allow-read --allow-write scripts/recipe-scaffold.ts "recipe-name" --tier quick
 *   deno run --allow-read --allow-write scripts/recipe-scaffold.ts "recipe-name" --tier deep
 *   deno run --allow-read --allow-write scripts/recipe-scaffold.ts "recipe-name" --dry-run
 */

// === INTERFACES ===
interface RecipeConfig {
  name: string;
  tier: "quick" | "standard" | "deep";
  dryRun: boolean;
  outputDir: string;
}

// === TEMPLATES ===
const TEMPLATES: Record<string, string> = {
  quick: `# [Verb phrase describing what this accomplishes]

**Use this when:** [1–2 sentences: the problem this solves and when to apply it.]

## Solution

\`\`\`[language]
# Self-contained example — no extra dependencies required.
# Replace YOUR_VALUE with your actual value.
[code here]
\`\`\`

## What this does

[1–2 sentences. Lead with the subject: "This pattern reduces X by doing Y."]

## Common variations

- **[Variation A]:** [one-line description]
- **[Variation B]:** [one-line description]

## If this doesn't work

- **[Symptom]:** [cause + fix]
- **[Symptom]:** [cause + fix]
`,

  standard: `# [Verb phrase describing what this accomplishes]

**Use this when:** [1–2 sentences: the problem this solves and when to apply it.]

**Don't use this when:** [1 sentence: the scenario where a different recipe fits better.]

## Table of contents

- [Prerequisites](#prerequisites)
- [Solution](#solution)
- [How it works](#how-it-works)
- [Variations](#variations)
- [Troubleshooting](#troubleshooting)
- [Related recipes](#related-recipes)

## Prerequisites

- [Dependency or knowledge required — spell out abbreviations, link to explanations]
- [Another prerequisite]

## Solution

\`\`\`[language]
# Self-contained example — no extra dependencies required.
# Replace YOUR_VALUE with your actual value. Never hardcode secrets.
[code here]
\`\`\`

## How it works

[Short paragraph. Lead with the subject. Max 4 sentences.]

[Second point only if genuinely a separate concept — no "as mentioned above".]

## Variations

### [Variation A accomplishes X for a different scenario]

\`\`\`[language]
[code]
\`\`\`

### [Variation B handles edge case Y]

\`\`\`[language]
[code]
\`\`\`

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| [Error message or behavior] | [Root cause] | [Action] |
| [Error message or behavior] | [Root cause] | [Action] |

## Related recipes

- [Recipe name] — [one-line reason to use it instead or alongside this one]
`,

  deep: `# [Verb phrase describing what this accomplishes]

> **TL;DR:** [One sentence. The most important thing to know. Lead with the topic word.]

**Use this when:** [2–3 sentences: the problem, context, and why this is the right approach.]

**Don't use this when:** [1–2 sentences: the alternative scenario and which recipe to use instead.]

## Table of contents

- [Background](#background)
- [Prerequisites](#prerequisites)
- [Solution](#solution)
- [How it works](#how-it-works)
- [Variations](#variations)
- [Performance considerations](#performance-considerations)
- [Troubleshooting](#troubleshooting)
- [Related recipes](#related-recipes)

## Background

[2–3 sentences grounding the topic broadly. "[X] appears across many systems, from A to B to C." Help new readers orient before diving in — experts skim this section.]

## Prerequisites

- [Dependency or knowledge required — spell out all abbreviations on first use]
- [Another prerequisite]

**Install prerequisites:**

\`\`\`bash
[install command]
\`\`\`

## Solution

\`\`\`[language]
# Complete, self-contained example.
# No external dependencies beyond what's listed in Prerequisites.
# Replace YOUR_VALUE with your actual value. Never hardcode secrets.
[code here]
\`\`\`

## How it works

[Short paragraph on the key mechanism. Lead with the subject. Max 4 sentences.]

[Second paragraph only if genuinely a separate concept — no "building on this".]

## Variations

### [Variation A accomplishes X for a different scenario]

**Use when:** [one-line trigger]

\`\`\`[language]
[code]
\`\`\`

### [Variation B handles edge case Y]

**Use when:** [one-line trigger]

\`\`\`[language]
[code]
\`\`\`

## Performance considerations

- **[Scenario]:** [impact and recommendation]
- **[Scenario]:** [impact and recommendation]

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| [Error message or behavior] | [Root cause] | [Action] |
| [Error message or behavior] | [Root cause] | [Action] |

## Related recipes

- [Recipe name] — [one-line: when to use this one instead or alongside]
- [Recipe name] — [one-line]
`,
};

// === UTILITIES ===
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// === MAIN ===
async function main(): Promise<void> {
  const args = Deno.args;

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`recipe-scaffold.ts

Generate a documentation recipe template following quality principles.

Usage:
  deno run --allow-read --allow-write scripts/recipe-scaffold.ts "recipe-name" [options]

Options:
  --tier quick|standard|deep   Recipe depth tier (default: standard)
  --output <dir>               Output directory (default: ./recipes)
  --dry-run                    Preview template without writing

Examples:
  deno run --allow-read --allow-write scripts/recipe-scaffold.ts "authenticate-user"
  deno run --allow-read --allow-write scripts/recipe-scaffold.ts "stream-response" --tier quick
  deno run --allow-read --allow-write scripts/recipe-scaffold.ts "batch-process" --tier deep --dry-run
`);
    Deno.exit(0);
  }

  // Parse --tier
  const tierIndex = args.indexOf("--tier");
  const tierRaw = tierIndex !== -1 ? args[tierIndex + 1] : "standard";
  const tier = (["quick", "standard", "deep"].includes(tierRaw)
    ? tierRaw
    : "standard") as "quick" | "standard" | "deep";

  // Parse --output
  const outputIndex = args.indexOf("--output");
  const outputDir = outputIndex !== -1 ? args[outputIndex + 1] : "./recipes";

  const dryRun = args.includes("--dry-run");

  // Track consumed indices to find positional arg
  const skipIndices = new Set<number>();
  if (tierIndex !== -1) { skipIndices.add(tierIndex); skipIndices.add(tierIndex + 1); }
  if (outputIndex !== -1) { skipIndices.add(outputIndex); skipIndices.add(outputIndex + 1); }

  let recipeName: string | null = null;
  for (let i = 0; i < args.length; i++) {
    if (!args[i].startsWith("--") && !skipIndices.has(i)) {
      recipeName = args[i];
      break;
    }
  }

  if (!recipeName) {
    console.error("Error: recipe name required.\nUsage: recipe-scaffold.ts \"recipe-name\" [--tier quick|standard|deep]");
    Deno.exit(1);
  }

  const content = TEMPLATES[tier];
  const slug = slugify(recipeName);
  const outputPath = `${outputDir}/${slug}.md`;

  if (dryRun) {
    console.log(`[dry-run] Would write: ${outputPath} (tier: ${tier})\n`);
    console.log(content);
    return;
  }

  try {
    await Deno.mkdir(outputDir, { recursive: true });
    await Deno.writeTextFile(outputPath, content);
    console.log(`Created: ${outputPath} (tier: ${tier})`);
  } catch (e) {
    console.error(`Error writing file: ${e}`);
    Deno.exit(1);
  }
}

main();
