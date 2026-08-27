---
name: mcp-server-craft
description: |
  Build MCP servers an agent can call.
  Use when designing tools, choosing stdio vs Streamable HTTP, or hardening an MCP server.
  It does not design a generic SDK (that's `sdk-craft`).
license: MIT
metadata:
  author: saif-shines
  version: "1.1"
  type: assistive
  mode: lifecycle
  sources: "awslabs/mcp DESIGN_GUIDELINES.md, modelcontextprotocol.info/docs/best-practices, mattpocock/skills writing-for-agents"
---

# MCP Server Craft

Build MCP servers an agent can call without guessing.

It does not design a generic SDK (that's `sdk-craft`).

| Phase | What you do | Key question |
|-------|-------------|-------------|
| **Design** | Tool names, schemas, descriptions, resource URIs | Can the model pick the tool and fill the fields? |
| **Build** | Project structure, transport, handlers | Does the server start and stay maintainable? |
| **Harden** | Validation, errors, auth | Does bad input fail in a way the model can fix? |
| **Test** | Unit, contract, agent workflow | Does a real agent pick the right tool? |

State the phase or the server job.

## Design

> For naming, pointer wording, schemas, URIs, and anti-patterns, load `references/tool-design.md`.

One server, one domain.

- Name tools `verb_noun`. Keep the full name at or under 64 characters.
- Write each description as a **context pointer**: what it does, what it returns, when to call it.
- Front-load the leading verb. One trigger per branch.
- State the target behaviour. Write "Provide the full absolute path."
- Constrain fields (enum, min, max, pattern). Describe how to fill each field.
- Use resources for read-only context the agent needs before a tool call.

**Done when:** every tool has a verb-noun name, a what/returns/when description, and field constraints.

## Build

> For project trees, transport choice, async handlers, and server `instructions`, load `references/build.md`.

- One entry point. Keep transport out of tool logic.
- Use **stdio** for local desktop tools. Use **Streamable HTTP** for remote or multi-tenant.
- Make every handler `async`. Gather independent work.
- Return structured JSON the model can parse.

**Done when:** the server starts on the chosen transport and every handler returns structured JSON.

## Harden

> For validation, sandboxing, auth, rate limits, and test patterns, load `references/security-and-testing.md`.

- Return recoverable errors with `isError: true` and a next step. Keep stack traces off the wire.
- Validate types, paths, URIs, and size at the boundary.
- Sandbox any code-execution tool (scan, allowlist, timeout, cleanup).
- Rate-limit tools that hit external APIs. Authenticate remote callers.

**Done when:** invalid input is rejected at the boundary and every error names a next step.

## Test

| Layer | What to prove |
|-------|----------------|
| **Unit** | Tool logic and validation, with mocks |
| **Integration** | Tool to a real test account |
| **Contract** | Name, description, and schema on every tool |
| **Agent workflow** | A real model picks the right tool and recovers from `isError` |

**Done when:** an agent workflow prompt picks the right tool and a bad call returns a usable error.

## Phase gates

**Design → Build:** Every tool has a verb-noun name ≤ 64 chars? Description is what/returns/when, front-loaded, one trigger per branch? Field text states the target? Schemas have constraints?

**Build → Harden:** Server starts on stdio or HTTP? Handlers are async? Responses are structured JSON?

**Harden → Test:** Path, URI, type, and size checks run first? Errors use `isError: true` plus a next step? External calls are rate-limited?

## Quality checklist

- [ ] Tool names follow `verb_noun`, ≤ 64 characters
- [ ] Every description says what, returns what, and when to use
- [ ] Field text states the target behaviour
- [ ] Schemas have descriptions, constraints, and defaults
- [ ] Errors use `isError: true` with a next step
- [ ] Paths and URIs are validated
- [ ] Transport is separate from handlers
- [ ] All handlers are async
- [ ] README lists every tool, resource, env var, and permission
- [ ] An agent workflow test shows the model picking the right tool

## When to switch skills

- Client library, types, or npm publish → `sdk-craft`
- CLI, completions, or Postman collection → `devrel-tooling`
- Plugin layout or the five restructure principles → `plugin-craft`

## Did this help?

At the end of every session, ask: **"Did this solve what you were trying to do?"**

- If yes: done.
- If a tool was misnamed, a description missed a trigger, or the server confused a real agent: encourage the user to file an issue at **https://github.com/saif-shines/devex-kit/issues**. Offer to help draft it. Include the phase, the tool list, and what the agent did wrong.
