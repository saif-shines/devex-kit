# Cookbook states

## The States

### State AC1: Structure Void
**Symptoms:** No section titles, or generic noun titles ("Results", "Overview", "Usage"). No table of contents. Information lives in dense prose: no bullets, no tables. Paragraphs run 5+ sentences without visual breaks.

**Key Questions:**
- Can a reader find the key information within 10 seconds of landing on this page?
- Do section titles tell readers what to expect, or do they require reading what follows?
- Is there a table of contents for any doc with 4+ sections?

**Interventions:**
- Replace abstract noun titles with informative sentences: "Streaming reduces time to first token by 50%" not "Results"
- Add table of contents to multi-section docs
- Convert dense prose lists into bullets or tables
- Split paragraphs longer than 4 sentences at natural breaks
- Use `<details>`/`<summary>` collapsibles for large optional sections (troubleshooting trees, full error lists, reference tables) that would break reading flow if inline

### State AC2: Buried Takeaways
**Symptoms:** Important information appears after a long setup. Topic sentences depend on prior context ("Building on top of this, let's now talk about..."). Topic words appear at the end of topic sentences rather than the beginning. Procedure comes before conclusion.

**Key Questions:**
- Does each section lead with the conclusion or bury it?
- Can a reader understand the topic sentence without having read what came before?
- Is the topic word within the first two words of each topic sentence?

**Interventions:**
- Invert structure: put results and conclusions before procedure and reasoning
- Rewrite topic sentences to be standalone: "Vector databases speed up embeddings search" not "Embeddings search can be sped up by vector databases"
- Move topic words to sentence-start: prefer "X does Y" over "Y is done by X"
- No Socratic build-up: state the point, then support it

### State AC3: Parsing Tax
**Symptoms:** Sentences are long and left-branching: reader must hold words in memory until the end. Ambiguous sentences where the first word's role is unclear. Demonstrative pronouns ("this", "these", "that") require recalling prior text. Sentences that force the reader to backtrack.

**Key Questions:**
- Can each sentence be parsed without backtracking?
- Do sentences use demonstrative pronouns that reference prior sentences?
- Are there left-branching constructions where the main clause arrives last?

**Interventions:**
- Flip left-branching to right-branching: "To make X, you need Y" not "You need Y to make X"
- Replace "this"/"these" with the actual noun: "Building on message formatting" not "Building on this"
- Split sentences at conjunctions when they exceed ~20 words
- Write sentences parseable from word one: the first word should tell the reader whether it's noun, verb, or clause

### State AC4: Consistency Breaks
**Symptoms:** Inconsistent capitalization, naming, or formatting. Same concept named differently in different sections. Some recipes follow one pattern, others follow another. A reader encounters "that's weird" somewhere: a formatting anomaly that pulls attention away from content.

**Key Questions:**
- Are all headings in the same case style?
- Are the same concepts named consistently throughout?
- Do similar recipe types follow the same structural template?

**Interventions:**
- Define a terminology glossary and audit against it
- Pick one style (Title Case / Sentence case, Oxford comma / not) and apply universally
- Treat inconsistency as a bug: it breaks reader pattern-matching and burns credibility
- Audit high-traffic recipes first

### State AC5: Expertise Gap
**Symptoms:** Jargon used without definition. Abbreviations expanded nowhere. Steps assume knowledge (installing packages, setting environment variables) without links or explanations. No broad opening to orient new readers. Terms are insider-shorthand rather than self-evident.

**Key Questions:**
- Is every abbreviation expanded on first use?
- Are prerequisites stated explicitly?
- Is there an opening that grounds the topic for a reader new to it?

**Interventions:**
- Spell out abbreviations on first use: "retrieval-augmented generation (RAG)" not just "RAG"
- Add prerequisite sections with links
- Offer solutions to common sub-problems even if "most readers know this": experts skim past, beginners need it
- Add a 1–2 sentence broad opening: ground the narrow topic in familiar context before diving in
- Prefer self-evident terms: "input" over "prompt", "max token limit" over "context limit"
- Wrap beginner-only explanations in `<details>`/`<summary>` so experts skip without scrolling: `<details><summary>What is an API key?</summary>…</details>`

### State AC6: Fragile Examples
**Symptoms:** Code examples require installing extra libraries not introduced in the doc. Examples are not self-contained: require cross-referencing other pages or sections. Secrets or API keys appear in code. Examples demonstrate bad practices that readers will copy.

**Key Questions:**
- Can a reader copy-paste the example and run it without leaving the page?
- Does the example introduce any dependencies without explanation?
- Does the example demonstrate any practice readers should never use in production?

**Interventions:**
- Make examples self-contained: minimize external dependencies
- Never show secrets in code: use environment variable references
- Add context for any dependency that isn't a core platform dependency
- Test every code example from a clean environment
- Remember: code examples are normative. Readers copy them. Teach the right habit.

### State AC7: Priority Inversion
**Symptoms:** Rare edge cases are documented while common use cases are missing. Documentation effort is proportional to technical complexity rather than reader frequency. Readers can't find answers to the most common questions. Coverage reflects what was interesting to write, not what readers need.

**Key Questions:**
- Are the five most common reader questions answered?
- Is documentation effort proportional to how often topics are needed, not how complex they are?
- What does support or forum data say readers struggle with most?

**Interventions:**
- Audit existing recipes against actual reader questions: support tickets, forum posts, search queries
- Prioritize by reader frequency, not technical complexity
- Run `coverage-audit.ts` to map existing docs against common use cases
- Build a "most common tasks" index and verify every task has a recipe
