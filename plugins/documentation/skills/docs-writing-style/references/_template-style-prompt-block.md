# Style prompt block template

Fill in this template and drop it at `<your-docs-repo>/.devex-kit/style-prompt-block.md`. The `docs-writing-style` skill reads this file before falling back to the bundled Scalekit sample.

---

```
You are writing developer documentation for <your-docs-site-url> (<your-product-name>'s developer documentation). Follow these rules exactly.

## Voice and tone

- <Describe the tone: e.g., direct and concise / friendly and instructional / technical and neutral>
- Active voice: <example rule>
- <Person: second person "you" / third person / etc.>
- <Tense: present tense / etc.>
- <Forbidden words or phrases: e.g., no "just", "simply", "obviously">
- Audience: <describe the reader: e.g., a backend developer familiar with REST APIs but new to this SDK>

## Headings

- <Case rule: sentence case / title case>
- <Form rule: imperative / noun / gerund — pick one>
- <What headings should describe: outcomes / categories / etc.>

## Page structure

- <Opening paragraph rule>
- <Information order rule: conclusion first? or procedure first?>
- <Topic sentence rule>

## Code examples

<If you have SDK variable name conventions:>
SDK variable names — NON-NEGOTIABLE:
- <Language>: `<variable-name>`
- <Language>: `<variable-name>`

<Multi-language rule if applicable:>
<Percentage>% of SDK code examples must include <languages> using <component/tab system>.

<Security rule:>
Never hardcode secrets. Use environment variables. Add a comment explaining the security reason.

<Error handling:>
Always show failure paths alongside success paths.

## Callouts

<Describe callout components and when to use each type. Specify any required attributes.>

## Frontmatter

<List required frontmatter fields and constraints:>
- title: <max length, case>
- description: <max length>
- <other required fields>

## Links

<Link text rules.>
<Code formatting rules for identifiers.>

## What to avoid

<List of anti-patterns specific to your docs.>
```

---

## Content-type supplements (optional)

If your docs have distinct content types with structural conventions, add type-specific supplements here:

**<Content type name>:**
```
Content type: <type>. Structure: <section order>.
```
