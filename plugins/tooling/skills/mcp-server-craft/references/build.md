# MCP server build

Load this in the Build phase. It holds project trees, transport choice, async handlers, and the server `instructions` field.

## Table of contents

1. [Project structure](#project-structure)
2. [Transport](#transport)
3. [Async handlers](#async-handlers)
4. [Server instructions](#server-instructions)

## Project structure

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

Rules:

- **Single entry point**: one `main()` that creates the server and starts transport
- **Separate transport from logic**: keep tool/resource handlers independent so stdio or HTTP can plug in
- **Models in their own file**: Pydantic models or TypeScript types stay out of server setup

## Transport

| Transport | When to use | Client examples |
|-----------|------------|-----------------|
| **stdio** | Local tools, desktop clients | Claude Desktop, local dev |
| **Streamable HTTP** | Remote access, cloud deployment | Cursor, cloud agents, multi-tenant |
| **HTTP/SSE (legacy)** | Backward compatibility only | Older MCP clients |

Prefer Streamable HTTP for anything deployed. Use stdio for local-only tools. Support both by keeping server logic transport-agnostic.

## Async handlers

Every tool and resource handler is `async`. Gather independent work:

```python
# Good: concurrent fetches
results = await asyncio.gather(
    fetch_issues(repo_a),
    fetch_issues(repo_b),
    fetch_issues(repo_c),
)

# Sequential only when each call needs the previous result
result_a = await fetch_issues(repo_a)
result_b = await fetch_issues(repo_b)
```

## Server instructions

Set the `instructions` field. The model reads it before any tool:

```typescript
const server = new McpServer({
  name: "github-server",
  version: "1.0.0",
  instructions: "Read-only access to GitHub repos. Use search_code to find definitions, list_issues to browse bugs, get_file to read files. Always provide full repo name (owner/repo)."
});
```

Keep `instructions` short. Name the tools and the one fact the model always needs (for example `owner/repo`).
