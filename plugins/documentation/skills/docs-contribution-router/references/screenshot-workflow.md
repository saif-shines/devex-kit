# Screenshot workflow

The repository includes a pre-configured VS Code extension that pastes screenshots directly into the correct asset directory with the correct import path. Use it.

## Setup (one time)

1. Open the repository in VS Code.
2. When prompted, install the recommended extensions — or install manually:
   - Extension ID: `mushan.vscode-paste-image`
   - The repository's `.vscode/extensions.json` recommends it.
3. No additional configuration needed. The repository's `.vscode/settings.json` already sets the correct paste path and import pattern.

## How it works

The extension is configured to:
- Save pasted images to `src/assets/docs/<current-file-name-without-extension>/`
- Insert the image as `![](@/assets/docs/<current-file-name>/<image-filename>)`

This means images for `src/content/docs/guides/integrations/sso-integrations/okta/index.mdx` are saved to `src/assets/docs/index/` automatically.

## Pasting a screenshot

1. Take a screenshot (on macOS: `Cmd+Shift+4`, then drag a selection).
2. Open the `.mdx` file where you want to insert the image in VS Code.
3. Press `Ctrl+Alt+V` (Windows/Linux) or `Cmd+Alt+V` (macOS) to paste.
4. The extension shows a file-path confirmation input. Confirm or edit the filename.
5. The image is saved and the markdown reference is inserted at your cursor.

## Naming images

Name screenshot files descriptively so they survive future renaming:
- Use lowercase, hyphen-separated names: `okta-sso-app-settings.png`
- Include the step context in the name: `step-1-create-app.png`, `step-3-copy-client-id.png`
- Avoid generic names like `screenshot.png` or `image1.png`

## Alt text

Always fill in the alt text. Describe what the screenshot shows, not what the reader should do:
- `![Okta application settings page showing the SSO tab](@/assets/docs/index/okta-sso-tab.png)` ✓
- `![Click SSO settings](@/assets/docs/index/okta-sso-tab.png)` ✗

## When to use screenshots vs. D2 diagrams

| Use screenshots when | Use D2 diagrams when |
|---|---|
| The reader needs to locate a specific field in a third-party admin UI | You are explaining a flow, architecture, or data path |
| The UI is complex enough that text directions would be ambiguous | The concept is structural rather than visual UI navigation |
| The exact visual state matters (e.g., toggle on vs. off) | The diagram would not change when the UI is redesigned |

D2 diagrams live in `public/d2/` as `.d2` source files and require `pnpm start` (not `pnpm dev`) for local rendering. If you only need screenshots, `pnpm dev` is fine.

## Committing screenshots

Screenshots in `src/assets/` are committed directly. There is no CDN or external image host. Keep screenshots small:
- Crop tightly to the relevant area.
- Avoid full-page screenshots unless the layout context is essential.
- PNG is fine; optimize with a tool like ImageOptim if the file is large.
