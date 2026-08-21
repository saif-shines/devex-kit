---
name: devrel-story-craft
description: |
  Design authentic stories, recruit and run Technical Advisory Boards (TAB), avoid the 12 most common story mistakes, build dev influencer presence, and define dev-friendly packaging, pricing, and feedback loops for early-stage developer-facing products and startups. Use when working on GTM positioning, launch narratives, TAB outreach, presence strategy, or packaging for devs. Also activates for mentions of "story", "TAB", "12 most common story mistakes", "villain", "sell the category", "authenticity", "presence", "packaging", "pricing for devs", "manager deadline", "ship tonight", "launch story", or "dev gtm".
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

> For the full synthesized 12 mistakes with fixes, story canvas template, and explicit counters for rationalizations, load `references/story-framework.md`.
>
> For TAB recruitment principles, the exact 3 diagnostic questions, email templates, call structure, and synthesis process, load `references/tab-playbook.md`.
>
> For authenticity rules, 80% presence, 3 steps of advocacy, handling haters, and generating signature conversations, load `references/presence-advocacy.md`.
>
> For "magic should be free", value metric (eliminate wasted time), win-win pricing, transparency, and packaging audit checklist, load `references/packaging-pricing.md`.

## How to use this skill

1. Declare the area and mode up front: e.g. "Story Building, review this draft" or "TAB, plan recruitment for connectors and give me the 3 questions".
2. The skill will first enforce phase gates (you may not generate presence artifacts until story + TAB are validated).
3. For any output, the agent must cite the specific section or rule from the loaded references.
4. Under pressure (6pm launch, manager deadline, sunk cost on previous draft): the counters in the references are mandatory. "Talking about the solution first? Delete the draft and restart with the pain. No exceptions."

## Story Building (Review or Generate)

**Review mode:** Take the draft. Run it against every one of the 12 mistakes in `references/story-framework.md`. Flag each violation with the exact "Why bad" + quote the offending sentence. Require a villain statement. Check for evidence. Output a rewritten version only after the audit.

**Generate / Plan mode:** 
- First produce the 3-part story canvas (Pain, Villain, Victory) using the template in story-framework.md.
- Then recruit TAB using the playbook before expanding the canvas into any public copy.
- Only after TAB synthesis, produce the actual story text, landing page, or newsletter.

**Mandatory before any story leaves the room:**
- Has a named villain (the root cause, not just "it's hard").
- Sells the category first (e.g. "data integration tooling" or "auth for devs"), then your specific guide role.
- Every extraordinary claim has a traceable source (TAB quote, customer, or measurement). No invented numbers.
- The hero is always the developer. Your product is the guide.

Talking about the solution first? Delete the draft and restart with the pain. No exceptions.

## TAB (Review or Generate)

**Review mode:** Audit any recruitment email, list of questions, or synthesis notes against the 3 principles and the exact 3 diagnostic questions in `references/tab-playbook.md`. If the email leads with your product or the questions are generic ("what do you think?"), flag it as invalid.

**Generate / Plan mode:**
- Use the exact recruitment email template structure (leads with shared pain, no pitch).
- Use exactly the 3 diagnostic questions on calls.
- Perform post-call synthesis that updates the story canvas with direct quotes.
- Only after 5+ diverse TAB members have validated do you proceed to presence or launch artifacts.

If you have not run TAB calls, you have no story yet: only a hypothesis.

## Presence & Advocacy (Review or Generate)

**Review mode:** Audit posts, threads, or plans for the authenticity red flags listed in `references/presence-advocacy.md`. Check that social proof is customer-sourced, not self-claimed. Check that content delivers complete value without bait.

**Generate / Plan mode:**
- First ensure story + TAB exist and are validated.
- Plan 80% non-promotional presence (showing up in existing conversations).
- Generate signature conversations that embody the validated pain/villain/victory.
- Amplify TAB/customer voices.

## Packaging & Pricing (Review or Generate)

**Review mode:** Run the packaging against the audit checklist in `references/packaging-pricing.md`. Verify magic (the villain-killer) is free and frictionless to first success. Verify value metric is expressed in reclaimed developer time.

**Generate / Plan mode:**
- Define the exact "magic" moment that must be $0 and <5 minutes to first win.
- Tie all pricing tiers to the two types of wasted time.
- Produce the transparent packaging page text and decision tree.

## Phase Gates

Before moving between areas, verify:

**Story Building → TAB:** The story draft (or canvas) has been reviewed for all 12 mistakes, contains an explicit villain statement, sells the category, and has at least placeholder evidence slots filled from real sources. If the draft talks about features or the company as hero, return to Story Building.

**TAB → Presence:** At least 5 TAB calls with diverse personas have been completed. The story canvas has been updated with direct quotes. The recruitment email and questions used followed the templates exactly. No public presence or launch material may be generated from an unvalidated story.

