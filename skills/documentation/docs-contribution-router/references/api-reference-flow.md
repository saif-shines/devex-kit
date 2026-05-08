# API reference contribution flow (docs-side)

This guide covers the docs-repo side of updating the API reference. Changes to what the API reference *contains* must happen in the source repository — this guide covers only how to land a regenerated spec in the docs repo.

## How API reference docs work

API specifications are generated from the source repository and consumed by the docs repo. The docs repo does not own the spec content — it publishes what the source provides.

In Scalekit's docs repo: generated specs live under `public/api/`. The Scalar UI reads from there at build time.

**Do not hand-edit files in `public/api/`.** Any direct edits are overwritten on the next generation run.

## When to update the API reference docs

Update the docs repo when:
- A regenerated spec file (e.g., `scalekit.scalar.yaml`) is ready and provided by the source team.
- You need to reflect new endpoints, changed parameters, or removed operations in the published reference.

Do not update the docs repo if you only want to change the spec content. Make that change in the source repository first, then come back here once the spec is regenerated.

## Steps (docs-side)

1. **Receive the regenerated spec file.** You should be handed a new `scalekit.scalar.yaml` (or equivalent). Do not generate it yourself from within the docs repo.

2. **Drop the file into the correct location.** Replace the existing spec file at the expected path under `public/api/`. Do not rename the file — the Scalar component references it by the existing filename.

3. **Run the search-index script.** The API search index is separate from the page search index:
   ```bash
   pnpm generate-search-index
   ```
   This regenerates `public/search-index.json` to include the updated endpoints.

4. **Start the local dev server and verify.**
   ```bash
   pnpm start
   ```
   Use `pnpm start` (not `pnpm dev`) — `pnpm start` runs the full build including D2 diagram generation, which matches what Netlify runs.

   Check:
   - The API reference page loads without errors.
   - New or changed endpoints appear correctly.
   - Removed endpoints are gone.
   - Search results reflect the updated endpoints.

5. **Commit the updated spec file and search index.** Both `public/api/<spec-file>` and the regenerated search-index output belong in the commit.

## What not to do

- Do not commit hand-edited versions of the spec file. The next regeneration will overwrite your edits silently.
- Do not skip `pnpm generate-search-index` — the search index diverges from the published reference if not refreshed.
- Do not use `pnpm dev` for final verification; the pre-push hook runs a full build, and `pnpm dev` skips steps that can catch build errors.

## Source-side changes

If the spec change requires modifying the API behavior (new endpoint, changed parameters, deprecated operation), that work happens in the source repository. Once the source team merges and generates a new spec, follow the steps above to land it in the docs repo.
