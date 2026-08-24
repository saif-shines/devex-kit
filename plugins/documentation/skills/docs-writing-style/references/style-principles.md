# Documentation style principles

Generic principles for developer-facing technical documentation. These apply to any docs site. Site-specific conventions (SDK variable names, component usage, code standards) live in the site's style prompt block.

## Structure

- **Sentence case** for all headings: "Configure your auth provider" not "Configure Your Auth Provider."
- **Short, descriptive page titles**: 3–7 words. Headings describe outcomes, not categories.
- **Imperative headings**: "Configure proxies" not "Configuring proxies" or "Proxy configuration."
- **Opening paragraph (story first)**: 1–3 sentences. Teach the concept the reader came for. State what they will do, when they need it, and the approach. No "In this guide" or "Welcome to."
- **Then the work**: language tabs, helpers, install extras, and constructor snippets come after the story. Language and framework tabs belong in the procedure, not the first screen.
- **One idea per paragraph**. Short paragraphs are easier to skim than long ones.
- **Topic sentences are standalone**: the first sentence of each section or paragraph should be understandable without reading what came before it.
- **Key takeaways at the top**: conclusion before reasoning, result before procedure.
- **Use bullets and tables** to structure lists of items, comparisons, and options. Never use prose to list things that would read better as a table.

## Language

- **Active voice**: "Run the command" not "The command should be run."
- **Second person**: "you" for instructions — not "the developer", "the user", or "one."
- **Present tense**: "This method returns" not "This method will return."
- **Imperative for procedures**: "Install", "Create", "Run", "Configure", "Test."
- **Front-load the action**: start sentences with the verb or key concept.
- **Short sentences**: break any sentence that requires a second read.
- **Right-branching structure**: main clause first, subordinate clause after. "Run this command before restarting" not "Before restarting, run this command."
- **Explicit noun references**: replace "this", "these", "that" with the actual noun. "This configuration" → "The timeout configuration."

## Tone

- **Direct and concise**: no hedging, no filler.
- **Neutral and professional**: no hype, no marketing copy, no excitement markers.
- **Assume competence**: write for a capable developer who is new to this particular tool or API.
- **Audience-first**: explain what matters to someone trying to get work done, not what is interesting to someone who built the feature.

## Forbidden patterns

| Pattern | Replace with |
|---|---|
| "Just", "simply", "easily" | Remove or rephrase |
| "Obviously", "clearly", "of course" | Remove |
| "We're excited to announce" | State the fact directly |
| "Click here" or "this link" | Descriptive link text |
| Passive voice in procedures | Active imperative |
| Gerund headings ("Configuring…") | Imperative ("Configure…") or noun ("Configuration") |
| Socratic build-up (context → theory → conclusion) | Conclusion first, then support |
| Two or more languages or frameworks named in the opening | Teach the concept first; put Node/Python/Go/Java and framework tabs in the procedure |
| Language/framework matrix in the opening ("X uses helper, Y does not") | Move the split into the procedure |
| Mid-page CTA ("Full reference: Express session middleware.") | Put related lookup in `seeAlso` or after the reader can complete the step |
| Sending the reader to another page to finish this page's task | Keep the task completable on this page |
| A Django / SDK / other-product link before the story exists | Story first, then links |

## Code in documentation

- Use code blocks with language identifiers for all code snippets.
- Never use screenshots of code — text blocks are searchable, copyable, and maintainable.
- Keep examples minimal and self-contained.
- Show error paths alongside success paths.
- Never hardcode secrets or API keys. Use environment variables. Add a comment explaining why.
- Expand imports only when they are not obvious; collapse with `collapse` if they are noisy.

## Callouts and asides

- `Aside type="caution"` — warns of a consequence the reader might not expect.
- `Aside type="tip"` — offers a useful shortcut or alternative.
- `Aside type="note"` — adds context that is helpful but not required.
- Always include a `title` attribute on `<Aside>`.
- Never use `<Aside>` for required steps, critical warnings that block success, or primary content. Those belong in the body.

## Links

- Descriptive anchor text: "See the authentication guide" not "click here" or "see this."
- Put related lookup in `seeAlso`, or in one sentence after the reader can complete the step. Never a standalone CTA between the instruction and the snippet.
- Backticks for code: variables, functions, endpoints, file paths, environment variables, and command-line flags.
- Relative links for internal pages.

## Abbreviations

- Expand on first use: "single sign-on (SSO)" then "SSO" thereafter.
- Do not assume readers know your product's internal acronyms or team shorthands.