**Presence → Packaging:** The presence plan only amplifies customer/TAB voices and signature conversations derived from the validated story. Packaging review confirms that the "magic" experience promised in the story is actually free and achievable in the proposed packaging.

**Any area → Done:** The output cites the specific rule or template used from the references. The user can see which mistake was avoided or which principle was followed.

## REFACTOR Hardening (pressure-specific rules added after GREEN re-tests)

When the user adds time pressure, manager authority, or "just send something tonight" language:

- The canvas is NEVER the deliverable for review. The deliverable is: (1) the canvas as internal hypothesis + (2) the exact plan + email + 3 questions for the TAB calls you will run before any external draft exists.
- You may communicate realistic timeline to the manager: "Canvas documented. TAB recruitment starting tonight. Validated story draft after calls complete (est. X days)."
- Never paraphrase the 3 questions "for flow." Use verbatim.
- Never let the recruitment email contain any hint of the product name, "we're building", or benefits of the solution.
- If the user pastes a previous bad draft and says "just review / improve this one", still run the full 12-mistake audit and require delete + restart from canvas if violations exist.
- Under any "ship tonight" pressure, the correct action is to produce the canvas + TAB plan and explicitly state that unvalidated story copy will not be produced.

All agents must cite the Rationalization Counter Table in story-framework.md when they feel the urge to shortcut.

## Quality Checklist

Before declaring the session complete for any area:

- [ ] Frontmatter matches exact devex-kit shape (license + metadata, third-person description with real trigger phrases).
- [ ] Phase/mode tables present and support both review + generate.
- [ ] All heavy content externalized to references/ with load blockquotes for story-framework.md, tab-playbook.md, presence-advocacy.md, and packaging-pricing.md.
- [ ] 12 mistakes, TAB 3 questions, "magic free", value metric, authenticity rules, etc. are synthesized actionable checklists/fixes (not pasted book text).
- [ ] Explicit counters for rationalizations ("Talking about the solution first? Delete... No exceptions.") are present and referenced in outputs. Rationalization Counter Table present in story-framework.md.
- [ ] Phase gates are stated and enforced in the response.
- [ ] Integration graph + "When to switch skills" + "Did this help?" present.
- [ ] writing-skills TDD baselines passed (RED captured in tmp/, GREEN showed compliance, REFACTOR closed loopholes with table + re-tests); agents comply under pressure and cite sections.
- [ ] No duplication with existing skills; clear complementary links to devrel-dx-craft, docs-writing-style, authoring-cookbooks, devrel-tooling.
- [ ] tile.json present and correct.

## Integration Graph

**Inbound triggers:**
- From docs-writing-style or authoring-cookbooks: "The story feels off" or "this launch narrative doesn't land with devs" → route to story audit + TAB.
- From devrel-dx-craft: First-success content reveals that the underlying story was never validated → return to story-craft.
- From any skill mentioning "launch", "positioning", "GTM", "authenticity".

**Outbound handoffs:**
- After story + TAB validated → hand off to docs-writing-style or authoring-cookbooks for the actual writing/implementation of the content.
- After packaging decisions → devrel-tooling if CLI, SDK samples, or collection generators are needed to deliver the "magic free" experience.
- Cross-link to devrel-dx-craft: A weak story undermines any first-success taxonomy you choose.

## When to switch skills

- For actual writing of the story, landing page, or newsletter copy: use `docs-writing-style` or `authoring-cookbooks`.
- For building the sample apps, recipes, or tools that deliver the "magic" in the story: use `devrel-dx-craft` then `devrel-tooling`.
- For agent plugin or skill development patterns: `plugin-craft`.
- For DX journey mapping or content taxonomy (sample apps vs recipes vs patterns): `devrel-dx-craft`.

## Did this help?

At the end of every session, ask: **"Did this solve what you were trying to do?"**

- If yes: done.
- If the story audit missed a mistake, or the TAB plan didn't use the 3 questions, or the packaging doesn't follow the value metric, or the agent still talked about the solution first under pressure: encourage the user to file an issue at **https://github.com/saif-shines/devex-kit/issues**. Offer to help draft it using their agent. Include what they were trying to do, what the skill produced, and what was missing or incorrect.

## Attribution

Synthesized from the Developer-Facing Startup Alchemist GTM playbook by Adam Frankl (Alchemist Accelerator, 2024) plus cross-referenced patterns from Developer Marketing Does Not Exist and Technical Content Strategy Decoded. See `references/story-framework.md` and sibling references for detailed provenance notes. Not a verbatim reproduction; principles and lists have been made actionable for agent use in the devex-kit format.

This skill was authored via writing-skills TDD (RED pressure baselines with subagent dispatches, GREEN minimal content fixing observed failures, REFACTOR with explicit counters, rationalization table, and re-tests).
