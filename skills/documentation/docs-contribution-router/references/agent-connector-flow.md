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
| `_setup-<slug>.mdx` | "Set up the connector" section |
| `_usage-<slug>.mdx` | "Code examples" section |
| `_section-<hook>-<slug>-<topic>.mdx` | A custom section at a supported page hook |

If none of these exist for a connector, the generated page still shows the tool list and authentication info — but no setup instructions or code examples.

## Adding setup instructions to a connector

1. Create `src/components/templates/agent-connectors/_setup-<slug>.mdx`.
   - `<slug>` must match the connector's provider identifier (check the existing generated page filename).
2. Add the setup steps in that file.
3. Run the sync script (see below).

The sync will discover the template, inject a `<SetupSlugSection />` component into the generated page, and regenerate `index.ts`.

## Adding code examples to a connector

Same as setup, but use `_usage-<slug>.mdx`.

## Adding a custom section

Use the filename pattern: `_section-<hook>-<slug>-<topic>.mdx`

Add `export const sectionTitle = 'Your section heading'` at the top. The sync script reads this to generate the `##` heading in the output (do not add the heading yourself inside the template body).

Supported hooks and their placement:

| Hook | Where it appears |
|---|---|
| `after-authentication` | After the Authentication section |
| `after-setup` | After the Set up the connector block |
| `after-usage` | After the Code examples block |
| `before-tool-list` | Immediately before the Tool list |
| `after-tool-list` | Immediately after the Tool list |

## Running the sync

Prerequisites:
- The connector must be published in the configured production environment. If it is not live there, the sync will not generate a page for it.
- Your local `.env` must contain the production sync credentials: `PROD_SCALEKIT_CLIENT_ID`, `PROD_SCALEKIT_CLIENT_SECRET`, `PROD_SCALEKIT_ENVIRONMENT_URL`.

Run:
```bash
pnpm run sync-agent-connectors
```

The script fetches the latest provider and tool metadata from production, regenerates all connector pages and data files, and rewrites `index.ts`.

## Review the diff before committing

Run `git diff` and look for:
- **Expected changes**: new connectors, new tools on existing connectors, metadata refreshes, your new `_setup-*` or `_usage-*` template injected correctly.
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
- Your setup, usage, or custom section appears in the generated page.
- The tool list reflects the current production state.
- No unexpected connector pages were removed.
