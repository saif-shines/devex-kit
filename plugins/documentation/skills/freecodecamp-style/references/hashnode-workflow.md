# freeCodeCamp Hashnode Contributor Workflow

Canonical companion: freeCodeCamp Hashnode Publication Guide (Abigail Rennemeyer) and style-guide ToC/submit sections.  
Style and packaging rules: `publication-style-guide.md`.  
Integrity: `integrity-and-policy.md`.

Backend is **Hashnode** (not Ghost). Frontend `/news` is unchanged for readers.

## Account setup

1. Create a free Hashnode account at [hashnode.com](https://hashnode.com) if needed.
2. Email **username** to [editorial@freecodecamp.org](mailto:editorial@freecodecamp.org) for a publication invite.
3. After invite: notification on Hashnode profile; freeCodeCamp listed as an available publication.
4. Then drafts can be shared with the publication.

**Profile URL note:** If Hashnode username differs from old Ghost author slug, the public author URL changes. Redirects may lag — update portfolio/résumé links if needed.

## Dual-submit (required — both steps)

Review is **not** complete with only one of these:

| Step | Action |
|------|--------|
| **1. Hashnode** | Write → Publish menu → select freeCodeCamp publication → **Submit Article** / **Submit for review** |
| **2. Email** | Copy the **draft URL** (not the preview URL) → email to **editorial@freecodecamp.org** |

Why email: establishes a feedback thread for edit requests before publish. Draft URL lets editorial open the draft directly instead of hunting in the UI.

**You cannot only click Submit, and you cannot only email — both are required.**

After feedback: make updates, email that they're done; editorial final review → more edits or publish.

### Draft vs preview URL

| Use | Purpose |
|-----|---------|
| **Draft URL** | Email to editorial for review access |
| **Preview URL** | Personal QA; ToC generator input |

Never send only the preview URL as the submission email.

## Writing in Hashnode

From home: **Write**.

When drafting:

1. **Cover photo (author):** Optional. Send photo to editorial the first time if wanted on covers; reused afterward. New photo → email to update spreadsheet.
2. **Title only** — **no subtitles** for freeCodeCamp publication.
3. Write body (or paste from another editor). After paste: verify formatting, code blocks, and **re-upload images** (delete broken embeds and upload directly) so published images render reliably.

### Publish / settings menu checklist

After finishing, open **Publish** (upper right). Then:

1. Select freeCodeCamp publication ("Select a blog"). Confirm switch if prompted (page refresh).
2. Check **slug** — clear and concise (`javascript-array-tutorial`, `learn-python-by-building-projects`).
3. Create a **manual table of contents** (auto-generate ToC does **not** work for this publication). See below.
4. Add **3–5 tags** (or 1–5 as needed); first tag is primary. Math: `MathJax` last.
5. **Submit for review**, then email **draft URL** to editorial@freecodecamp.org.

## Text formatting (`/` menu)

Type `/` for the command menu. Scroll, use top buttons, or type filters (`table`, `embed`, `code`, `quote`, `image`, …).

### Table of contents

Hashnode auto-ToC is **not** used for freeCodeCamp. Two options:

#### Option A — freeCodeCamp TOC Generator (recommended)

- Tool: [freeCodeCamp Table of Contents Generator](https://toc-generator.ashutoshkrris.in/freecodecamp) (by Ashutosh / ashutoshkrris)
- Input: Hashnode **Preview URL** (three dots → Preview → copy URL from new tab)
- Modes: single-level (H2 only) or multi-level (H2 + H3)
- Generate → copy output → paste into article (typically after intro)
- Links map to post headings automatically
- Extra help: [detailed TOC generator guide](https://blog.ashutoshkrris.in/simplify-your-writing-workflow-with-table-of-contents-generator#heading-how-to-use-the-toc-generator-for-freecodecamp)

#### Option B — manual markdown ToC (outside Hashnode)

Create ToC in **another editor**, then paste into Hashnode (converts to rich text with jump links).

Steps:

1. Open article **Preview** (three dots → see preview).
2. For each heading to include, Inspect Element and copy the **heading id**.
3. Format links as:

```markdown
[Heading Text](#heading-heading-text)
```

**Critical:** The anchor **must** start with `heading-` before the dasherized title. Copying the heading id from DevTools already includes this prefix — paste after `#`.

Example shape:

```markdown
- [How to Install Node.js](#heading-how-to-install-nodejs)
- [How to Create the Project](#heading-how-to-create-the-project)
  - [Project Structure](#heading-project-structure)
```

4. Paste the finished ToC into the Hashnode draft (typically right after the introduction).

Style-guide equivalent format reminder: `[This is a Heading](#heading-this-is-a-heading)`.

### Markdown caveats in Hashnode

- Do **not** rely on full markdown **inside** the live editor for everything.
- Basic markdown often converts while typing: `##` headings, `*` / `-` lists.
- **Links and images written as markdown directly in Hashnode currently fail** — they publish as literal typed text.
- Prefer: rich-text link control (highlight text → link icon) and `/` image upload or drag-drop.
- **Paste from another editor** of full markdown (including images and links) generally works — Hashnode converts to rich text.

### Images

- Drag/drop or `/` → image → upload.
- No caption feature: use **alt text** (click image → menu → uppercase **T** → alt text).
- After paste from external tools: re-check images; re-upload if needed.
- Policy (ownership, no hotlink, size, no AI art): see `publication-style-guide.md` and `integrity-and-policy.md`.

### Tables

- Simple tables: Hashnode table builder or paste simple markdown tables.
- Complex tables (line breaks or lists inside cells): put the markdown table in a **code block** so formatting survives.

### Math equations (MathJax)

- Use **MathJax** for equations — not screenshots (accessibility / screen readers).
- Docs: [mathjax.org](https://www.mathjax.org/)
- Preview helper: [MathJax viewer](https://saxarona.github.io/mathjax-viewer/)
- Add tag **MathJax** as the **last** article tag so editorial applies formatting.

### Code blocks

- `` ``` `` + space, or `/` → Code; set language for syntax highlighting.
- Inline: single backticks.
- Live samples: embed CodeSandbox/CodePen; don't depend on in-page JS (sanitized).

### Embeds

- `/` → embeds, or `%[link]` where supported.
- Use sparingly: performance, accessibility, AMP.
- Platform list: [Hashnode embeds docs](https://support.hashnode.com/en/articles/6420731-adding-embeds-to-your-blog-post)

## End-to-end submit checklist

- [ ] Hashnode account + freeCodeCamp publication invite
- [ ] Draft under freeCodeCamp publication (confirmed switch)
- [ ] Title set; subtitle ignored/empty
- [ ] Slug short and descriptive
- [ ] Intro → body structure per style guide
- [ ] Manual ToC if long / handbook / book (generator or `#heading-…`)
- [ ] Tags 1–5; primary first; MathJax last if needed
- [ ] Code language-tagged; samples verified
- [ ] Images uploaded (not hotlinked), alt text, no AI art
- [ ] Integrity checks (citations, AI policy, promo, G-rating)
- [ ] **Submit for review** in Hashnode
- [ ] **Email draft URL** (not preview) to editorial@freecodecamp.org
- [ ] Paid placement disclosed if applicable

## Email template

```
Subject: freeCodeCamp draft for review — <headline>

Hi editorial team,

Please review this draft:
<draft-url>

Optional notes:
- First cover photo attached / already on file
- Paid placement disclosure: <yes/no + details>
- MathJax / special formatting: <if any>

Thanks,
<name> · Hashnode: <@username>
```

## After submit

1. Editorial feedback by email.
2. Author updates draft; emails when done.
3. Final review → more edits or publish.
4. Readers still see `/news` as usual.

## Source map

| Topic | Primary source in contributor materials |
|-------|----------------------------------------|
| Account + dual-submit | Hashnode Publication Guide |
| Editor settings, slug, tags | Hashnode Publication Guide + Style Guide |
| ToC generator + manual anchors | Hashnode Publication Guide (+ Style Guide ToC section) |
| Markdown/image/table/math limits | Hashnode Publication Guide |
| Writing voice, packaging, integrity | Style Guide (`publication-style-guide.md`, `integrity-and-policy.md`) |
