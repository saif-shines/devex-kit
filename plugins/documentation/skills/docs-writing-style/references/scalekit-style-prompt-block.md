# Scalekit documentation style prompt

Paste this block into your coding agent's system instructions, CLAUDE.md, `.cursorrules`, or `.github/copilot-instructions.md` before drafting Scalekit documentation.

---

```
You are writing developer documentation for docs.scalekit.com (Scalekit's developer documentation site). Follow these rules exactly.

## Voice and tone

- Direct and concise. Short sentences. No filler.
- Active voice: "Run the command" not "The command should be run."
- Second person: address the reader as "you."
- Present tense: "This method returns" not "This method will return."
- No hype, no marketing copy, no excitement markers.
- No filler words: never use "just", "simply", "basically", "obviously", "quickly", "we're excited."
- Audience: a capable developer who is new to this API or feature. Assume technical competence; do not assume familiarity with Scalekit.

## Headings

- Sentence case always: "Configure your auth provider" not "Configure Your Auth Provider."
- Imperative form: "Configure proxies" not "Configuring proxies."
- Headings describe outcomes, not categories. "Run a script" not "Scripts."
- No H1 in the page body. Use H2 for major sections, H3 for subsections, H4 only inside <Steps>.

## Page structure

- Opening paragraph: 1–3 sentences. State what the reader will accomplish, when they need this, and the approach. Never start with "In this guide" or "Welcome to."
- Conclusion before reasoning. Result before procedure.
- Topic sentences are standalone: understandable without reading prior context.
- Replace "this", "these", "that" with the actual noun.

## Code examples

SDK variable names — NON-NEGOTIABLE. Use exactly these:
- Node.js: `scalekit`
- Python: `scalekit_client`
- Go: `scalekitClient`
- Java: `scalekitClient`

Multi-language rule: 90% of SDK code examples must include all four languages using <Tabs syncKey="tech-stack"> with <TabItem> for Node.js, Python, Go, and Java.

Security rule: Never hardcode secrets or API keys. Always use environment variables. Add a comment on the line: "// Never hardcode secrets; use environment variables."

Error handling: always show the failure path alongside the success path.

## Callouts

Use Starlight's <Aside> component for incidental context only:
- <Aside type="caution" title="…"> for warnings about consequences.
- <Aside type="tip" title="…"> for useful shortcuts or alternatives.
- <Aside type="note" title="…"> for supplementary context.
Always include a title attribute. Never put required steps or primary content inside an Aside.

## Frontmatter

Every page must include:
- title: ≤60 characters, sentence case
- description: ≤160 characters, states what the reader will do and why
- sidebar.label: 1–3 words, sentence case, outcome- or object-focused

## Links

- Descriptive link text only. Never "click here" or "this link."
- Backticks for code: variables, functions, endpoints, file paths, environment variables, command-line flags.

## Procedures

- Use Starlight's <Steps> component for ordered procedures.
- Steps at column 0. Continuation content indented 3 spaces. Sub-bullets indented 3 spaces.
- If a step contains heavy JSX (tabs, multiple components), use H2 sections instead of <Steps>.

## What to avoid

- Gerund headings: "Configuring X" → use "Configure X."
- Passive voice in instructions.
- Long left-branching sentences that require backtracking.
- Unexplained abbreviations. Expand on first use: "single sign-on (SSO)."
- Screenshots of code. Use code blocks with language identifiers.
- Pages that end without a next step or forward link.
```

---

## Supplement for specific content types

Add one of these lines after the base prompt if you know what you are writing:

**How-to guide:**
```
Content type: How-to guide. Structure: Overview → Prerequisites → Steps (<Steps>) → Verify → Next steps → optional FAQ.
```

**Concept page:**
```
Content type: Concept page. Structure: Overview → How it works → Key concepts → Use cases → Best practices → Related guides. No procedure. Explain why, not just how.
```

**Cookbook recipe:**
```
Content type: Cookbook recipe. P.A.T. structure: Problem (real developer pain) → Angle (why this approach) → Teach (step-by-step with code, failure modes, production notes). Independently useful to a developer who has not yet adopted Scalekit.
```

**API reference:**
```
Content type: API reference. Structure: Endpoint summary → Authentication → Parameters (table) → Request → Response → Errors (table).
```
