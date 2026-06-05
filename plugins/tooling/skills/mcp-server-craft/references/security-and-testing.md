# Security and Testing

Expanded guidance for hardening and testing MCP servers. Read this during the Harden and Test phases when you need concrete patterns for input validation, sandboxing, and test strategies.

## Table of contents

1. [Input validation](#input-validation)
2. [Code execution sandboxing](#code-execution-sandboxing)
3. [Authentication and authorization](#authentication-and-authorization)
4. [Rate limiting](#rate-limiting)
5. [Testing strategy](#testing-strategy)
6. [Agent workflow testing](#agent-workflow-testing)

---

## Input validation

The LLM generates parameters. They will be wrong, malformed, or adversarial sometimes. Validate everything at the boundary.

### Path traversal prevention

```python
import os

def validate_path(workspace_dir: str, requested_path: str) -> str:
    """Ensure requested path stays within workspace."""
    abs_workspace = os.path.realpath(workspace_dir)
    abs_requested = os.path.realpath(os.path.join(workspace_dir, requested_path))

    if not abs_requested.startswith(abs_workspace):
        raise ValidationError(
            f"Path '{requested_path}' escapes workspace directory. "
            f"All paths must be relative to {workspace_dir}."
        )
    return abs_requested
```

```typescript
import path from "path";

function validatePath(workspaceDir: string, requestedPath: string): string {
  const absWorkspace = path.resolve(workspaceDir);
  const absRequested = path.resolve(workspaceDir, requestedPath);

  if (!absRequested.startsWith(absWorkspace)) {
    throw new Error(
      `Path '${requestedPath}' escapes workspace. All paths must be within ${workspaceDir}.`
    );
  }
  return absRequested;
}
```

### Size limits

```python
MAX_QUERY_LENGTH = 1000
MAX_BODY_LENGTH = 50_000
MAX_ARRAY_ITEMS = 100

@mcp.tool()
async def search(
    query: str = Field(..., max_length=MAX_QUERY_LENGTH,
                       description="Search query (max 1000 chars)"),
    labels: list[str] = Field(default=[], max_length=MAX_ARRAY_ITEMS,
                              description="Filter labels (max 100)"),
):
    ...
```

### URI validation

```python
from urllib.parse import urlparse

ALLOWED_SCHEMES = {"http", "https", "file", "resource"}

def validate_uri(uri: str) -> str:
    parsed = urlparse(uri)
    if parsed.scheme not in ALLOWED_SCHEMES:
        raise ValidationError(
            f"URI scheme '{parsed.scheme}' not allowed. "
            f"Supported: {', '.join(ALLOWED_SCHEMES)}"
        )
    if ".." in parsed.path:
        raise ValidationError("URI path must not contain '..'")
    return uri
```

---

## Code execution sandboxing

For MCP servers that execute user-provided code (diagram generators, script runners, query engines), use defense-in-depth:

### Layer 1: AST scanning

Parse the code and reject dangerous patterns before execution:

```python
import ast

DANGEROUS_CALLS = {"exec", "eval", "compile", "__import__", "subprocess",
                   "os.system", "os.popen", "os.exec"}

def scan_code(source: str) -> list[str]:
    """Return list of security violations found in source."""
    violations = []
    tree = ast.parse(source)

    for node in ast.walk(tree):
        if isinstance(node, ast.Call):
            name = _get_call_name(node)
            if name in DANGEROUS_CALLS:
                violations.append(f"Forbidden call: {name} at line {node.lineno}")

        if isinstance(node, ast.Import):
            for alias in node.names:
                if alias.name in {"subprocess", "shutil", "ctypes"}:
                    violations.append(f"Forbidden import: {alias.name} at line {node.lineno}")

    return violations
```

### Layer 2: Restricted namespace

Execute in a controlled environment with only approved builtins:

```python
SAFE_BUILTINS = {
    "abs", "all", "any", "bool", "dict", "enumerate", "filter",
    "float", "int", "len", "list", "map", "max", "min", "print",
    "range", "round", "set", "sorted", "str", "sum", "tuple", "zip",
}

def create_sandbox():
    safe_globals = {"__builtins__": {k: __builtins__[k] for k in SAFE_BUILTINS}}
    return safe_globals
```

### Layer 3: Timeouts

Kill execution after a deadline:

```python
import signal

class TimeoutError(Exception):
    pass

def execute_with_timeout(code: str, namespace: dict, timeout_seconds: int = 30):
    def handler(signum, frame):
        raise TimeoutError(f"Execution timed out after {timeout_seconds}s")

    signal.signal(signal.SIGALRM, handler)
    signal.alarm(timeout_seconds)
    try:
        exec(code, namespace)
    finally:
        signal.alarm(0)  # Cancel alarm
```

### Layer 4: Resource cleanup

Always clean up, even on failure:

```python
@mcp.tool()
async def run_script(code: str, workspace_dir: str):
    temp_dir = None
    try:
        violations = scan_code(code)
        if violations:
            return error_result(f"Security violations: {violations}")

        temp_dir = tempfile.mkdtemp()
        namespace = create_sandbox()
        execute_with_timeout(code, namespace, timeout_seconds=30)
        return success_result(namespace.get("result"))
    except TimeoutError as e:
        return error_result(str(e))
    finally:
        if temp_dir and os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)
```

---

## Authentication and authorization

### Remote deployments (Streamable HTTP)

When your MCP server is deployed remotely, authenticate callers:

```typescript
// JWT validation middleware
function validateToken(req: Request): UserContext {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) throw new AuthError("Missing authorization header");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return { userId: payload.sub, scopes: payload.scopes };
  } catch {
    throw new AuthError("Invalid or expired token");
  }
}
```

### Per-tool authorization

Some tools are more sensitive than others:

```python
def require_scope(scope: str):
    """Decorator to enforce authorization scope on a tool."""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, ctx: Context, **kwargs):
            user = ctx.get("user")
            if scope not in user.scopes:
                return error_result(
                    f"Insufficient permissions. This tool requires '{scope}' scope."
                )
            return await func(*args, ctx=ctx, **kwargs)
        return wrapper
    return decorator

@mcp.tool()
@require_scope("write:issues")
async def delete_issue(issue_id: str, ctx: Context):
    ...
```

---

## Rate limiting

Protect external APIs and expensive operations:

```python
from collections import defaultdict
import time

class RateLimiter:
    """Simple token bucket rate limiter."""

    def __init__(self, calls_per_minute: int = 60):
        self.calls_per_minute = calls_per_minute
        self.calls: dict[str, list[float]] = defaultdict(list)

    def check(self, key: str) -> bool:
        now = time.time()
        window = now - 60
        self.calls[key] = [t for t in self.calls[key] if t > window]

        if len(self.calls[key]) >= self.calls_per_minute:
            return False

        self.calls[key].append(now)
        return True

rate_limiter = RateLimiter(calls_per_minute=30)

@mcp.tool()
async def search_external_api(query: str, ctx: Context):
    user_id = ctx.get("user_id", "anonymous")
    if not rate_limiter.check(user_id):
        return error_result(
            "Rate limit exceeded. Maximum 30 calls per minute. "
            "Wait a moment and try again."
        )
    ...
```

---

## Testing strategy

### Unit tests

Test tool logic in isolation with mocked dependencies:

```python
# tests/test_tools.py
import pytest
from myservice_mcp.tools.search import search_issues

@pytest.mark.asyncio
async def test_search_issues_returns_results(mock_github):
    mock_github.search.return_value = [
        {"number": 42, "title": "Bug", "status": "open"}
    ]
    result = await search_issues(query="bug", status="open", limit=10)
    assert len(result.results) == 1
    assert result.results[0].number == 42

@pytest.mark.asyncio
async def test_search_issues_empty_query():
    """Empty query should return validation error."""
    with pytest.raises(ValidationError):
        await search_issues(query="", status="open", limit=10)

@pytest.mark.asyncio
async def test_search_issues_handles_api_failure(mock_github):
    mock_github.search.side_effect = ConnectionError("timeout")
    result = await search_issues(query="bug", status="open", limit=10)
    assert result.is_error is True
    assert "timeout" in result.message.lower()
```

### Integration tests

Test against real services (use test accounts or sandboxes):

```python
@pytest.mark.integration
@pytest.mark.asyncio
async def test_search_against_real_github():
    """Requires GITHUB_TOKEN env var."""
    result = await search_issues(
        query="is:open label:bug",
        repo="octocat/hello-world",
        limit=5,
    )
    assert len(result.results) <= 5
    for issue in result.results:
        assert issue.status == "open"
```

### Contract tests

Validate your server speaks correct MCP protocol:

```python
@pytest.mark.asyncio
async def test_tools_list_returns_valid_schema():
    """Every tool must have name, description, and inputSchema."""
    tools = await server.list_tools()
    for tool in tools:
        assert tool.name, "Tool must have a name"
        assert len(tool.name) <= 64, f"Tool name '{tool.name}' exceeds 64 chars"
        assert tool.description, f"Tool '{tool.name}' must have a description"
        assert tool.inputSchema, f"Tool '{tool.name}' must have an input schema"
```

---

## Agent workflow testing

The most important tests — and the most neglected. Your tools may pass unit tests but confuse a real LLM.

### What to test

1. **Tool selection** — Given a user prompt, does the agent pick the right tool?
2. **Parameter filling** — Does the agent fill in parameters correctly from the description?
3. **Multi-step workflows** — Can the agent chain tools (list → get → update)?
4. **Error recovery** — When a tool returns `isError: true`, does the agent try a reasonable next step?

### How to test

Run your MCP server locally, connect a real LLM client, and give it natural-language prompts:

```
Prompt: "Find all open bugs in the auth module"
Expected: Agent calls search_issues with query containing "auth" and label "bug"

Prompt: "What's the build status for the main branch?"
Expected: Agent calls get_build_status with branch="main"

Prompt: "Create an issue about the login timeout bug"
Expected: Agent calls create_issue with a sensible title and body
```

Document these as test scenarios and run them periodically — especially after changing tool names, descriptions, or schemas. A rename from `search` to `find_issues` can break agent workflows even if the logic is identical.