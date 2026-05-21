---
name: mcp-server-craft
description: |
  Build MCP servers that AI agents actually want to use. Covers the full lifecycle — tool design (naming, schemas, descriptions), resource design (URIs, templates, subscriptions), project structure, transport selection (stdio vs Streamable HTTP), security, error handling, and testing. Use this skill when building a new MCP server, adding tools or resources to an existing one, reviewing an MCP server for quality, choosing between stdio and HTTP transport, designing tool schemas for LLM consumption, or hardening an MCP server for production. Also activates for questions about tool naming conventions, Pydantic Field descriptions, Zod validation for MCP, resource URI schemes, or MCP server security patterns.
license: MIT
metadata:
  author: saif-shines
  version: "1.0"
  type: assistive
  mode: lifecycle
  sources:
    - https://github.com/awslabs/mcp/blob/main/DESIGN_GUIDELINES.md
    - https://modelcontextprotocol.info/docs/best-practices/
---

# MCP Server Craft

Build MCP servers that LLMs and AI agents can use reliably. A good MCP server makes the agent feel competent — clear tool names, helpful descriptions, structured errors, and predictable behavior.

This skill covers the full lifecycle:

| Phase | What you do | Key question |
|-------|-------------|-------------|
| **Design** | Tool names, schemas, descriptions, resource URIs | Can the LLM understand what to call and why? |
| **Build** | Project structure, transport, implementation | Is the server clean and maintainable? |
| **Harden** | Security, error handling, validation | Can the server handle malicious or unexpected input? |
| **Test** | Functional, integration, agent workflow tests | Does it work when a real agent calls it? |

State which phase you need, or describe what you're building.

---

## Design phase

> For expanded tool and resource design patterns with examples, load `references/tool-design.md`.

The most important thing about an MCP server is whether the LLM can figure out how to use it. Tool names, descriptions, and schemas are your API — the LLM reads them to decide what to call and how.

### Tool naming

Names should be verbs that tell the model exactly what happens:

| Pattern | Examples | Why it works |
|---------|----------|-------------|
| `verb_noun` | `read_file`, `search_issues`, `create_bucket` | Action is clear, noun scopes it |
| `get_status` | `get_build_status`, `get_user_profile` | Read-only intent is obvious |
| `list_*` | `list_repositories`, `list_connections` | Signals pagination/collection |

Rules:
- **snake_case** preferred (aligns with MCP reference implementations)
- Maximum **64 characters** for the fully qualified name
- Start with a letter; only alphanumeric, `_`, or `-`
- Be consistent within a server — don't mix `snake_case` and `kebab-case`
- Verb-noun pattern: `search_code` not `code_search`

### Tool descriptions

Descriptions are documentation the LLM reads at inference time. They directly affect whether the agent picks the right tool.

```
Good: "Search for code across repositories using a text query.
       Returns matching file paths and line numbers.
       Use this when the user wants to find where something is defined or used."

Bad:  "Code search functionality."
```

Include in every description:
- **What** the tool does (one sentence)
- **What** it returns (shape and content)
- **When** to use it (helps the LLM choose between similar tools)

### Tool schemas

Define input schemas with rich metadata. The LLM reads field descriptions to fill in parameters correctly.

**TypeScript (Zod):**

```typescript
server.tool("search_issues", "Search for issues by query text, label, or status.",
  {
    query: z.string().describe("Search text to match against issue title and body"),
    status: z.enum(["open", "closed", "all"]).default("open")
      .describe("Filter by issue status. Default: open"),
    limit: z.number().min(1).max(100).default(20)
      .describe("Maximum results to return. Default: 20"),
  },
  async ({ query, status, limit }) => { /* ... */ }
);
```

**Python (Pydantic Field):**

```python
@mcp.tool()
async def search_issues(
    query: str = Field(..., description="Search text to match against issue title and body"),
    status: Literal["open", "closed", "all"] = Field("open", description="Filter by issue status"),
    limit: int = Field(20, ge=1, le=100, description="Maximum results to return"),
) -> list[Issue]:
    """Search for issues by query text, label, or status.
    Returns matching issues with title, body preview, and metadata."""
    ...
```

