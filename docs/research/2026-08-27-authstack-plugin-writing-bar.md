# Authstack plugin writing bar vs this kit

Date: 2026-08-27
Question: Can the live Scalekit plugin writing bar improve the skills in this kit?
Sources:
- `~/Projects/feedback-syndicate/build-with-ai/authstack/AGENTS.md` (live authoring tree)
- `~/Projects/feedback-syndicate/build-with-ai/skills/AGENTS.md` (portable skills pack)
- `~/Projects/feedback-syndicate/build-with-ai/authstack/skills/setup-scalekit/SKILL.md` (worked example)
- `~/Projects/feedback-syndicate/build-with-ai/claude-code-authstack/AGENTS.md` (archived; 500-line budget, one-hop refs)
- This kit at local HEAD. Prior note: `docs/research/2026-08-20-matt-emil-skill-plugin-authoring.md`

## What to borrow

The live writing bar in `authstack/AGENTS.md` is operational, not theoretical. Use these rules.

1. One job per skill.
2. Description contract: action verb, then `Use when`, then a sibling line `It does not … (that's \`name\`)`.
3. `SKILL.md` stays at or under 200 lines. Long dumps go in `references/` in the same folder. One hop only.
4. Every step ends on a checkable completion criterion (`Done when:`).
5. Point at the live environment. Do not cache CLI help or docs indexes.
6. Prompt the positive. A prohibition is a last-resort guardrail.

The archived `claude-code-authstack` bar is weaker on length (500 lines) and stronger on one extra rule: do not explain what the model already knows.

## What this kit already did

The 2026-08-20 Matt/Emil revamp already landed the packaging side:

- Three plugins. One skill tree. Drafts in `in-progress/`.
- User-started orchestrators: `ask-devex`, `docs-contribution-router`, `skill-craft`.
- Root contract in `CLAUDE.md` / `AGENTS.md`.
- `references/` plus load blockquotes.
- No em-dashes. No "You are" lead.
- `authoring-cookbooks` is already lean (76 lines). That was the first body rewrite in the spec.

Do not flatten the kit. Do not drop "Did this help?" or load blockquotes. Do not make tessl a main install path.

## Conflict to decide

`skill-craft` still tells authors to write a 1,500-2,000 word body.

Authstack tells authors to stay at or under 200 lines.

Those two targets fight. The 200-line bar matches progressive disclosure. The word target does not. `authoring-cookbooks` already follows the short bar. The long target is not in the sacred list in `CONTEXT.md`.

Recommend: change the authoring target in `skill-craft` (and `plugin-craft` refs) to the 200-line bar. Keep phase tables, load blockquotes, phase gates, and "Did this help?".

Do not copy authstack's "every skill is model-invoked" rule. This kit already split user-started vs model-invoked. Keep that split.

## Per-skill gaps

Line counts include frontmatter. Measured 2026-08-27.

| Skill | Lines | Description contract | Sibling exclusion | "Did this help?" | Notes |
| --- | ---: | --- | --- | --- | --- |
| ask-devex | 150 | Short (good for user-started) | No | Yes | Body still teaches a 1% auto-route rule. That rule cannot fire unless the skill is already loaded. Move it to the root contract if you still want it. Tessl still appears as an install path. |
| docs-contribution-router | 124 | Short (good) | No | Yes | Add a body lead: it does not write the page (`docs-writing-style`). |
| skill-craft | 165 | Short (good) | No | Yes | Points at `~/Downloads/SKILL.md`. Environment-specific. Authstack forbids this. Still teaches the 1,500-2,000 word target. |
| authoring-cookbooks | 76 | Job only. No `Use when`. | No | Yes | Closest to the bar. Add sibling: it does not set house voice (`docs-writing-style`). |
| docs-writing-style | 124 | Job + modes. No sibling. | No | Yes | Add sibling: it does not place the page (`docs-contribution-router`). |
| journey-sidebar-labels | 105 | Job only. | No | Yes | Opens with "You help authors". Violates imperative voice. |
| freecodecamp-style | 228 | Long trigger list. | No | Yes | Over the 200-line bar. |
| sdk-craft | 275 | Long trigger list. | No | **No** | Design/Build still hold code that belongs in `references/`. |
| mcp-server-craft | 329 | Long trigger list. | No | **No** | Worst length. Design-phase samples duplicate `references/tool-design.md`. |
| plugin-craft | 221 | Overlaps `skill-craft` ("create skill"). | No | Yes | Description must hand SKILL.md work to `skill-craft`. |
| devrel-tooling | 208 | Long trigger list. | No | **No** | Inline commander sample and Postman JSON belong in `references/`. |
| code-style-patterns | 122 | Long trigger list. | No | Yes | Fine length. Add sibling: it does not design plugins (`plugin-craft`). |
| pragmatic-fp | 69 | Long trigger list. | No | Yes | Fine length. Second-person in the body. |
| devrel-dx-craft | 158 | Long trigger list. | No | Yes | Fine length. Add sibling vs `devrel-story-craft`. |
| devrel-story-craft | 157 | Long trigger list. | No | Yes | Fine length. Add sibling vs `devrel-dx-craft`. |

No shipped skill uses the sibling exclusion line.

## Adopt list (safe)

These items do not break sacred kit rules.

1. Add a sibling exclusion to every craft-skill description. Example: `It does not write SKILL.md (that's \`skill-craft\`)`.
2. Keep user-started descriptions short. Put the exclusion in the body lead, not in a trigger paragraph.
3. Add "Did this help?" plus the issues URL to `sdk-craft`, `mcp-server-craft`, and `devrel-tooling`.
4. Rewrite the `journey-sidebar-labels` lead in imperative voice.
5. Remove the `~/Downloads/SKILL.md` pointer from `skill-craft`.
6. Remove tessl from the main `ask-devex` install path.
7. Change the `skill-craft` body target from 1,500-2,000 words to 200 lines.
8. Thin `mcp-server-craft` first. Then `sdk-craft`. Then `devrel-tooling`. Then `freecodecamp-style`. Then `plugin-craft`. Move inline samples into existing `references/` files. Keep one hop.

## Do not adopt

- Gerund skill names (`reviewing-prs`). This kit uses craft names.
- "Every skill is model-invoked."
- Archived 7-section plugin README as a skill rewrite job.
- Emil "You are a senior…" persona.

## First slice if you apply this

1. Fix the authoring target in `skill-craft`.
2. Add the three missing "Did this help?" closers.
3. Add sibling exclusions to craft descriptions.
4. Thin `mcp-server-craft` to the 200-line bar.

Do not rewrite all 15 bodies in one change.
