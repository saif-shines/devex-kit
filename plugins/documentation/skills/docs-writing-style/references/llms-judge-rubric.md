# Documentation quality rubric

Use this rubric in review mode. For each criterion, report PASS, FAIL, or WARN. Fix FAILs before merging.

---

## Rubric

### 1. Opening and orientation

| Criterion | PASS condition | Common FAIL |
|---|---|---|
| Opening paragraph exists | First 1–3 sentences state what the reader will do, when to use this, and the approach | Page opens with a heading, a code block, or context about Scalekit rather than the reader's goal |
| No "In this guide" or "Welcome to" opener | First sentence starts with the topic or the action | Starts with "In this guide, we'll show you how to…" |
| Topic sentences are standalone | Each paragraph's first sentence can be understood without reading prior content | "Building on what we covered above…" or "As mentioned…" |

### 2. Headings

| Criterion | PASS condition | Common FAIL |
|---|---|---|
| Sentence case | All headings use sentence case | Any heading with title-case capitalization |
| Imperative or noun form | Headings use "Configure X" or "X configuration" — not "Configuring X" | Gerund headings throughout |
| Outcome-oriented | Headings describe what the reader does or gets — not category labels | "Overview", "Notes", "Miscellaneous" |
| No H1 in body | Body content uses H2–H4 only | An H1 appears in the MDX body |
| H4 only inside `<Steps>` | H4 is not used outside `<Steps>` blocks | H4 appears in free-flowing sections |

### 3. Language

| Criterion | PASS condition | Common FAIL |
|---|---|---|
| Active voice | Instructions use active voice: "Run the command" | "The command should be run", "It is recommended that…" |
| Second person | Instructions address "you" | "the developer", "the user", "one should" |
| Present tense | "This method returns" | "This method will return", "You will be redirected" |
| No filler words | No "just", "simply", "easily", "obviously", "quickly" | Any of these appear |
| Short sentences | Most sentences are ≤25 words and parseable in one read | Long left-branching sentences that require backtracking |
| Explicit noun references | "This", "these", "that" replaced with actual noun | "This is important" or "These can be configured" without a clear referent |

### 4. Code examples

| Criterion | PASS condition | Common FAIL |
|---|---|---|
| All four SDK languages | Node.js, Python, Go, Java all present via `<Tabs syncKey="tech-stack">` in ≥90% of SDK examples | Single-language or two-language examples |
| SDK variable names | `scalekit` (Node.js), `scalekit_client` (Python), `scalekitClient` (Go/Java) | Any other variable names for the SDK client |
| No hardcoded secrets | Environment variables used for all credentials; comment explains why | API keys or secrets in code examples |
| Error paths shown | Examples show what happens on failure alongside the success path | Only happy-path code |
| Runnable or marked | Examples either run as-is, or are explicitly marked as illustrative pseudocode | Silent pseudocode with no marker |
| Language identifiers | Code blocks have a language tag (```bash, ```ts, ```python, etc.) | Bare ``` blocks |

### 5. Callouts and Asides

| Criterion | PASS condition | Common FAIL |
|---|---|---|
| `<Aside>` for incidental content only | `<Aside>` contains cautions, tips, or supplementary notes — not required steps or primary content | Required procedure steps, warnings that block success, or primary explanations inside `<Aside>` |
| `title` attribute present | Every `<Aside>` has `title="…"` | `<Aside>` without a title |
| Correct type attribute | Uses `type="caution"`, `type="tip"`, or `type="note"` appropriately | Wrong type used (e.g., `type="caution"` for a generic note) |

### 6. Links and references

| Criterion | PASS condition | Common FAIL |
|---|---|---|
| Descriptive link text | Links say what they point to | "click here", "this link", "this guide" |
| Code formatting for identifiers | Variables, functions, endpoints, file paths, env vars use backticks | Plain text for code identifiers |
| No dead-end pages | Every page with steps links forward to the next logical step or to related guides | Pages that end without a "next steps" or `prev`/`next` frontmatter when part of a sequence |

### 7. Frontmatter

| Criterion | PASS condition | Common FAIL |
|---|---|---|
| `title` ≤60 chars | Page title fits in 60 characters | Long title that truncates in the sidebar |
| `description` ≤160 chars | Description fits in 160 characters | Description that reads as a paragraph |
| `sidebar.label` ≤3 words | Sidebar label is 1–3 words in sentence case | Long sidebar label, or label that duplicates the full title |
| All required fields present | `title`, `description`, `sidebar.label` all exist | Any required field missing |

### 8. Content completeness

| Criterion | PASS condition | Common FAIL |
|---|---|---|
| Prerequisites stated | If steps require prior setup, prerequisites are listed explicitly | Steps that assume undocumented state |
| Abbreviations expanded | Every abbreviation expanded on first use: "SSO (single sign-on)" | Unexplained acronyms or Scalekit-internal shorthand |
| Common mistakes addressed | Likely failure modes are mentioned (even if briefly) | No indication of what can go wrong |

---

## Scoring guidance

Report in this order:
1. FAIL items — must fix before merge.
2. WARN items — should fix; flag if time-constrained.
3. PASS items — brief confirmation only; skip obvious ones.

End with: the single most impactful fix, stated in one sentence.
