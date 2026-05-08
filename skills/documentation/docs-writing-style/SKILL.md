---
name: docs-writing-style
description: Two-mode writing guide — exports a paste-ready style prompt for coding agents (handoff mode) or reviews a draft against the documentation quality rubric (review mode).
license: MIT
metadata:
  author: saif-shines
  version: "1.0"
  type: assistive
  mode: handoff+review
  maturity_score: 10
---

# Docs writing style

Two modes. Choose one per session.

| Mode | When to use | What you get |
|---|---|---|
| **Handoff** | Before writing — you want your coding agent (Claude/Cursor/Copilot) to match the existing voice | A self-contained prompt block to paste into your coding agent's system instructions |
| **Review** | After drafting — you want to check your draft's tone, structure, and style before submitting | A rubric-based diagnosis: what passes, what needs fixing, in priority order |

State your mode at the start: "handoff" or "review."

---

## Core principle

**Documentation voice is a contract with the reader.** Inconsistent tone makes docs feel untrustworthy. Consistent tone — even across many contributors — makes readers confident the information is accurate.

---

## Handoff mode

> Load `references/style-principles.md` for the full principles list.
> Load `references/scalekit-style-prompt-block.md` (or `<docs-repo>/.devex-kit/style-prompt-block.md` if the consumer has one) for the site-specific prompt block.

In handoff mode:
1. Load the style prompt block for this docs site.
2. Present it directly — the contributor pastes it into their coding agent's system instructions or project-level CLAUDE.md / `.cursorrules` / `.github/copilot-instructions.md`.
3. Optionally: if the contributor describes what they are writing (e.g., "a how-to guide for agent auth"), append a 2–3 line supplement tailoring the prompt to that content type.

The prompt block is self-contained. The contributor does not need to explain the docs site to their coding agent — the prompt does it for them.

---

## Review mode

> Load `references/style-principles.md` for the full principles list.
> Load `references/llms-judge-rubric.md` for the quality rubric.

In review mode:
1. Ask for the draft (a file path, a pasted block, or both).
2. Run the rubric against the draft.
3. Report findings in this format:

```
PASS   <criterion> — <brief note if anything to mention>
FAIL   <criterion> — <specific problem> → fix: <what to do>
WARN   <criterion> — <borderline issue worth watching>
```

4. Group by priority: fails first, warns second, passes last.
5. End with one sentence: the most impactful single fix, if any.

Do not flag style issues in code blocks. Code is reviewed separately.

---

## Key rules (quick reference)

These apply regardless of mode. Violations in review mode are always FAIL.

**Structure**
- Sentence case for all headings. No "Configure Your Auth Provider" — use "Configure your auth provider."
- Page opens with a clear one-paragraph statement: what the reader will do and why.
- Procedure steps use imperative verbs: "Install", "Run", "Configure" — not "Installing", "You should run."
- H2 for major sections; H3 for subsections; H4 only inside `<Steps>`. Never use H1 in body content.

**Language**
- Active voice: "Run the command" not "The command should be run."
- Second person: "you" for instructions, not "the developer" or "users."
- Present tense: "This method returns" not "This method will return."
- No filler: no "just", "simply", "basically", "obviously", "quickly", "we're excited."
- Expand abbreviations on first use: "single sign-on (SSO)" not just "SSO."

**Code**
- All four SDK languages (Node.js, Python, Go, Java) in `<Tabs syncKey="tech-stack">` for 90% of SDK examples.
- SDK variable names are NON-NEGOTIABLE: `scalekit` (Node.js), `scalekit_client` (Python), `scalekitClient` (Go/Java).
- No hardcoded secrets. Environment variables only. Add a comment explaining the security reason.
- Show error paths alongside the happy path.
- Examples must be runnable or explicitly marked as pseudocode.

**Asides and callouts**
- `<Aside>` is for incidental context only — cautions, tips, notes.
- Never put required steps or critical information inside an `<Aside>`.
- Use `type="caution"`, `type="tip"`, or `type="note"` with a `title` attribute.

**Links**
- Descriptive link text only. Never "click here" or "this link."
- Backticks for code identifiers, file paths, environment variables, and API endpoints.

---

## Adapt to your docs site

This skill is site-agnostic. The Scalekit-specific prompt block is in `references/scalekit-style-prompt-block.md`. To adapt:

1. Copy `references/_template-style-prompt-block.md` → `<your-docs-repo>/.devex-kit/style-prompt-block.md`.
2. Fill in your site's voice, SDK naming conventions, and code standards.
3. The skill checks for `<docs-repo>/.devex-kit/style-prompt-block.md` first; falls back to the Scalekit sample with a note that it is an example.
