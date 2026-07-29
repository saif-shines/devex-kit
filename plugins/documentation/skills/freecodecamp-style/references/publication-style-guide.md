# freeCodeCamp Publication Style Guide (encoded)

Canonical source: [The freeCodeCamp Publication Style Guide](https://www.freecodecamp.org/news/developer-news-style-guide/)  
Complement: Hashnode contributor workflow in `hashnode-workflow.md`.  
Integrity details and plagiarism examples: `integrity-and-policy.md`.

## Mission of the publication

freeCodeCamp's publication helps contributors share knowledge with developers, designers, and data scientists worldwide. It is a high-traffic learning resource with strong accessibility, SEO, and social reach. Editorial coaching, editing, and promotion are real costs — substance and originality are the bar.

## Substance wins the day

- Not a home for "blog-a-day" challenges or stream-of-consciousness posts.
- Bring facts, quotes, code snippets, and data visualizations.
- Years of data: more in-depth / detailed tutorials → longer read time and more shares.
- Aim for **at least ~500 words** unless the topic is legitimately narrow and specific.
- Dive deeper via research; handbooks and books reward depth (see depth tiers below).

## Package the tutorial

### Headlines are key

Craft the headline before (or as the spine of) the body. The tutorial springs from the headline and hooks back to support it.

Deep technical tutorials perform best for the readership.

**Headline structures that work:**

| Pattern | Example shape |
|---------|----------------|
| How to fix… | How to fix CORS errors in Express |
| How to build… | How to build a REST API with FastAPI |
| How to [task] with [tool] | How to deploy a Next.js app with Docker |
| How [something] works | How the JavaScript event loop works |
| What is [noun]? | What is a monorepo? |
| The [something] Handbook | 5,000–15,000 (up to ~20,000) words |
| The [something] Book | 20,000+ words |

**Critical headline rule:** Do **not** start a headline with the *-ing* form of a verb.

| Avoid | Prefer |
|-------|--------|
| Building X with Y | How to Build X with Y |
| Using MySQL stored procedures | How to Use MySQL Stored Procedures… |

Same rule for **headings and subheadings** inside the article: "How to Do X" not "Doing X".

Include natural search keywords in the title without keyword stuffing.

### Cover image

- freeCodeCamp's designer creates all cover images for consistent brand and social engagement.
- After the title is set, design creates the cover and shares it for review before publish.
- Author photo on the cover is optional. Send a photo once if desired; it is reused. Send a new one to change it.

### Post URL (slug)

Set under Settings. Keep short and descriptive:

- `machine-learning-with-pytorch-tutorial`
- `how-to-push-to-git-remote-repository`
- `javascript-array-tutorial`
- `learn-python-by-building-projects`

### Tags

- Add **1–5 tags** under Settings → Tags.
- Type tag, hit enter when found.
- **First tag is most important** — it shows above the tutorial on /news.
- For MathJax articles, add **MathJax as the last tag** so editorial can enable formatting.

### No subtitles

freeCodeCamp's publication **does not use subtitles**. Ignore the subtitle field in Hashnode.

## Tips for tutorials people will read

### Grammar, spelling, and formatting

- **Keep it simple** — straightforward language.
- **Short sentences** — split long ones.
- **Short paragraphs** — one or two sentences; walls of text kill reading.
- **Clean punctuation** — few exclamation marks; prefer period over semicolon; ellipses are usually too much.
- **Sub-headings structure the text** — H2 for main topics; H3/H4 for sections within.
  - Markdown: `##` H2, `###` H3, etc. (or editor heading UI).
- **Don't overuse bold/italics** — never stack bold+italic on long phrases; use sparingly and separately.
- **Remove opaque abbreviations** — spell out uncommon acronyms; "e.g." → "for example"; "etc." → "and so on".
- **Proper capitalization** — JavaScript, Git, CSS, and other proper nouns.
- **Stay on topic** — finite reader time; get them in, teach, let them move on.

### Use active voice

Active voice is more casual, approachable, and authoritative. Use it whenever possible (vast majority of sentences).

| Active (prefer) | Passive (avoid when easy to fix) |
|-----------------|----------------------------------|
| You can install Node.js by following these steps. | Node.js can be installed by following these steps. |

Write like explaining to a friend: friendly, polite, logical, not overly complex.

### Syntax highlighting for code

Hashnode code blocks:

1. Type three backticks + space → pick language from dropdown for highlighting.
2. Or `/` menu → search "code".

Inline: single backticks → `code`.

For most tutorials: highlighted examples + GitHub repo link is enough. Live samples: host on CodeSandbox or CodePen and embed. **Do not include raw JavaScript in the post body** that relies on executing in-page — Hashnode sanitizes it.

### How to structure tutorials

1. **Concise introduction** — what they'll learn, goals, what they'll accomplish.
2. **Prerequisites** — knowledge, tools, setup (HTML/CSS, React hooks, VS Code, and so on).
3. **Logical walkthrough** — step-by-step, or otherwise easy to follow.
4. **Numbered lists** when order matters; or ordered subheadings.
5. **Pack detail** — substance wins.
6. **Concise conclusion** — remind what they learned and accomplished.

### Longer comprehensive tutorials instead of multi-part series

- Readers often skip part 2+ if they missed earlier parts.
- Very long, in-depth tutorials work well: bookmarks, shares, "this looks serious" → deeper reading and coding along.
- Prefer one comprehensive piece over a multi-part series.

#### Depth tiers

| Tier | Length (guide) | Character |
|------|----------------|-----------|
| **Tutorial** | Focused; often shorter | Narrow "how to do X" |
| **Handbook** | ~5,000–15,000 words (up to ~15k–20k) | Broader treatment of a larger topic |
| **Book** | Often 15,000–20,000+ | Substantial, in-depth |

Examples of focused tutorials: MySQL stored procedures; Git amend commit message.  
Examples of handbooks: JavaScript Promises guide; Front-end libraries compared.  
Example of book: learn-to-code / get a developer job longform.

For longer formats (and any long tutorial): **add a clickable table of contents** right after the introduction. See `hashnode-workflow.md` for exact ToC construction (`#heading-…` anchors). freeCodeCamp auto-ToC in Hashnode does **not** work for this publication.

### Keep it G-rated

- Community is mostly adults but includes children.
- Avoid profanity unless in a direct quote.
- Avoid potentially offensive memes.
- Content that violates the [Code of Conduct](https://code-of-conduct.freecodecamp.org/) is deleted immediately (editorial keeps a copy for the author).

### Images

- Screenshots and diagrams **you created** are fine.
- If you don't own rights: use **no-attribution-needed** images (Pexels, Unsplash, Wikipedia). No licensing fees, no required attribution text.
- **Do not hotlink images.** Download, then drag into Hashnode / upload so freeCodeCamp can serve via CDN (performance + reliability).
- Keep images **under ~1MB** when practical.
- **Informative alt text** on images that matter for understanding (screen-reader users). Hashnode has no captions — alt text is the caption substitute.
- **No AI-generated art** in the community publication. Editorial removes it (and may save a copy for the author).

### Integrity, AI, cross-posting, self-promo

See `integrity-and-policy.md` for full rules, plagiarism examples, generative AI policy, cross-posting exceptions, acceptable self-promotion, and paid-disclosure requirements. Summaries:

- Always credit sources; no plagiarism (verbatim or close paraphrase).
- AI tools may assist research/samples; do not submit unmodified AI articles; test code; fact-check.
- Prefer single-publication original posts; limited cross-post exceptions (walled gardens; own blog with canonical).
- One tasteful product CTA at the **end** only; no open spam; no ghostwriting/branded accounts.
- Dual-submit when finished: Hashnode submit + email draft URL to editorial@freecodecamp.org.

### Proof-read twice

Whatever the process (draft fast vs research-first):

1. Step away.
2. Return with fresh eyes.
3. Read again.
4. Read **out loud** — catch errors, misspellings, awkward phrases.

## Other helpful tips

### GitHub-flavored Markdown (compose outside Hashnode)

- Compose GFM elsewhere and paste into Hashnode → converts to rich text.
- In-editor: leading `##` / `*` can convert as you type for basic structure.
- **In-editor markdown links and images do not work** — use rich-text link UI or paste pre-written markdown from another editor.
- Links: highlight a few words → link icon → paste URL (no need to highlight whole sentences).
- Images: `/` → image, or drag-drop onto a new line.

### Go easy on embeds

- Tweets, YouTube, and so on via `/` embeds or `%[url]` where supported.
- Use sparingly because:
  1. External calls can slow the page.
  2. Screen-reader accessibility is weaker than text.
  3. AMP versions may not render embeds properly.

### Prefer "you" over "we"

- "Now you need to install Node.js…" beats "Now we need to install…".
- Second person feels direct and gives the reader agency.
- Exceptions exist (style guides themselves use "we"); use judgment, default to "you".

### Analytics

- After first published article, contributors can get a Google Analytics dashboard (28-day views, search by title or name).
- Email editorial if access is missing after publish.

## Contributor account

- Apply: https://forms.gle/HzY5nDLsqug1FqhS6
- High volume of applications — patience required.
- Hashnode invite flow: send username to editorial@freecodecamp.org (see `hashnode-workflow.md`).

## Editorial finishing process

When ready:

1. Submit under Hashnode settings for freeCodeCamp publication.
2. Email draft link to editorial@freecodecamp.org.

Editorial strengthens headline, opening, formatting, grammar. Further work requests come by email; re-submit after fixes.

**Paid writing:** If a company pays for the article intended for freeCodeCamp, **disclose that to editorial at submit time.**

## Attribution note for this encoding

This file reorganizes freeCodeCamp's public style guidance for agent use. When rules conflict with a newer official page, the live freeCodeCamp URL wins. Preserve every operational rule above when updating — do not "simplify away" integrity, dual-submit, headline -ing ban, ToC format, or media policy.
