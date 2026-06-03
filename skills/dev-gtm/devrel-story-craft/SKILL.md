---
name: devrel-story-craft
description: |
  Design authentic stories, recruit and run Technical Advisory Boards (TAB), avoid the 12 most common story mistakes, build dev influencer presence, and define dev-friendly packaging, pricing, and feedback loops for early-stage developer-facing products and startups. Use when working on GTM positioning, launch narratives, TAB outreach, presence strategy, or packaging for devs. Also activates for mentions of "story", "TAB", "12 most common story mistakes", "villain", "sell the category", "authenticity", "presence", "packaging", "pricing for devs", or "dev gtm".
license: MIT
metadata:
  author: saif-shines
  version: "1.0"
  type: assistive
  mode: lifecycle
---

# DevRel Story Craft

Design authentic stories, recruit and run TABs, avoid the 12 most common story mistakes, build presence, and define dev-friendly packaging for early-stage developer-facing startups and products. State the area (Story Building, TAB, Presence & Advocacy, Packaging & Pricing) and whether you want review/audit or help planning/generating.

| Area                  | Review / Audit                                      | Plan / Generate                                      |
|-----------------------|-----------------------------------------------------|------------------------------------------------------|
| Story Building        | Audit draft for 12 mistakes, villain rule, evidence | Build story canvas, generate TAB questions, rewrite  |
| TAB                   | Review recruitment plan or call synthesis           | Plan outreach, draft messages + 3 questions          |
| Presence & Advocacy   | Audit posts for authenticity / social proof gaps    | Plan calendar, generate signature conversations      |
| Packaging & Pricing   | Review against "magic free" + value metric rules    | Define value metric, design free tier + upsell       |

> For the full synthesized 12 mistakes with fixes, TAB call scripts, story templates, and presence rules, load `references/story-framework.md`.

## Phase Gates
Before moving between areas, verify:
**Story Building → TAB:** The story draft has been reviewed for the 12 mistakes and has a clear villain and category sell.
**TAB → Presence:** TAB validation has occurred and feedback incorporated.
**Presence → Packaging:** Presence plan aligns with the product packaging and pricing.

## Quality Checklist
Before declaring complete:
- [ ] Frontmatter matches exact devex-kit shape (license + metadata, third-person description with real trigger phrases).
- [ ] Phase/mode tables present and support both review + generate.
- [ ] All heavy content externalized to references/ with load blockquotes.
- [ ] 12 mistakes, TAB 3 questions, "magic free", etc. are synthesized actionable checklists/fixes (not pasted book text).
- [ ] Integration graph + "When to switch skills" + "Did this help?" present.
- [ ] writing-skills TDD baselines passed; agents comply under pressure.
- [ ] No duplication with existing skills; clear complementary links.
- [ ] tile.json + README updates complete.

## Did this help?
At the end of every session, ask: **"Did this solve what you were trying to do?"**
- If yes: done.
- If the story audit missed a mistake, or the TAB plan didn't use the 3 questions, or the packaging doesn't follow the value metric: encourage the user to file an issue at **https://github.com/saif-shines/devex-kit/issues**. Offer to help draft it using their agent — include: what they were trying to do, what the skill produced, and what was missing or incorrect.

## When to switch skills
- For actual writing of the story or content: use docs-writing-style or authoring-cookbooks.
- For building tools to support the DX: devrel-tooling.
- For agent plugin development: agent-plugin-development.
