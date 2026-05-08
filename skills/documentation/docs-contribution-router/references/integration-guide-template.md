# Integration guide template

Integration guides document how to connect a third-party provider with a product feature (SSO, SCIM, social login, etc.). They go in `src/content/docs/guides/integrations/`.

## File location

```
src/content/docs/guides/integrations/<category>/<provider>/index.mdx
```

Categories match the existing index pages:
- `sso-integrations/` — enterprise SSO providers (Okta, Azure AD, Google Workspace, etc.)
- `social-connections/` — social login providers (Google, GitHub, etc.)
- `scim-integrations/` — SCIM directory providers

After creating the guide, add an entry to the relevant index file:
- `src/content/docs/guides/integrations/index.mdx`
- `src/content/docs/guides/integrations/<category>/index.mdx`

## Frontmatter

```yaml
---
title: 'Configure <Provider> <feature> (≤60 chars)'
description: 'Set up <Provider> as a <feature type> provider for <product>. (≤160 chars)'
sidebar:
  label: '<Provider name>'
  order: <integer>
---
```

Label rule: use just the provider name in the sidebar (e.g., "Okta", "Azure AD", "GitHub"). The category group provides the context.

## Section skeleton

```mdx
## Overview

One or two sentences: what this guide configures and what the reader gets when done.

## Prerequisites

<ul or list of requirements the reader must have before starting>
- Access to a <Provider> admin account
- A Scalekit environment with <feature> enabled
- <any other requirements>

## Configure <Provider>

<Steps>
1. ## Create an application in <Provider>

   Step content.

2. ## Copy the required values

   Step content.

3. ## Configure in Scalekit

   Step content.

4. ## Test the connection

   Step content.

</Steps>

## Required configuration values

| Value | Where to find it | Where to paste it |
|---|---|---|
| Client ID | <Provider> app settings | Scalekit dashboard |
| Client Secret | <Provider> app settings | Scalekit dashboard |
| ... | ... | ... |

## Troubleshooting

<details>
<summary>Common error: <error name or symptom></summary>

Cause and fix.

</details>

<details>
<summary>Common error: <error name or symptom></summary>

Cause and fix.

</details>

## Next steps

- Link to testing the integration
- Link to related guides or concepts
```

## Screenshots in integration guides

See `screenshot-workflow.md` for how to take and paste screenshots using the repository's VS Code extension.

Screenshot rules for integration guides:
- Include a screenshot when the step requires the reader to locate a specific field in a third-party admin UI. These UIs change; screenshots help readers orient quickly.
- Do not screenshot Scalekit's own dashboard unless the UI is especially hard to navigate — text instructions are easier to keep up to date.
- Always include `alt` text describing what the screenshot shows (not what the reader should do).
- Use the `image-zoom` plugin behavior that the repo enables by default — screenshots can be clicked to enlarge.

## Keeping integration guides up to date

Integration guides drift when provider UIs change. To reduce drift:
- Keep step descriptions at a level of abstraction that survives minor UI redesigns ("find the SSO settings" not "click the gear icon in the top-right corner").
- Use screenshots only where orientation is genuinely hard without them.
- Reference provider documentation for provider-specific configuration details rather than duplicating it.
