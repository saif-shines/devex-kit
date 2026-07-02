# ahmadawais's Coding Style

**Source:** Patterns and conventions observed across @ahmadawais's popular open source work (CLI tools, WordPress workflows, VS Code themes, scaffolds, and terminal UX).

### What they tend to build
- Mostly **developer tooling**: CLIs, scaffolds, workflow helpers, installable commands, and terminal-first utilities.
- They like products that **reduce setup time**: “create” tools, zero-config workflows, installers, and opinionated defaults.
- Documentation is part of the product: several repos are **docs-heavy** or repo-as-handbook, not just code.
- They also ship **visual/editor experiences** when the product fits it: themes, VS Code tools, and polished command-line output.

### Coding patterns to mirror
- Favor **small executable entrypoints** with `bin` targets in `package.json` and simple root files like `index.js`.
- Use **clear, defensive CLI plumbing**:
  - `meow` for argument parsing
  - `ora` for spinners
  - `chalk`, `boxen`, `log-symbols` for readable terminal UX
  - `cli-check-node`, `cli-handle-error`, `cli-handle-unhandled` for guardrails
- Keep repos **scaffold-friendly and reproducible**:
  - `.editorconfig`
  - `.prettierrc` / `.prettierrc.json`
  - `.gitignore`
  - lint config
  - changelog, contributing, code of conduct
- Prefer **explicit packaging**:
  - `files` lists for published content
  - `keywords` and metadata that improve discoverability
  - scripts for `format`, `test`, install flows
- Structure code for **single-purpose utilities**:
  - helpers in `utils/`
  - tests as a lightweight `test.js` when the project is mostly CLI logic
- Style is generally **readable and polished**, not over-engineered; the repos lean on conventions and helper packages rather than custom abstractions.

### Product and UI taste
- Strong preference for **pleasant, branded UX**, even in terminal tools.
- Terminal output tends to be **clean, colorful, and emoji-aware** rather than purely utilitarian.
- The theme work (`shades-of-purple-vscode`) suggests they care about **bold color, visual identity, and delight**.
- For UI work, expect a bias toward **high polish and distinct personality** over minimal, neutral design.

### Tech stack clues
- Heavy **Node.js** footprint across repos.
- Common runtime/tooling patterns:
  - **JavaScript** for CLI and workflows
  - **TypeScript** in newer or more structured tools
  - **Prettier** and **ESLint**
- CLI/data stack often includes:
  - `axios`
  - `meow`
  - `ora`
  - `chalk`
  - `boxen`
  - `blessed` / `blessed-contrib`
  - `cli-table3`
  - `update-notifier`
- Broader ecosystem clues:
  - WordPress tooling (`WPGulp`, Gutenberg helpers)
  - React/Gatsby/TypeScript in `nodejs.dev`
  - Docker and GitHub Actions show up in automation-oriented repos

### When to inspect repos first
- Before changing **CLI flags, output, prompts, or error handling**.
- Before editing **packaging/installation behavior** (`bin`, `files`, publish flow, installer scripts).
- Before touching **docs or repo metadata** (`README`, changelog, contributing, keywords).
- Before modifying **formatting/lint conventions** or repo-specific config files.
- Before updating **terminal UI output** in projects using `chalk`, `boxen`, `ora`, `blessed`, or charts.
- Before working in **WordPress/Gutenberg or theme repos**, since those repos have more domain-specific scaffolding and conventions.

## Repo Map

