---
name: code-style-patterns
description: |
  Curated code style patterns, idioms, and conventions drawn from popular GitHub developers and respected open source contributors (starting with shadcn, sindresorhus, and ahmadawais). Use this when you want to apply real-world community-proven patterns (e.g. "shadcn style", "write like shadcn", "shadcn/ui patterns", "sindresorhus style", "Sindre Sorhus patterns", "tiny elegant utilities", "ahmadawais style", "Ahmad Awais CLI patterns", "WordPress CLI workflows"), author or maintain collections of such styles, get before/after examples, or decide when a popular pattern is appropriate. Also activates for mentions of "patterns from popular github users", "community code styles", "hero patterns", "open source style guides", "authoring code styles", "shadcn", "sindresorhus", "ahmadawais", or specific developer names + style.
license: MIT
metadata:
  author: saif-shines
  version: "1.0"
  type: assistive
  mode: directive
---

# Code Style Patterns from Popular GitHub Developers

Apply real coding styles and conventions from well-known open source developers instead of generic advice. Start with shadcn (author of shadcn/ui), sindresorhus (type-fest, ky, awesome lists), ahmadawais (CLI tools, WordPress workflows), and expand over time.

State the developer/style you want to follow (e.g. "shadcn style for my Next.js component", "sindresorhus style for this utility", or "ahmadawais CLI patterns") or describe the task + target style.

> For detailed patterns, repo maps, tech stack clues, and usage instructions for a specific developer, load the matching reference file.

## Modes

| Mode              | What you get                                                                 | Load |
|-------------------|------------------------------------------------------------------------------|------|
| shadcn            | Full guide to shadcn's coding patterns, UI taste, Next.js/app-router conventions, component design, tooling, and repo examples. Includes "when to inspect repos" checklist and responsible application guidance. | `references/shadcn.md` |
| sindresorhus      | Full guide to sindresorhus's style: tiny elegant utilities, TypeScript types, HTTP clients, awesome lists curation, macOS Swift tools, minimalism, and strong documentation hygiene. | `references/sindresorhus.md` |
| ahmadawais        | Full guide to ahmadawais's style: developer tooling CLIs, scaffolds, zero-config workflows, terminal UX with chalk/ora/boxen, WordPress/Gutenberg tools, VS Code themes, and polished CLI experiences. | `references/ahmadawais.md` |
| By developer      | Patterns attributed to a specific popular GitHub user (add more via new references) | `references/<developer>.md` |
| By domain         | React, testing, API design, state management, UI systems, utilities, types, CLI tooling, WordPress, etc. | Relevant reference(s) |
| Apply to my code  | Take current code and refactor/adapt toward the target style                 | Load target reference + current code |
| Author / curate   | Help structure or improve a new style pattern for inclusion in the kit       | Discuss + propose reference addition |

## shadcn Style

> **Always load `references/shadcn.md`** when the user asks for shadcn's style, shadcn/ui patterns, or when the task involves component libraries, Next.js app router + server components, Radix + Tailwind, accessible UI, or monorepo + registry tooling that matches their ecosystem.

Key principles from the reference (internalize these):

- Favor explicit composition over heavy abstraction layers.
- Keep APIs narrow, copy-friendly, and predictable.
- Use repo-native conventions and framework-native patterns.
- Strong (but not over-engineered) TypeScript on public surfaces.
- Make verification (build/test/lint commands) part of the work.
- Beautiful but practical, accessible by default, customizable starting points.
- Default stack clues: TypeScript, Next.js (app router), Radix UI + Tailwind, pnpm workspaces, MDX pipelines, Changesets, etc.

Follow the "How To Use This Style" section in the reference when applying:
- Identify relevant repos from the map.
- Inspect them (clone to /tmp when deeper fidelity is needed).
- Adapt patterns responsibly instead of blind copying.
- Return to the user's codebase and produce output that feels like it came from that style.

## sindresorhus Style

