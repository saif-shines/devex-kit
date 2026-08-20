# shadcn's Coding Style

**Source:** Patterns and conventions observed across @shadcn's popular open source work (primarily shadcn-ui/ui, taxonomy, and related projects).

### What they tend to build

- **Composable UI systems, not monoliths.** The flagship repo is a component library plus a distribution platform: accessible primitives, registry/build tooling, templates, and app examples.
- **Next.js-first app scaffolds.** Repos like `taxonomy`, `next-contentlayer`, `next-mdx`, and `next-cms-wordpress` show a preference for modern Next.js app-router setups, server components, and framework-native patterns.
- **Developer-facing tooling with a product angle.** `improve` is a good signal: they package workflows as reusable agent skills, with the plan/spec itself treated as the deliverable.
- **Templates meant to be copied and adapted.** README language is consistently “start here then make it your own,” which suggests shipping opinionated starting points rather than rigid frameworks.

### Coding patterns to mirror

- **Favor explicit composition over abstraction layers.** Build from small components, helper functions, and config files that can be read top-to-bottom.
- **Keep APIs narrow and copy-friendly.** Their libraries are designed to be distributed and extended, so prefer clear props, predictable defaults, and minimal hidden behavior.
- **Use repo-native conventions.** In `ui`, scripts, workspaces, and package boundaries are spelled out; in `taxonomy`, route/app structure, content, and data layers are organized by framework conventions.
- **Prefer strong typing where it helps the surface area.** TypeScript is central in the main repos, but they don’t seem to chase maximal type complexity; type the public edge, keep internals straightforward.
- **Make verification part of the work.** `improve` emphasizes exact build/test/lint commands as gates; plans and changes should be checkable with the project’s own scripts.
- **Optimize for maintainability through tooling.** Monorepo scripts, Changesets, lint/format configs, and registry build steps are first-class, not afterthoughts.

### Product and UI taste

- **Accessible by default.** `ui` explicitly calls out accessible components and Radix usage.
- **Beautiful, but practical.** The UI language is polished and modern, but not decorative for its own sake; the goal is something people can directly reuse.
- **Customizable and extendable.** They value starting points that users can bend to their needs instead of locked design systems.
- **Dark mode and responsive behavior are expected.** `taxonomy` lists both as explicit features.
- **Framework-native aesthetics.** UI tends to fit the host stack: Tailwind, Radix, Next.js app router, MDX/content workflows.

### Tech stack clues

- **TypeScript is the default.** Most notable repos are TypeScript-first.
- **Next.js is the main app framework.** Especially app router, server components, route handlers, metadata, and Next-auth patterns.
- **Radix UI + Tailwind CSS are core UI ingredients.**
- **pnpm + workspace monorepos.** `ui` uses `pnpm-workspace.yaml`, Turborepo, and package-level scripts.
- **MDX/content pipelines show up often.** `contentlayer`, `next-mdx`, and docs/blog-oriented structures recur.
- **Common supporting tools:** Prisma, NextAuth, Changesets, ESLint, Prettier, Vitest, Zod, `clsx`, `cva`, `lucide-react`.

### When to inspect repos first

- **Before changing public component APIs** in `ui`-style packages; mirror the existing prop shapes, file layout, and naming.
- **Before touching build/registry/packaging flows,** because the monorepo has custom scripts and generated artifacts.
- **Before adding app-router or server/client component code,** since the exact conventions vary by repo and some examples are archived or experimental.
- **Before working on MDX/content/auth/data layers,** because those repos combine framework features in specific ways.
- **Before writing a plan or refactor proposal,** inspect the repo’s own commands and docs first so the output matches their executable, repo-specific style.

## Repo Map

- [shadcn-ui/ui](https://github.com/shadcn-ui/ui): A set of beautifully-designed, accessible components and a code distribution platform. Works with your favorite frameworks. Open Source. Open Code. (117833 stars, TypeScript, topics: components, nextjs, radix-ui, react)
- [shadcn-ui/taxonomy](https://github.com/shadcn-ui/taxonomy): An open source application built using the new router, server components and everything new in Next.js 13. (19249 stars, TypeScript, topics: nextauthjs, nextjs, prisma, radix-ui)
- [shadcn/improve](https://github.com/shadcn/improve): Use your most capable model to audit your codebase and write plans for cheaper models to execute. (6561 stars)
- [shadcn/next-contentlayer](https://github.com/shadcn/next-contentlayer): A template with Next.js 13 app dir, Contentlayer, Tailwind CSS and dark mode. (713 stars, TypeScript, topics: contentlayer, dark-mode, mdx, nextjs)
- [shadcn/app-tailwind-v4](https://github.com/shadcn/app-tailwind-v4): shadcn/ui + tailwind v4 (221 stars, TypeScript)
- [shadcn/next-mdx](https://github.com/shadcn/next-mdx): next-mdx provides a set of helper functions for fetching and rendering local MDX files. It handles relational data, supports custom components, is TypeScript ready and really fast. (201 stars, TypeScript, topics: nextjs, nextjs-plugin, mdx, mdx-js)
- [shadcn/license-generator](https://github.com/shadcn/license-generator): Generates a license for your open source project. (169 stars, JavaScript)
- [shadcn/shadcn-electron-app](https://github.com/shadcn/shadcn-electron-app): electron-vite + shadcn/ui (158 stars, TypeScript)
- [shadcn/example-ui-themes](https://github.com/shadcn/example-ui-themes) (107 stars, TypeScript)
- [shadcn/next-template-jsx](https://github.com/shadcn/next-template-jsx): A Next.js 13 template for building apps with Radix UI and Tailiwnd CSS. (64 stars, JavaScript)
- [shadcn/tree-to-image](https://github.com/shadcn/tree-to-image): A tree to image generator using @vercel/og (56 stars, TypeScript)
- [shadcn/rico-chart](https://github.com/shadcn/rico-chart) (51 stars, TypeScript)
- [shadcn/next-cms-wordpress](https://github.com/shadcn/next-cms-wordpress): An example Next.js 13 app built from WordPress data. (45 stars, TypeScript)
- [shadcn/vite-template-v3](https://github.com/shadcn/vite-template-v3): shadcn/ui + vite + tailwind v3 template (40 stars, JavaScript)

## How To Use This Style

- Reach for this style when the user asks for shadcn's style, when the repo stack matches this person's ecosystem, or when studying their real code would reduce made-up output.
- Pick one or more relevant repositories from the list above based on the current task.
- Clone the most relevant repository or repositories into `/tmp` for temporary inspection.
- Study the implementation details, naming patterns, architecture, UI taste, and tooling choices there.
- Return to the main task and apply the useful patterns you observed instead of copying blindly.
- Treat the upstream repositories as reference material for style and technique, then adapt them to the current codebase responsibly.

