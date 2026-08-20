# sindresorhus's Coding Style

**Source:** Patterns and conventions observed across @sindresorhus's popular open source work (type-fest, ky, awesome lists, macOS tools, etc.).

## What they tend to build

- Small, focused tools with a clear user benefit: HTTP clients, type utilities, CLI tools, macOS apps, and “awesome” curated lists.
- Libraries that remove friction rather than add abstraction: `ky` is a tiny Fetch-based client; `type-fest` is a collection of reusable TypeScript types; `Defaults` simplifies `UserDefaults`.
- Projects with a strong preference for curation and quality control. The “awesome” repos are opinionated lists with explicit contribution rules and spam/quality warnings.
- Utilities that are meant to be dropped into existing projects quickly, not huge frameworks.

## Coding patterns to mirror

- Optimize for small surface area and composability. Keep APIs narrow, names obvious, and defaults sensible.
- Prefer modern, idiomatic platform primitives over custom wrappers when possible:
  - Fetch API for HTTP
  - TypeScript’s type system for type utilities
  - Swift package style for macOS components
- Aim for “tiny”, “elegant”, “human-friendly”, “minimal”, and “fast” in both implementation and docs.
- Strong documentation hygiene matters: clear README, contribution rules, code of conduct, templates, and consistent formatting files (`.editorconfig`, `.gitattributes`).
- Be opinionated about quality. If a repo is a list or registry, enforce submission standards and prune low-value additions.
- Favor reusable building blocks over one-off solutions; many repos read like polished primitives meant to be composed.

## Product and UI taste

- Minimalism is a core aesthetic. The repos and descriptions repeatedly emphasize “minimal”, “pretty”, “elegant”, and “delightful”.
- User control is important, especially in utility apps: `KeyboardShortcuts` explicitly centers customizable hotkeys.
- The naming suggests a bias toward polished, approachable products rather than deeply technical ones exposed to users.
- For macOS apps and terminal tools, expect clean defaults, restrained UI, and high attention to small interaction details.

## Tech stack clues

- Heavy TypeScript/JavaScript footprint: `type-fest`, `ky`, `got`, `pageres`, `ora`, and the many npm/Node-oriented repos.
- Swift is a major second pillar for macOS/iOS tooling: `KeyboardShortcuts`, `Defaults`, `Gifski`.
- Also comfortable in Shell and CSS/Markdown for tooling, prompts, and documentation-heavy projects.
- Likely norms: ESM-first JavaScript where applicable, modern TypeScript types, Swift Package Manager for Swift libraries, and markdown-centric repo organization for curation projects.

## When to inspect repos first

- Before changing public APIs, export shapes, or type definitions; these projects are usually very deliberate about surface area.
- Before editing list-style repos, to copy exact contribution rules, ordering, formatting, and quality thresholds.
- Before adding UI behavior to macOS apps, to match their minimal interaction style and preference for customizable defaults.
- Before introducing new dependencies or abstractions; these repos tend to value restraint.
- When you need exact naming, doc tone, or formatting conventions, inspect the repo first—especially README structure, templates, and config files.

## Repo Map

- [sindresorhus/type-fest](https://github.com/sindresorhus/type-fest): A collection of essential TypeScript types (17260 stars, TypeScript, topics: typescript-definitions, typescript, types, utilities)
- [sindresorhus/ky](https://github.com/sindresorhus/ky): 🌳 Tiny & elegant JavaScript HTTP client based on the Fetch API (16961 stars, TypeScript, topics: fetch, whatwg-fetch, http-client, http-request)
- [sindresorhus/awesome](https://github.com/sindresorhus/awesome): 😎 Awesome lists about all kinds of interesting topics (480750 stars, topics: awesome, awesome-list, unicorns, lists)
- [sindresorhus/awesome-chatgpt](https://github.com/sindresorhus/awesome-chatgpt): 🤖 Awesome list for ChatGPT — an artificial intelligence chatbot developed by OpenAI (6313 stars, topics: ai, artificial-intelligence, awesome, awesome-list)
- [sindresorhus/KeyboardShortcuts](https://github.com/sindresorhus/KeyboardShortcuts): ⌨️ Add user-customizable global keyboard shortcuts (hotkeys) to your macOS app in minutes (2653 stars, Swift, topics: keyboard-shortcuts, hotkey, macos, swift-package)
- [sindresorhus/Defaults](https://github.com/sindresorhus/Defaults): 💾 Swifty and modern UserDefaults (2474 stars, Swift, topics: userdefaults, nsuserdefaults, macos, ios)
- [sindresorhus/awesome-nodejs](https://github.com/sindresorhus/awesome-nodejs): :zap: Delightful Node.js packages and resources [BECAUSE OF TOO MUCH SPAM AND LOW-QUALITY SUBMISSIONS, SUBMISSIONS ARE PAUSED UNTIL JULY] (66120 stars, topics: awesome, awesome-list, nodejs, javascript)
- [sindresorhus/awesome-electron](https://github.com/sindresorhus/awesome-electron): Useful resources for creating apps with Electron [SUBMISSIONS ARE TEMPORARILY PAUSED BECAUSE I'M TIRED OF REVIEWING LOW-QUALITY STUFF] (27202 stars, topics: awesome, awesome-list, electron, list)
- [sindresorhus/quick-look-plugins](https://github.com/sindresorhus/quick-look-plugins): List of useful Quick Look plugins for developers (18675 stars)
- [sindresorhus/got](https://github.com/sindresorhus/got): 🌐 Human-friendly and powerful HTTP request library for Node.js (14919 stars, TypeScript, topics: http-client, http-request, http, https)
- [sindresorhus/pure](https://github.com/sindresorhus/pure): Pretty, minimal and fast ZSH prompt (14331 stars, Shell, topics: shell, zsh, prompt, shell-prompt)
- [sindresorhus/pageres](https://github.com/sindresorhus/pageres): Capture website screenshots (9740 stars, TypeScript)
- [sindresorhus/ora](https://github.com/sindresorhus/ora): Elegant terminal spinner (9720 stars, JavaScript)
- [sindresorhus/github-markdown-css](https://github.com/sindresorhus/github-markdown-css): The minimal amount of CSS to replicate the GitHub Markdown style (8896 stars, CSS)
- [sindresorhus/Gifski](https://github.com/sindresorhus/Gifski): 🌈 Convert videos to high-quality GIFs on your Mac (8483 stars, Swift, topics: gifski, gif, gif-animation, video)

## How To Use This Style

- Reach for this style when the user asks for Sindre Sorhus's style, when the repo stack matches this person's ecosystem, or when studying their real code would reduce made-up output.
- Pick one or more relevant repositories from the list above based on the current task.
- Clone the most relevant repository or repositories into `/tmp` for temporary inspection.
- Study the implementation details, naming patterns, architecture, UI taste, and tooling choices there.
- Return to the main task and apply the useful patterns you observed instead of copying blindly.
- Treat the upstream repositories as reference material for style and technique, then adapt them to the current codebase responsibly.

