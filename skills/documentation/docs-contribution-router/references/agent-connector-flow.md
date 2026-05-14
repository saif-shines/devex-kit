# Agent connector contribution flow

Agent connector documentation is partially generated. The docs repo has two layers:

1. **Generated files** — created by `pnpm run sync-agent-connectors`. Never hand-edit these.
2. **Template files** — hand-authored MDX partials that get injected into the generated pages. Edit only these.

## The hard rule

**Do not hand-edit generated files.** The sync script overwrites them. Any manual change to a generated file disappears the next time someone runs the sync.

Generated files (do not edit):
- `src/content/docs/agentkit/connectors/<provider>.mdx`
- `src/data/agent-connectors/<provider>.ts`
- `src/data/agent-connectors/catalog.ts`
- `src/components/templates/agent-connectors/index.ts`

## What you can edit

Hand-author these template files in `src/components/templates/agent-connectors/`:

| Template pattern | What it adds to the connector page |
|---|---|
| `_setup-<slug>.mdx` | Setup instructions (rendered inside a `<details>` block in the Quickstart) |
| `_quickstart-<slug>.mdx` or `.astro` | Connector-specific quickstart step (overrides the generic quickstart) |
| `_section-<hook>-<slug>-<topic>.mdx` | A custom section at a supported page hook |

If none of these exist for a connector, the generated page still shows the tool list and a generic quickstart — but no setup instructions or authored sections.

> **Deprecated:** `_usage-<slug>.mdx` is no longer supported. Common workflow content now uses the `_section-after-setup-<slug>-common-workflows.mdx` naming pattern instead.

## Adding setup instructions to a connector

1. Create `src/components/templates/agent-connectors/_setup-<slug>.mdx`.
   - `<slug>` must match the connector's provider identifier (check the existing generated page filename).
2. Add the setup steps in that file.
3. Run the sync script (see below).

The sync will discover the template, inject a `<SetupSlugSection />` component into the generated page, and regenerate `index.ts`.

If the connector requires additional admin steps beyond the initial credential setup (e.g., Google Admin DWD whitelisting), include those steps in the same `_setup-<slug>.mdx` file. Everything in this file renders inside the sync-generated setup `<details>` block, keeping the full setup flow together.

## Adding common workflows to a connector

Create `_section-after-setup-<slug>-common-workflows.mdx` with:

```mdx
export const sectionTitle = 'Common workflows'

import { Tabs, TabItem } from '@astrojs/starlight/components'

<details>
<summary>Workflow name</summary>

<Tabs syncKey="tech-stack">
  <TabItem label="Python">
    ```python
    response = scalekit_client.actions.execute_tool(...)
    ```
  </TabItem>
</Tabs>

</details>
```

The `after-setup` hook places this section after the setup block and before the tool list.

## Adding a connector-specific quickstart

By default, the sync script generates a generic quickstart step using `_quickstart-generic-oauth.astro` or `_quickstart-generic-apikey.astro`. To override with a hand-authored quickstart:

1. Create `_quickstart-<slug>.mdx` (or `.astro` if the component needs props).
2. Add the quickstart code as a `<Tabs syncKey="tech-stack">` block. Do not include client init boilerplate.
3. Run the sync script.

The connector-specific quickstart takes precedence over the generic fallback.

## Adding a custom section

Use the filename pattern: `_section-<hook>-<slug>-<topic>.mdx`

Every `_section-*` file **must** export a `sectionTitle` as its first line:

```mdx
export const sectionTitle = 'Your section heading'
```

The sync script reads this to generate a `## ` heading in the output so Starlight includes it in the table of contents. Do not add a duplicate `##` heading inside the template body.

Supported hooks and their placement:

| Hook | Where it appears | Common use |
|---|---|---|
| `after-authentication` | After the "What you can do" section | Custom auth explanation for non-OAuth connectors (DWD, service accounts) |
| `after-setup` | After the setup block | Common workflows, connected account guidance |
| `after-usage` | Backward-compatible; prefer `after-setup` | — |
| `before-tool-list` | Immediately before the Tool list | Resource ID guidance, common patterns |
| `after-tool-list` | Immediately after the Tool list | Troubleshooting, SOAP proxy docs |