Key patterns:
- Use `Field(...)` (required) vs `Field(default)` (optional) — never leave ambiguous
- Add constraints (`ge`, `le`, `min`, `max`, `Literal`, `enum`) so the LLM knows valid ranges
- Write descriptions that guide the model, not just document the type
- For critical parameters, include explicit instructions: `"IMPORTANT: Provide the full absolute path, not relative"`

### Resource design

Resources expose read-only data via URIs. Use them for context the agent needs *before* picking a tool.

```
resource://connections          → List available service connections
resource://schema/users         → Database schema for users table
file:///workspace/config.yaml   → Project configuration
```

Rules:
- Clear, descriptive URI schemes — custom schemes are fine (`postgres://`, `jira://`)
- Set MIME types when known (`application/json`, `text/markdown`)
- Use **resource templates** (RFC 6570) for parameterized content: `resource://schema/{table_name}`
- Use **subscriptions** for frequently changing resources
- Consider pagination for large resource lists

### Single responsibility

Each MCP server should do one thing well. Don't build a mega-server that combines database access, file operations, and API calls.

| Approach | Example | Result |
|----------|---------|--------|
| **Good** | Dedicated `github-mcp-server` | Agent learns one domain, tools don't collide |
| **Bad** | `everything-mcp-server` with 50 tools | Agent confused by tool overlap, hard to maintain |

---

## Build phase

### Project structure

**TypeScript:**

```
mcp-server-myservice/
├── src/
│   ├── index.ts              # Entry point, transport setup
│   ├── server.ts             # MCP server, tool/resource registration
│   ├── tools/                # Tool implementations
│   │   ├── search.ts
│   │   └── create.ts
│   ├── resources/            # Resource implementations
│   │   └── schema.ts
│   ├── types.ts              # Shared types
│   └── utils/                # Helpers (http client, validation)
├── tests/
├── package.json
├── tsconfig.json
└── README.md
```

**Python:**

```
mcp-server-myservice/
├── src/
│   └── myservice_mcp/
│       ├── __init__.py       # __version__
│       ├── server.py         # MCP server, main() entry point
│       ├── models.py         # Pydantic models
│       ├── consts.py         # Constants (UPPER_SNAKE_CASE)
│       └── tools/            # Tool implementations
├── tests/
├── pyproject.toml
└── README.md
```

Key rules:
- **Single entry point** — one `main()` that creates the server and starts transport
- **Separate transport from logic** — keep tool/resource handlers independent so you can plug in stdio or HTTP
- **Models in their own file** — Pydantic models or TypeScript types separate from server logic

### Transport selection

| Transport | When to use | Client examples |
|-----------|------------|-----------------|
| **stdio** | Local tools, desktop clients | Claude Desktop, local dev |
| **Streamable HTTP** | Remote access, cloud deployment | Cursor, cloud agents, multi-tenant |
| **HTTP/SSE (legacy)** | Backward compatibility only | Older MCP clients |

Prefer Streamable HTTP for anything deployed. Use stdio for local-only tools. Support both by keeping server logic transport-agnostic.

### All operations are async

Every tool and resource handler should be `async`. Use concurrency for independent operations:

```python
# Good: concurrent fetches
results = await asyncio.gather(
    fetch_issues(repo_a),
    fetch_issues(repo_b),
    fetch_issues(repo_c),
)

# Bad: sequential when independent
result_a = await fetch_issues(repo_a)
result_b = await fetch_issues(repo_b)
result_c = await fetch_issues(repo_c)
```

---

## Harden phase

> For expanded security patterns, input validation, sandboxing, and testing strategies, load `references/security-and-testing.md`.

### Error handling

Return errors inside tool results so the LLM can react — don't throw protocol-level exceptions that crash the conversation.

```typescript
// Good: structured error the LLM can interpret
return {
  content: [{ type: "text", text: JSON.stringify({
    error: "Repository not found",
    suggestion: "Check the repository name. Use list_repositories to see available repos."
  })}],
  isError: true,
};

// Bad: raw exception that kills the tool call
throw new Error("ENOENT");
```

