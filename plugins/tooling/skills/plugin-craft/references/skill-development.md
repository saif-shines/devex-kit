# Skill Development Patterns

How to write high-quality, devex-kit-style SKILL.md files that stay lean while being comprehensive via references/.

## Frontmatter (Required for devex-kit Skills)

Copy this exactly and customize:

```yaml
---
name: your-skill-name
description: |
  Long single paragraph or multi-line. Must be third-person. List the exact trigger phrases users will type.
  "Use when ... or mentions 'keyword1', 'keyword2'."
  Be specific. "Provides help" is bad. "Routes contributions before writing begins using placement maps and escalation triggers" is good.
license: MIT
metadata:
  author: saif-shines
  version: "1.0"
  type: assistive   # or router, diagnostic, implementation, handoff+review, etc.
  mode: lifecycle   # or directive, diagnostic+assistive, handoff+review, etc.
  # sources: "optional citation of upstream docs"
---
```

See sdk-craft, mcp-server-craft, docs-writing-style, devrel-tooling for variations. authoring-cookbooks uses "diagnostic" type and higher maturity_score (optional, not required for new tooling skills).

## Title and Lead Paragraph

```
# Your Skill Title

One compelling sentence that tells the reader what great outcome they get. Then a short paragraph describing the scope.

State which phase/mode you need, or describe the task.
```

Follow immediately with a phase/mode table (see all devex-kit tooling skills).

## The Load References Pattern (Non-Negotiable)

Use this exact blockquote style everywhere heavy detail lives outside:

```
> For expanded principles and examples, load `references/design-principles.md`.
> For language-specific idiom guidance (Python, JS, Go, Java), load `references/language-idioms.md`.
```

This is how the skill achieves progressive disclosure while remaining actionable in the main file. Every devex-kit skill uses it (sdk-craft, mcp-server-craft, docs-contribution-router, docs-writing-style, devrel-tooling).

## Writing Style — Imperative

From the original plugin-development skill and enforced in all current devex-kit content:

Good (imperative):
- Start by reading the configuration.
- Validate the input before processing.
- State the phase. Load the reference. Produce the table.

Bad (second person / advisory):
- You should start by...
- You need to validate...
- Make sure you...

Use active voice, present tense, direct commands. This matches the style in SKILL.md bodies, quality checklists, and interventions in authoring-cookbooks.

## Body Organization (Lifecycle Skills)

1. Intro + phase table
2. Phase 1 section (with load reference if needed)
3. Phase 2...
4. Phase gates (table or bullets of "before moving from A to B verify...")
5. Quality checklist (checkboxes)
6. (Optional but recommended) "Did this help?" feedback section with issue link
7. (For reusable skills) "Adapt to your site/repo" section showing how to copy _template-*.json etc.

See sdk-craft and mcp-server-craft for the cleanest examples. docs-contribution-router shows router style with branches.

## Description Best Practices (from original + current)

Good trigger list:
```
description: |
  Design, build, document, and ship SDKs that developers love. ... Use this skill whenever someone is creating a new SDK, ... Also activates for questions about error message design, ...
```

Bad:
- Too vague: "Provides SDK help."
- Not third person: "You use this when building SDKs."
- Missing keywords users actually say.

List 5-12 concrete phrases.

## Progressive Disclosure & Context Management

- Metadata + name/desc always loaded (~100 words)
- SKILL.md body when the skill activates (< ~5k tokens ideal)
- References loaded on demand by explicit instruction in the SKILL or by the model when it sees the `load `references/...`` call

This is why scalekit-code-doctor starts with "**Before doing anything else**, read the reference files..."

Never embed 10k of data in SKILL.md "just in case".

## Phase Gates and Quality Checklists

Every lifecycle skill must have:

## Phase gates

Before moving between phases, verify:
**Design → Build:** ...?
**Build → Document:** ...?

## Quality checklist

Before any release / before calling done:
- [ ] Item that is objectively checkable
- [ ] `dora review <path> --format json` exits 0 (`npx @hacksmith/doraval` if `dora` is missing)
- [ ] ...

These become the agent's self-audit and the user's verification steps. See every tooling skill.

## "Did this help?" Section (devex-kit convention)

At the end of every session, ask: **"Did this solve what you were trying to do?"**

- If yes: done.
- If the routing was wrong, a branch was missing, or the output was unhelpful: encourage the user to file an issue at **https://github.com/saif-shines/devex-kit/issues**. Offer to help draft it using their agent — include: what they were trying to do, what the skill produced, and what was missing or incorrect.

This appears in docs-contribution-router, docs-writing-style, authoring-cookbooks, etc. Include it.

## Subagent / Specialist Handoffs Inside Skills

When the skill needs to spawn a high-agency agent (see pr-review-toolkit pattern):

- Detect the sub-task.
- Clearly tell the user: "I am now spawning the silent-failure-hunter agent on the changed error-handling files."
- Use the Task tool (or /agent-name invocation if supported) with focused input.
- The agent description (in its own .md) must already contain the "when to use" examples so the orchestrator knows the contract.

Do not embed the full specialist instructions inside the skill SKILL.md.

## Common Mistakes to Avoid

1. Second-person language.
2. Putting reference data (long tables, exhaustive lists) directly in SKILL.md instead of references/.
3. Vague description that doesn't list trigger phrases.
4. No phase gates or quality checklist.
5. Forgetting to update "When to switch skills" / complementary skills sections.
6. Duplicating content that already exists in another devex-kit skill (link or delegate instead).
7. Making the skill assume a specific product (Scalekit) without providing adaptation instructions + _template files (see docs-* skills).

## Template Skeleton (start here, then extract)

```markdown
---
name: foo-craft
description: |
  ...
license: MIT
metadata:
  author: saif-shines
  version: "1.0"
  type: assistive
  mode: lifecycle
---

# Foo Craft

...

| Phase | ... |

## Phase 1

> For expanded..., load `references/phase-1.md`.

## Phase gates

...

## Quality checklist

- [ ] ...

## Did this help?
...
```

Then create the references/ files with the expanded material.

## Integration with devex-kit

When your skill lives in this repo under `skills/tooling/your-skill/` or `skills/documentation/`:

- Add `tile.json` (exact shape used by sdk-craft etc.)
- The skill becomes installable/invokable as `/your-skill` once the kit is used.
- Update the root README.md with a short description + example invocation.
- Follow the same reference naming (`references/`, not `ref/`).

See how mcp-server-craft and sdk-craft are organized.

