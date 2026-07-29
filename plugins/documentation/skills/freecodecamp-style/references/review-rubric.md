# freeCodeCamp Review Rubric

Use in **Review** mode. Report `FAIL` / `WARN` / `PASS`, fails first, then one highest-impact fix.

Load sibling references when a criterion needs detail:
- Packaging, voice, structure → `publication-style-guide.md`
- Hashnode, ToC, submit → `hashnode-workflow.md`
- Plagiarism, AI, promo → `integrity-and-policy.md`

## Scoring output format

```
FAIL   <criterion> — <problem> → fix: <action>
WARN   <criterion> — <borderline note>
PASS   <criterion> — <brief note if useful>
```

End with: **Top fix:** <one sentence>.

## Criteria

### P1 — Packaging

| ID | Criterion | FAIL if | WARN if |
|----|-----------|---------|---------|
| P1.1 | Headline form | Starts with -ing; vague clickbait without teaching promise | Weak keyword fit; slightly long |
| P1.2 | Headline family | Matches none of: How to fix/build/task+tool, How X works, What is, Handbook, Book | Handbook/Book title without matching depth |
| P1.3 | Heading -ing ban | Section titles use "Building…", "Using…", "Deploying…" as the main form | Occasional -ing where "How to" would be clearer |
| P1.4 | No subtitle | Subtitle used as required packaging | Subtitle field leftover empty noise only |
| P1.5 | Depth tier | Multi-part series instead of one comprehensive piece; or &lt;~500 words without narrow-topic justification | Borderline length for claimed handbook/book |
| P1.6 | Slug | Missing, opaque, or stuffed | Slightly long but clear |
| P1.7 | Tags | Missing; or MathJax equations without MathJax tag | Tag count outside 1–5; weak primary tag |

### P2 — Structure

| ID | Criterion | FAIL if | WARN if |
|----|-----------|---------|---------|
| P2.1 | Intro | No clear learning outcome / goal | Intro rambling before the promise |
| P2.2 | Prerequisites | Reader cannot know required knowledge/tools | Implicit prereqs mid-tutorial |
| P2.3 | Steps / flow | No logical path; unordered critical steps | Numbered list would help but prose is still followable |
| P2.4 | Detail density | Thin substance; blog-diary tone | Some sections thin relative to others |
| P2.5 | Conclusion | Stops abruptly with no recap of accomplishment | Weak recap |
| P2.6 | ToC (long form) | Handbook/book/long tutorial lacks clickable ToC | ToC present but anchors may be wrong (`#heading-` missing) |

### P3 — Voice and readability

| ID | Criterion | FAIL if | WARN if |
|----|-----------|---------|---------|
| P3.1 | Active voice | Passive dominates instructional steps | Mixed; easy rewrites left |
| P3.2 | Second person | Consistent "we" for reader actions | Occasional "we" where "you" is better |
| P3.3 | Sentence/paragraph length | Walls of text; chronic long sentences | A few long paragraphs |
| P3.4 | Formatting restraint | Heavy bold+italic stacking; punctuation spam (`!!!`, `;` / `…` abuse) | Mild over-emphasis |
| P3.5 | Clarity lexicon | Unexpanded jargon/acronyms; e.g./etc. heavy | Minor expansion misses |
| P3.6 | Proper nouns | Systematic wrong casing (javascript, git as common) | One-off slips |
| P3.7 | On-topic | Large digressions / promo digressions | Mild asides |

### P4 — Code and media

| ID | Criterion | FAIL if | WARN if |
|----|-----------|---------|---------|
| P4.1 | Syntax highlighting | Code blocks without language where language is known | Inline code inconsistent |
| P4.2 | Code quality | Untested / broken samples presented as working | Formatting messy but runnable |
| P4.3 | Live samples | Depends on in-page JS that will be sanitized | Could use embed but static code OK |
| P4.4 | Math | Equation screenshots; or MathJax without MathJax tag | MathJax unpreviewed |
| P4.5 | Images rights | Hotlinked; likely unlicensed stock; AI art | Large files (&gt;1MB) |
| P4.6 | Alt text | Missing alt on instructional images | Decorative images without alt |
| P4.7 | Embeds | Embed-heavy post harming a11y/performance | A few embeds without text equivalent |

### P5 — Integrity (blockers)

| ID | Criterion | FAIL if | WARN if |
|----|-----------|---------|---------|
| P5.1 | Plagiarism | Uncited verbatim or close paraphrase | Heavy dependence on one source without expansion |
| P5.2 | Citations | Quotes/code from docs/SO/GitHub without links/credit | Sparse attribution |
| P5.3 | Generative AI | Unmodified AI article submission indicators | AI-assisted without human testing notes on code |
| P5.4 | AI art | Any AI-generated art | — |
| P5.5 | Cross-posting | Plan to republish same piece on Medium/open web without exception | Own-blog mirror without canonical mentioned |
| P5.6 | Self-promo | Opening product pitch; spammy affiliates; ghostwriting signals | End CTA slightly long |
| P5.7 | Paid disclosure | Known paid work undisclosed | Unclear sponsorship language |
| P5.8 | G-rated / CoC | Profanity (non-quote), offensive memes, CoC issues | Edgy humor near the line |

### P6 — Submit readiness (when Review includes packaging for editorial)

| ID | Criterion | FAIL if | WARN if |
|----|-----------|---------|---------|
| P6.1 | Dual-submit plan | Author only planning one of Submit or email | Unclear draft vs preview URL |
| P6.2 | Draft URL | Preview URL treated as submission link | — |
| P6.3 | Publication target | Draft only on personal blog, not freeCodeCamp pub | — |

## Priority when many fails

1. Integrity (P5) — never ship
2. Packaging headline/depth (P1)
3. Structure (P2)
4. Code/media correctness (P4)
5. Voice polish (P3)
6. Submit mechanics (P6)

## Top-fix sentence

Pick the single change that most increases odds of editorial acceptance and reader success. Prefer integrity and headline/structure over micro comma fixes.
