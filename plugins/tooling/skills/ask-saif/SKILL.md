---
name: ask-saif
description: Ask which kit skill or flow fits the situation. A router over the skills in this kit.
disable-model-invocation: true
license: MIT
metadata:
  author: saif-shines
  version: "1.3"
  type: router
  mode: directive
---

# Ask Saif

Name the next kit skill. Stop.

A **flow** is a path through the skills. Docs, tooling, and GTM each have a path. The rest is standalone.

The human starts `/ask-saif`. This skill names. It does not start the named skill. It does not do the work.

**Done when:** the human has one skill name and one line to type.

## Docs: place, then write

The path most docs work travels.

1. **`/docs-contribution-router`** names the content type and the file path. Start here when something must land on a docs site.
2. **`/docs-writing-style`** for voice. Handoff before a draft. Review after a draft.
3. **`/authoring-cookbooks`** when the page is a cookbook or recipe and the structure is the problem, not the voice.
4. **`/journey-sidebar-labels`** when the work is nav labels or section order.

A freeCodeCamp `/news` tutorial is off this path. That is **`/freecodecamp-style`**.

## Tooling: pick the artifact

These do not replace each other.

- Client library, types, or npm publish → **`/sdk-craft`**
- CLI, completions, or a Postman collection from routes → **`/devrel-tooling`**
- MCP server, tool schemas, or stdio vs Streamable HTTP → **`/mcp-server-craft`**

An SDK is not a CLI. An MCP server is not an SDK.

## GTM: story first, then first success

1. **`/devrel-story-craft`** when the story, TAB, or packaging is not settled.
2. **`/devrel-dx-craft`** for the first-success path and sample vs recipe vs pattern.
3. Hand the artifact to a docs skill or a tooling skill to write or build it.

Skip step 1 only when the story is already validated.

## Author the kit

- Write or improve a kit skill → **`/skill-craft`**. The human starts this.
- Restructure a plugin, add agents, or empty `commands/` → **`/plugin-craft`**.

`skill-craft` writes `SKILL.md`. `plugin-craft` lays out the plugin.

## Standalone

Off every flow.

- Community code style (shadcn, sindresorhus, ahmadawais) → **`/code-style-patterns`**
- 80/20 fp-ts, or whether FP helps the code → **`/pragmatic-fp`**

## How to answer

1. Match the situation to one flow or one standalone skill.
2. Name the next skill as `/name`.
3. Give one ready-to-type line.
4. If two skills apply, give the order. Then stop.

**Done when:** the human can type the next command without guessing.

## Did this help?

At the end of every routing session, ask: **"Did this solve what you were trying to do?"**

- If yes: done.
- If the flow was wrong or a skill was missing: file an issue at **https://github.com/saif-shines/devex-kit/issues**. Include the situation, the name this router gave, and what was missing.