### Section ordering

When multiple `_section-*` files match the same hook for a connector, they render in **alphabetical order by stem name**. Plan your filenames accordingly:

- `_section-after-setup-googledwd-admin-setup.mdx` renders before
- `_section-after-setup-googledwd-common-workflows.mdx`

because `admin-setup` sorts before `common-workflows`.

## Curating "What you can do" bullets

The sync script auto-generates capability bullets from tool names. These can produce low-quality output like "Update update" or "List list" for connectors with unusual naming patterns.

To override with curated bullets, add an entry to `src/data/agent-connectors/capabilities.json`:

```json
{
  "googledwd": [
    "**Read and search emails** — fetch messages, threads, and attachments from any Gmail label or inbox",
    "**Manage Google Drive files** — share, move, copy, and query activity on files and folders"
  ]
}
```

The sync script checks this file first; if a key exists for the provider slug, it uses the curated bullets instead of auto-generating.

## Handling non-OAuth connectors

For connectors that use non-standard auth types (Service Account with DWD, API Key with special setup, etc.), the sync script's auto-generated auth prose may not be accurate. Create a custom auth section:

1. Create `_section-after-authentication-<slug>-auth.mdx`.
2. Export a `sectionTitle`:
   ```mdx
   export const sectionTitle = 'Authentication'
   ```
3. Write the auth explanation below.

The `after-authentication` hook places this after the "What you can do" bullets.

## Orphan protection

When a provider is removed from the API, the sync script deletes the generated `.mdx` page — **unless** the connector has matching template files (`_setup-*`, `_section-*`, or `_quickstart-*`). Template files signal that the page has hand-authored content and should survive sync runs even when the API no longer returns the provider.

This means: if you create a template file for a connector before the connector is published to production, the hand-authored page will not be deleted when someone runs sync.

## Build contract — all three pieces must exist together

When a connector page references a template component, three things must be in sync:

1. The template `.mdx` file exists in `src/components/templates/agent-connectors/`
2. `index.ts` exports the component (done automatically by sync, or manually)
3. The connector page imports and uses the component

If any piece is missing, the build fails with a `Could not resolve` error. When adding templates without running sync (e.g., the connector is not live in production yet), ensure all three exist before pushing.

## Running the sync

Prerequisites:
- The connector must be published in the configured production environment. If it is not live there, the sync will not generate a page for it (but existing pages with template files are preserved).
- Your local `.env` must contain the production sync credentials: `PROD_SCALEKIT_CLIENT_ID`, `PROD_SCALEKIT_CLIENT_SECRET`, `PROD_SCALEKIT_ENVIRONMENT_URL`.

Run:
```bash
pnpm run sync-agent-connectors
```

The script fetches the latest provider and tool metadata from production, regenerates all connector pages and data files, and rewrites `index.ts`.

## Review the diff before committing

Run `git diff` and look for:
- **Expected changes**: new connectors, new tools on existing connectors, metadata refreshes, your new `_setup-*` or `_section-*` template injected correctly.
- **Stop and investigate**: a connector page disappears, a connector loses tools, many pages change unexpectedly, large unexplained removals.

If unexpected removals appear, confirm with the internal team before committing.

## Slug matching

The sync script matches templates to providers by slug. It tries three forms in order:
1. Exact match (e.g., `google_ads` → `_setup-google_ads.mdx`)
2. Underscore-to-hyphen (e.g., `google_ads` → `_setup-google-ads.mdx`)
3. Underscore-removal (e.g., `google_calendar` → `_setup-googlecalendar.mdx`)

If your setup section is not appearing after the sync, run the sync again and check the warnings for slug-mismatch errors.

## Verifying the output

After the sync, confirm:
- The expected connector page exists under `src/content/docs/agentkit/connectors/`.
- Your setup or custom section appears in the generated page.
- Custom sections use the `export const sectionTitle` convention and the heading renders in the table of contents.
- The tool list reflects the current production state.
- No unexpected connector pages were removed.
- Curated capability bullets from `capabilities.json` appear instead of auto-generated ones (if you added an override).