Error handling rules:
- Use `isError: true` in results for recoverable errors
- Include what happened, why, and a suggestion for the LLM's next step
- Log errors server-side with context (tool name, parameters, timestamp)
- Never leak internal stack traces, secrets, or infrastructure details to the client

### Input validation

Validate everything at the boundary. The LLM generates parameters — they will be wrong sometimes.

- Validate types, ranges, and formats before processing
- Sanitize file paths (prevent traversal: `../../../etc/passwd`)
- Sanitize URIs (reject unexpected schemes, validate structure)
- Reject oversized inputs (set max lengths for strings, max items for arrays)
- Use schema validation (Zod or Pydantic) as the first line of defense

### Security for code-execution tools

If your server executes user-provided code (diagram generators, script runners):

1. **AST scanning** — parse the code and reject dangerous patterns before execution
2. **Allowlists** — only permit known-safe modules and functions
3. **Sandboxing** — execute in a restricted namespace, never in the server process
4. **Timeouts** — kill execution after a deadline (e.g., 30 seconds)
5. **Resource cleanup** — always clean up temp files, processes, connections

### Rate limiting and access control

- Rate-limit tool calls (especially those that hit external APIs)
- Authenticate callers when deployed remotely (JWT, API key)
- Authorize per-tool if some operations are sensitive
- Audit all tool invocations (who called what, when, with what parameters)

---

## Test phase

### Testing strategy

| Layer | What to test | How |
|-------|-------------|-----|
| **Unit** | Individual tool logic, validation, error paths | Mock external dependencies |
| **Integration** | Tool → real service round-trip | Use test accounts or sandboxes |
| **Contract** | Protocol compliance, schema correctness | Validate against MCP spec |
| **Agent workflow** | End-to-end with a real LLM client | Call tools from an agent, check results |

Agent workflow testing is the most important and most neglected. Your tools may pass unit tests but confuse the LLM because the descriptions are ambiguous or the return format is unexpected.

### What to verify

- [ ] All tools return structured data the LLM can parse
- [ ] Error responses include `isError: true` and a suggestion
- [ ] Tool descriptions are clear enough that the LLM picks the right tool
- [ ] Schema constraints actually prevent invalid inputs
- [ ] Concurrent tool calls don't cause race conditions
- [ ] Timeouts fire for slow external dependencies
- [ ] The server starts cleanly and handles graceful shutdown

---

## Documentation

Every MCP server needs a README with:

1. **One-sentence purpose** — what this server exposes
2. **Available tools** — name, description, parameters for each
3. **Available resources** — URI patterns and what they return
4. **Setup** — install, configure, run (both stdio and HTTP if supported)
5. **Environment variables** — all of them, with defaults and descriptions
6. **Required permissions** — what access the server needs (API keys, scopes, IAM roles)
7. **Limitations** — rate limits, unsupported operations, known issues

Also set the `instructions` field when creating the server — this is a global prompt the LLM reads before using any tool:

```typescript
const server = new McpServer({
  name: "github-server",
  version: "1.0.0",
  instructions: "This server provides read-only access to GitHub repositories. Use search_code to find definitions, list_issues to browse bugs, and get_file to read specific files. Always provide the full repository name (owner/repo)."
});
```

---

## Quality checklist

- [ ] Tool names follow verb-noun pattern, ≤ 64 characters
- [ ] Every tool has a description that says what, returns what, and when to use
- [ ] Input schemas have field descriptions, constraints, and defaults
- [ ] Errors use `isError: true` with suggestions, not raw exceptions
- [ ] File paths and URIs are validated and sanitized
- [ ] Transport is decoupled from logic (can run stdio or HTTP)
- [ ] All handlers are async
- [ ] README documents every tool, resource, env var, and permission
- [ ] Agent workflow test confirms the LLM uses tools correctly

---

## Did this help?

At the end of every session, ask: **"Did this solve what you were trying to do?"**

If the patterns didn't fit your MCP server's domain, or you ran into protocol issues not covered here, encourage the user to file an issue at **https://github.com/saif-shines/devex-kit/issues**.