# Tool and Resource Design

Expanded patterns for designing MCP tools and resources that LLMs use effectively. Read this when you're defining tool schemas, writing descriptions, or designing resource URIs.

## Table of contents

1. [Tool naming conventions](#tool-naming-conventions)
2. [Writing descriptions the LLM reads](#writing-descriptions-the-llm-reads)
3. [Schema design patterns](#schema-design-patterns)
4. [Resource URI design](#resource-uri-design)
5. [Response formatting](#response-formatting)
6. [Anti-patterns](#anti-patterns)

---

## Tool naming conventions

### Naming rules (from MCP spec)

- Maximum **64 characters** for fully qualified name (including server prefix)
- Must start with a letter
- Only alphanumeric, `_`, or `-`
- Case-sensitive
- Unique within server namespace

### Recommended patterns

**snake_case** (preferred — matches MCP reference implementations):

```
read_file
search_code
create_issue
list_repositories
get_build_status
delete_branch
```

**Verb categories:**

| Verb | Intent | Examples |
|------|--------|---------|
| `get_` | Retrieve a single resource | `get_user`, `get_file_contents` |
| `list_` | Retrieve a collection | `list_issues`, `list_branches` |
| `search_` | Query with filters | `search_code`, `search_issues` |
| `create_` | Create a new resource | `create_issue`, `create_branch` |
| `update_` | Modify an existing resource | `update_issue`, `update_config` |
| `delete_` | Remove a resource | `delete_branch`, `delete_comment` |
| `run_` | Execute an operation | `run_query`, `run_test` |

### What to avoid

- `handle_request` — too vague, what request?
- `do_thing` — no information content
- `process_data` — what data, what processing?
- `code_search` — noun-verb order, use `search_code`
- `getAllTheRepositoriesForUser` — too long, use `list_user_repos`

---

## Writing descriptions the LLM reads

Tool descriptions are the most important text in your MCP server. The LLM reads them at inference time to decide:

1. **Which tool to call** (disambiguation)
2. **What parameters to provide** (field descriptions)
3. **What to expect back** (return format)

### Description template

```
[What it does — one sentence, active voice]
[What it returns — shape and content]
[When to use it — helps disambiguate from similar tools]
[Prerequisites — if any tool must be called first]
```

### Examples

**Good:**

```
Search for code across all repositories using a text query.
Returns matching file paths, line numbers, and code snippets.
Use this when the user wants to find where a function, class, or string is defined or used.
For searching within a specific file, use read_file instead.
```

```
List all open issues in a repository, optionally filtered by label or assignee.
Returns issue number, title, labels, and creation date.
Use list_issues to browse; use search_issues for text-based queries.
```

**Bad:**

```
Code search.
```

```
Gets issues from the API.
```

### Field descriptions that guide the LLM

Field descriptions teach the model how to fill in parameters. Include:

- What the value represents
- Format expectations (if not obvious from the type)
- What happens with different values
- Explicit instructions for critical parameters

```python
workspace_dir: str = Field(
    ...,
    description=(
        "Absolute path to the IDE workspace directory. "
        "IMPORTANT: Always provide the full absolute path, not relative. "
        "Files will be saved relative to this directory."
    )
)

query: str = Field(
    ...,
    description=(
        "Search query text. Supports exact phrases in double quotes "
        "and boolean operators (AND, OR, NOT). "
        "Example: '\"async function\" AND typescript'"
    )
)

format: Literal["json", "markdown", "csv"] = Field(
    "json",
    description=(
        "Output format. Use 'json' for structured data the model can parse, "
        "'markdown' for human-readable display, 'csv' for tabular export."
    )
)
```

### Prerequisite chains

When one tool depends on output from another, say so explicitly:

```
Create a new knowledge base entry.
PREREQUISITE: You MUST first call list_knowledge_bases to get the knowledge base ID.
Provide the knowledge_base_id from that response.
```

---

## Schema design patterns

### Required vs optional

```typescript
// Required: use z.string() with no default
query: z.string().describe("Search query text"),

// Optional with default: LLM can omit
limit: z.number().min(1).max(100).default(20)
  .describe("Maximum results to return. Default: 20"),

// Optional without default: LLM provides or null
assignee: z.string().optional()
  .describe("Filter by assignee username. Omit to show all."),
```

### Constrained values

Always constrain when possible — it reduces LLM errors:

```typescript
// Enum: LLM sees valid options
status: z.enum(["open", "closed", "all"]).default("open")
  .describe("Filter by status"),

// Range: LLM knows bounds
page: z.number().int().min(1).default(1)
  .describe("Page number, starting from 1"),

// Pattern: LLM knows format
repo: z.string().regex(/^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/)
  .describe("Repository in owner/name format, e.g. 'octocat/hello-world'"),
```

### Complex inputs

For tools that need structured input, use nested objects:

```typescript
server.tool("create_issue", "Create a new issue in a repository.", {
  repo: z.string().describe("Repository in owner/name format"),
  title: z.string().max(256).describe("Issue title"),
  body: z.string().optional().describe("Issue body in Markdown"),
  labels: z.array(z.string()).optional()
    .describe("Labels to apply. Use list_labels to see available labels."),
  assignees: z.array(z.string()).optional()
    .describe("GitHub usernames to assign"),
}, async (params) => { /* ... */ });
```

---

## Resource URI design

### URI schemes

Use clear schemes that communicate the data source:

```
file:///path/to/file           # Local files
postgres://host/db/table       # Database resources
github://owner/repo/issues     # GitHub-specific
resource://connections          # Server-internal resources
config://server/settings        # Configuration data
```

### Resource templates (RFC 6570)

For parameterized resources:

```typescript
server.resourceTemplate(
  "github://repos/{owner}/{repo}/readme",
  "Repository README content",
  async (uri, { owner, repo }) => ({
    contents: [{ uri: uri.href, mimeType: "text/markdown", text: readmeContent }]
  })
);
```

### Resource best practices

1. Set **MIME types** — `application/json` for structured data, `text/markdown` for docs
2. **Paginate** large lists — don't return 10,000 items in one response
3. Use **subscriptions** for data that changes frequently (build status, logs)
4. **Validate URIs** — reject path traversal, unexpected schemes, malformed input
5. Return **consistent structure** — same shape every time, even when empty
6. **Document custom URI schemes** in the README

---

## Response formatting

### Prefer JSON for structured data

```typescript
return {
  content: [{
    type: "text",
    text: JSON.stringify({
      issues: [
        { number: 42, title: "Bug in auth flow", status: "open", labels: ["bug"] },
        { number: 43, title: "Add retry logic", status: "open", labels: ["enhancement"] },
      ],
      total: 2,
      page: 1,
    }, null, 2)
  }]
};
```

### Use file URIs for generated files

```typescript
return {
  content: [{
    type: "text",
    text: `File saved to: file:///${outputPath}\nSize: ${size} bytes`
  }]
};
```

### Pydantic response models (Python)

```python
class SearchResult(BaseModel):
    """A single search result."""
    file_path: str = Field(description="Relative path to the matching file")
    line_number: int = Field(description="Line number of the match")
    snippet: str = Field(description="Code snippet with context")
    score: float = Field(description="Relevance score, 0-1")

class SearchResponse(BaseModel):
    """Search results with metadata."""
    results: list[SearchResult]
    total: int
    query: str
    truncated: bool = Field(description="True if results were capped by limit")
```

---

## Anti-patterns

| Anti-pattern | Problem | Fix |
|-------------|---------|-----|
| **One tool per API endpoint** | 50+ tools overwhelm the LLM | Group into higher-level intent tools |
| **Vague descriptions** | LLM picks wrong tool or fills params incorrectly | Write what/returns/when descriptions |
| **No constraints** | LLM sends `limit: 999999` or invalid enums | Add min/max, Literal, regex |
| **God tool** | One tool that does everything via a `action` parameter | Split into focused verb-noun tools |
| **Raw error dumps** | LLM sees a stack trace and hallucinates | Return `isError: true` with suggestion |
| **Missing return docs** | LLM doesn't know what it got back | Describe return shape in description |
| **Implicit ordering** | Tools depend on each other but don't say so | Add PREREQUISITE notes in descriptions |