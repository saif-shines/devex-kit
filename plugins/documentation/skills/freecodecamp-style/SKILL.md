---
name: freecodecamp-style
description: |
  Author, review, and package freeCodeCamp publication tutorials against the
  official Publication Style Guide and Hashnode contributor workflow.
  Use when the user asks to "write freecodecamp style", "fCC tutorial",
  "freeCodeCamp style guide", "Hashnode draft for freeCodeCamp", "review this
  for freecodecamp", "fCC headline", "submit to freeCodeCamp editorial",
  "freeCodeCamp handbook", or mentions freeCodeCamp /news publication style,
  dual-submit (Submit Article + email draft URL), or MathJax tag requirements.
version: 0.1.0
license: MIT
metadata:
  author: saif-shines
  type: assistive
  mode: lifecycle
---

# freeCodeCamp Style

Author and review tutorials for freeCodeCamp's community publication so they
match editorial expectations: substance-first depth, direct headlines, active
"you" voice, integrity (no plagiarism / no AI dump / no AI art), and the
required Hashnode dual-submit workflow.

Sources encoded here:
- [Publication Style Guide](https://www.freecodecamp.org/news/developer-news-style-guide/)
- [Hashnode Publication Guide](https://www.freecodecamp.org/news/) (contributor setup + editor)

## Phases

| Phase | What to do | Key question |
|-------|------------|--------------|
| **Capture** | Topic, depth tier (tutorial / handbook / book), audience, goals | Is substance deep enough (≥500 words unless narrow)? |
| **Package** | Headline, slug, tags, cover photo decision, ToC plan | Does the headline use a proven "How to…" form? |
| **Draft** | Intro → prerequisites → steps → dense detail → conclusion | Active "you" voice, short sentences/paragraphs, syntax-highlighted code? |
| **Integrity** | Citations, AI policy, images, G-rating, self-promo, cross-posting | Would this pass plagiarism / AI / image policy? |
| **Submit** | Dual-submit checklist (Hashnode + email draft URL) | Both Submit **and** email draft URL (not preview URL)? |
| **Review** | Rubric pass/fail against a draft | Highest-impact fail first? |

State the phase or paste the draft. Load references before inventing rules.

## Modes

| Mode | When | Output |
|------|------|--------|
| **Author** | Write or rewrite a tutorial | Draft (or rewrite) that follows packaging + style rules |
| **Review** | Audit an existing draft | PASS / FAIL / WARN lines, fails first, one top fix |
| **Submit** | Ready for editorial | Dual-submit checklist + email body template |

Default to **Author** if unclear. For Review, demand the draft (path or paste).

## Guardrails

MUST:
- Prefer depth over series: one comprehensive tutorial over multi-part posts
- Use direct headlines: "How to Build X with Y" not "Building X with Y" (same for H2/H3)
- Use second person ("you") over "we" when instructing
- Use active voice for the vast majority of sentences
- Put a clickable ToC after the intro for long tutorials, handbooks, and books
- Cite sources with link + pull-quote formatting when quoting or close-paraphrasing
- Format code samples; flag untested snippets for the human to run; fact-check non-trivial claims (do not claim samples were executed unless they were)
- Dual-submit: Hashnode "Submit for review" **and** email the **draft URL** to editorial@freecodecamp.org
- Disclose paid placement to editorial when submitting
- Keep content G-rated; respect freeCodeCamp [Code of Conduct](https://code-of-conduct.freecodecamp.org/)

MUST NOT:
- Start headlines or section headings with -ing verbs ("Building…", "Using…")
- Use subtitles (publication does not use them)
- Rely on Hashnode auto-ToC (it does not work for this publication)
- Write markdown links/images **directly** in Hashnode (compose elsewhere and paste, or use rich-text UI)
- Hotlink images; skip alt text; ship AI-generated art
- Cross-post to open sites (for example Medium) without following the limited exceptions
- Open with product promo; use affiliate links except for books/courses the author created
- Submit generative-AI articles unmodified; leave code untested
- Email only the preview URL instead of the draft URL
- Skip either half of dual-submit

## Quick rules (always on)

### Packaging
- Headlines that work: "How to fix…", "How to build…", "How to [task] with [tool]", "How [thing] works", "What is [noun]?", "The [X] Handbook" (5k–15k/20k words), "The [X] Book" (20k+)
- Slug: short, descriptive (`javascript-array-tutorial`, `learn-python-by-building-projects`)
- Tags: 1–5; first tag is primary (shows above the post on /news). Math articles: add `MathJax` as the **last** tag
- Cover image: freeCodeCamp designer creates it; optional author photo (send once, reuse)

### Structure
1. Concise intro (what they'll learn / accomplish)
2. Prerequisites
3. Logical step-by-step (numbered lists when order matters)
4. Dense detail (substance wins)
5. Concise conclusion (what they just accomplished)

### Voice and readability
- Simple language, short sentences, short paragraphs (1–2 sentences)
- Sparse punctuation drama (few `!`, avoid `;` and `…` abuse)
- H2 main topics; H3/H4 subsections; sparingly bold/italic (never both stacked for whole phrases)
- Expand obscure acronyms; replace "e.g." → "for example", "etc." → "and so on"
- Capitalize proper nouns (JavaScript, Git, CSS)
- Stay on topic

### Code and media
- Code blocks with language for syntax highlighting (```lang or `/` → Code)
- Inline code in single backticks
- Live samples via CodeSandbox/CodePen embeds if needed — no raw JS that Hashnode will sanitize
- Math: MathJax only (no equation screenshots); preview with a MathJax viewer; tag `MathJax` last
- Images: own work or no-attribution stock (Pexels, Unsplash, Wikipedia); download then upload; <1MB; informative alt text (no captions in Hashnode)

### Integrity (non-negotiable)
- No plagiarism (verbatim or close paraphrase without citation)
- AI may assist research/code; human must write, test, and fact-check
- No AI-generated art
- Self-promo: one tasteful CTA **at the end** only
- No branded/ghostwritten accounts; no writing for people without contributor accounts

> Full style rules, examples, and anti-patterns: load `references/publication-style-guide.md`
> Hashnode account, dual-submit, ToC, markdown, tables, math: load `references/hashnode-workflow.md`
> Plagiarism examples, AI policy, cross-posting, self-promo: load `references/integrity-and-policy.md`
> Review scoring checklist: load `references/review-rubric.md`

## Author mode

1. Confirm topic + depth tier (tutorial vs handbook vs book) using length guidance in the style guide reference.
2. Lock a compliant headline and draft slug before writing body prose.
3. Draft in the structure order above. Prefer "you" + active voice.
4. For long work: plan ToC entries after headings stabilize (generator or manual `#heading-…` anchors).
5. Run Integrity phase mentally: citations, images, AI, promo, G-rating.
6. Offer Submit mode checklist when the draft is ready.

When rewriting: preserve technical accuracy; fix headline form, voice, length, structure, and policy violations first.

## Review mode

1. Load `references/review-rubric.md`.
2. Score the draft; report:

```
FAIL   <criterion> — <problem> → fix: <action>
WARN   <criterion> — <borderline note>
PASS   <criterion> — <brief note if useful>
```

3. Order: FAIL first, WARN second, PASS last.
4. End with one sentence: the single highest-impact fix.
5. Do not invent freeCodeCamp rules outside the references.

## Submit mode

Agents do **not** click Hashnode or send email. Produce a dual-submit checklist for the human plus a ready-to-send email body. Load `references/hashnode-workflow.md` for full UI steps.

Checklist to output (mark each done / not done / blocked):

1. Hashnode account invited via editorial@freecodecamp.org
2. Draft in freeCodeCamp publication (not personal blog only)
3. Title set; **no subtitle**
4. Slug clear and concise
5. Manual ToC present when length warrants it
6. Tags 1–5 (MathJax last if equations)
7. Images re-uploaded (not hotlinked); alt text set
8. Human clicks **Submit for review** / Submit Article
9. Human copies **draft URL** (not preview URL)
10. Human emails draft URL to editorial@freecodecamp.org
11. Paid placement disclosed if any
12. After feedback: human updates, then emails that edits are done

**Both** Hashnode submit **and** email are required. One alone is incomplete.

Email body to hand the user (they send it):

```
Subject: freeCodeCamp draft for review — <headline>

Hi editorial team,

Draft ready for review:
<draft-url>

Notes: <paid disclosure / first cover photo / anything else>

Thanks,
<name>
```

## Phase gates

**Capture → Package:** Topic and depth tier chosen? Research enough for ≥500 words (or narrow exception justified)?

**Package → Draft:** Headline uses a proven form (no -ing start)? Slug + primary tag planned?

**Draft → Integrity:** Intro/prereqs/steps/conclusion present? Code language-tagged? ToC planned for long form?

**Integrity → Submit:** Citations OK? No AI dump / AI art / hotlinks / mid-article promo? G-rated?

**Submit:** Dual-submit both done? Draft URL emailed?

**Review:** Rubric applied with FAIL/WARN/PASS and one top fix?

## Quality checklist

- [ ] Headline is direct ("How to…") not -ing; headings match
- [ ] Substance depth appropriate; not a multi-part series split
- [ ] Active "you" voice; short sentences and paragraphs
- [ ] Tutorial structure: intro → prereqs → steps → detail → conclusion
- [ ] Code has language highlighting; samples tested
- [ ] Long posts have clickable ToC (`#heading-…` format or generator)
- [ ] Images owned/no-attribution, uploaded, alt text, no AI art
- [ ] Sources cited; no plagiarism; AI only as assistant
- [ ] Self-promo only end CTA; no Medium-style cross-post
- [ ] Dual-submit: Submit Article + email **draft** URL to editorial@freecodecamp.org
- [ ] Paid writing disclosed if applicable

## When to switch skills

| Need | Skill |
|------|--------|
| Generic product docs voice (not fCC /news) | `docs-writing-style` |
| Cookbook skimmability diagnosis | `authoring-cookbooks` |
| Docs content-type routing | `docs-contribution-router` |
| Sidebar labels | `journey-sidebar-labels` |

## Did this help?

At the end of every session, ask: **"Did this solve what you were trying to do?"**

- If yes: done.
- If a freeCodeCamp rule was missing, a review miss, or Hashnode steps were wrong: capture the gap and update this skill or its references.

State the mode/phase or paste the draft. Load the matching reference before answering edge cases.