> **Always load `references/sindresorhus.md`** when the user asks for sindresorhus's style, Sindre Sorhus patterns, tiny utilities, type definitions, HTTP clients, awesome lists, or macOS Swift tools.

Key principles from the reference (internalize these):

- Optimize for small surface area and composability. Keep APIs narrow, names obvious, and defaults sensible.
- Prefer modern, idiomatic platform primitives (Fetch API, TypeScript’s type system, Swift) over custom wrappers.
- Aim for “tiny”, “elegant”, “human-friendly”, “minimal”, and “fast” in both code and docs.
- Strong documentation hygiene: clear READMEs, contribution rules, templates, consistent formatting.
- Be opinionated about quality: enforce standards especially in list/curated projects.
- Favor reusable building blocks and polished primitives meant to be composed.

Follow the "How To Use This Style" section in the reference when applying:
- Identify relevant repos from the map (type-fest, ky, awesome, KeyboardShortcuts, etc.).
- Inspect them (clone to /tmp when deeper fidelity is needed).
- Adapt patterns responsibly instead of blind copying.
- Return to the user's codebase and produce output that feels like it came from that style.

## ahmadawais Style

> **Always load `references/ahmadawais.md`** when the user asks for ahmadawais's style, Ahmad Awais patterns, or when the task involves CLI tools, Node.js scaffolds, WordPress/Gutenberg workflows, terminal UIs, VS Code themes, or developer tooling with strong branding and documentation.

Key principles from the reference (internalize these):

- Favor small executable entrypoints with `bin` targets in package.json and simple root files.
- Use clear, defensive CLI plumbing: meow for args, ora for spinners, chalk/boxen/log-symbols for UX, cli-* helpers for guardrails.
- Keep repos scaffold-friendly and reproducible with standard configs (.editorconfig, Prettier, ESLint, .gitignore, contributing docs).
- Prefer explicit packaging: files lists, good keywords/metadata, scripts for format/test/install.
- Structure for single-purpose utilities (helpers in utils/, lightweight tests).
- Strong preference for pleasant, branded, colorful terminal UX with emojis and high polish.

Follow the "How To Use This Style" section in the reference when applying:
- Identify relevant repos from the map (create-node-cli, WPGulp, shades-of-purple-vscode, Emoji-Log, etc.).
- Inspect them (clone to /tmp when deeper fidelity is needed).
- Adapt patterns responsibly instead of blind copying.
- Return to the user's codebase and produce output that feels like it came from that style.

## Adding New Styles

To add patterns from another popular GitHub developer:
1. Create `references/<developer-kebab>.md` following the existing structure (what they build, coding patterns, product taste, tech stack, repo map, how to use).
2. Update this SKILL.md with a new row in the Modes table and a dedicated section.
3. Update the frontmatter description with trigger phrases.
4. Add an entry to the router in `ask-devex` (separate change).

## Golden Rules

- Always attribute the style clearly ("following sindresorhus patterns from type-fest...", "shadcn/ui conventions...", "ahmadawais CLI patterns from create-node-cli...").
- Prefer inspecting the real repos over hallucinating details.
- Adapt: do not copy-paste entire files or structures unless the task explicitly asks for a template.
- When the user's stack differs, translate the spirit of the patterns rather than forcing the exact stack.

## Quality Checklist

- [ ] The correct reference(s) were loaded before giving detailed advice
- [ ] Attribution is explicit (developer + key repos)
- [ ] "When to inspect the actual repos" guidance was considered
- [ ] Before/after or example translations are provided when refactoring
- [ ] "When this pattern shines" vs "when to avoid" considerations are present
- [ ] Output respects the user's existing codebase constraints
- [ ] Ends by asking whether this solved what they were trying to do

## Did this help?

At the end of every session, ask: **"Did this solve what you were trying to do?"**

- If yes: done.
- If attribution was weak, a pattern felt made-up, inspection steps were skipped when they would have helped, or the output didn't feel authentic to the requested style: encourage filing an issue at https://github.com/saif-shines/devex-kit/issues. Include what the user asked for and what felt off.