- [ahmadawais/corona-cli](https://github.com/ahmadawais/corona-cli): 🦠 Track the Coronavirus disease (COVID-19) in the command line. Worldwide for all countries, for one country, and the US States. Fast response time (< 100ms). https://x.com/MrAhmadAwais (1831 stars, JavaScript, topics: coronavirus, corona, coronavirus-tracking, coronavirus-real-time)
- [ahmadawais/shades-of-purple-vscode](https://github.com/ahmadawais/shades-of-purple-vscode): 🦄 Shades of Purple offers a hand-picked selection of bold and vibrant shades of purple that will transform your code into a visually stunning masterpiece. With its carefully crafted color palette, this theme brings a sense of style, elegance, and whimsy to your favorite code editor, making your coding sessions a delightful journey of creativity. (781 stars, topics: vscode-theme, visual-studio, vscode, vscode-extension)
- [ahmadawais/create-node-cli](https://github.com/ahmadawais/create-node-cli): 📟 CLI to create new Node.js CLI applications in minutes not hours. (677 stars, JavaScript, topics: nodejs, cli, node-cli, create)
- [ahmadawais/Node-CLI-Tips-Tricks](https://github.com/ahmadawais/Node-CLI-Tips-Tricks): 📟  NodeCLI.com repo with Node.js CLI best practices and production-ready tips & tricks. (156 stars, JavaScript, topics: node, cli, nodejs, command-line-tool)
- [nodejs/nodejs.dev](https://github.com/nodejs/nodejs.dev): A redesign of Nodejs.org built using Gatsby.js with React.js, TypeScript, and Remark. (2286 stars, TypeScript, topics: nodejs, node, hacktoberfest, gatsbyjs)
- [CommandCodeAI/command-code](https://github.com/CommandCodeAI/command-code): Command Code AI (3449 stars, topics: ai, ai-agent, anthropic, cli)
- [ahmadawais/WPGulp](https://github.com/ahmadawais/WPGulp): An advanced Gulp workflow for WordPress development with extensive documentation. Used by 40,000+ themes and plugins. (1755 stars, JavaScript, topics: wpgulp, wordpress-plugin, wordpress-gulp-workflow, workflow)
- [ahmadawais/Emoji-Log](https://github.com/ahmadawais/Emoji-Log): Emoji-Log — An Emoji Git commit log messages spec. [  📦👌🐛📖🚀🤖 ‼️] (910 stars, JavaScript, topics: emoji-log, emoji-meaning, workflow, vscode)
- [ahmadawais/create-guten-block](https://github.com/ahmadawais/create-guten-block): 📦    A zero-configuration #0CJS developer toolkit for building WordPress Gutenberg block plugins. (770 stars, JavaScript, topics: gutenberg, gutenberg-blocks, wordpress)
- [ahmadawais/chartli](https://github.com/ahmadawais/chartli): CLI that turns plain numbers into terminal charts. ascii, spark, bars, columns, heatmap, unicode, braille, svg. (757 stars, TypeScript)
- [ahmadawais/ramadan-cli](https://github.com/ahmadawais/ramadan-cli): CLI to check Sehar and Iftar times in Ramadan anywhere in the world. (602 stars, TypeScript, topics: ramadan, cli)
- [ahmadawais/terminui](https://github.com/ahmadawais/terminui): Super fast double buffered toolkit for building terminal UIs. (522 stars, TypeScript, topics: terminal, tui, typescript)
- [ahmadawais/awesome-random-stuff](https://github.com/ahmadawais/awesome-random-stuff): A running log of interesting discoveries from the web by Ahmad Awais. (442 stars, topics: ideas, awesome, awesome-list)
- [ahmadawais/VSCode-Tips-Tricks](https://github.com/ahmadawais/VSCode-Tips-Tricks): VSCode-Tips-Tricks Examples and Workflows to help you become a Visual Studio Code Power User → (194 stars, JavaScript)
- [ahmadawais/wp-continuous-deployment](https://github.com/ahmadawais/wp-continuous-deployment): DevOps free Continuous-Deployment pipeline for WordPress plugins with GitHub Actions (166 stars, JavaScript)

## How To Use This Style

- Reach for this style when the user asks for Ahmad Awais's style, when the repo stack matches this person's ecosystem, or when studying their real code would reduce made-up output.
- Pick one or more relevant repositories from the list above based on the current task.
- Clone the most relevant repository or repositories into `/tmp` for temporary inspection.
- Study the implementation details, naming patterns, architecture, UI taste, and tooling choices there.
- Return to the main task and apply the useful patterns you observed instead of copying blindly.
- Treat the upstream repositories as reference material for style and technique, then adapt them to the current codebase responsibly.

