# Cookbook anti-patterns

## Anti-Patterns

### The Socratic Build-Up
**Pattern:** Doc explains background, context, theory, and procedure before stating the conclusion.
**Problem:** Readers who already know the background pay a reading tax. Readers who skim miss the point entirely.
**Fix:** Lead with the conclusion. Put the "what" and "why" before the "how." No preamble.

### The Noun Title
**Pattern:** Sections titled "Overview", "Results", "Usage", "Notes."
**Problem:** Forces an extra hop: reader must enter the section to understand it. Useless for skimmers.
**Fix:** Write titles as informative sentences: "OAuth reduces integration time by 80%" not "Results."

### The Context Handoff
**Pattern:** Topic sentences reference prior content: "Building on what we covered above...", "As mentioned, this enables..."
**Problem:** Meaningless to skimmers; forces linear reading. Left-branching structure holds prior context in memory.
**Fix:** Every topic sentence must be standalone. Name the subject explicitly. Cut demonstrative pronouns.

### The Expert's Shortcut
**Pattern:** Abbreviations used without expansion. Steps skip prerequisites. "Just set the env var" without explanation.
**Problem:** Costs experts nothing to include explanations; costs beginners everything to exclude them. Even expert JavaScript engineers may be beginners at Python.
**Fix:** Expand abbreviations on first use. Offer optional explanations. The expert skims past; the beginner needs them.

### The Collapsible Trap
**Pattern:** Key information (warnings, required steps, output format) hidden inside `<details>` blocks.
**Problem:** Readers who skim miss critical content. Collapsibles signal "optional": anything required must be visible.
**Fix:** Use `<details>`/`<summary>` only for genuinely optional content: background explanations, beginner primers, extended troubleshooting trees, full reference tables. Never for steps, warnings, or outputs that affect success.

### The Bad-Habits Example
**Pattern:** Code examples hardcode API keys, use deprecated methods, or demonstrate patterns that shouldn't be used in production.
**Problem:** Readers copy examples. Bad-habits examples scale badly. Teaching shortcuts teaches debt.
**Fix:** Treat code examples as normative. If it shouldn't be done in production, don't show it.
