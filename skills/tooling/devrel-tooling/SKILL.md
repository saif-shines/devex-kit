---
name: devrel-tooling
description: |
  Build CLI tools and API utilities that developers on your platform actually use. Covers CLI design (command hierarchy, flags, completions, cross-platform UX) and API collection generation (Postman/OpenAPI from Express, Next.js, Fastify, Hono routes). Use this skill when building a developer-facing CLI tool, adding subcommands or flags, implementing shell completions, designing interactive prompts, generating Postman collections from code, creating API testing artifacts, or building any developer utility. Also activates for questions about argument parsing (commander, click, typer, cobra), progress indicators, terminal UX, or Postman collection format.
license: MIT
metadata:
  author: saif-shines
  version: "1.0"
  type: assistive
  mode: implementation
---

# DevRel Tooling

Build the tools your developers reach for daily — CLIs they tab-complete without thinking, API collections they import on day one.

Two domains:

| Domain | What you build | When to use |
|--------|---------------|-------------|
| **CLI tools** | Command-line interfaces with subcommands, flags, completions, interactive prompts | "Build a CLI", "add a command", "shell completions", "progress bar" |
| **API collections** | Postman/OpenAPI artifacts generated from your codebase | "Generate Postman collection", "export API endpoints", "create collection from routes" |

State which domain you need, or describe what you're building.

---

## CLI tools

> For expanded implementation patterns per language (Node.js/commander, Python/click+typer, Go/cobra), load `references/cli-patterns.md`.

### Core workflow

1. **Analyze UX** — Map user workflows, identify common tasks, plan command hierarchy
2. **Design commands** — Subcommands, flags, arguments, configuration layers
3. **Implement** — Build with the right framework for the language
4. **Polish** — Completions, help text, error messages, progress indicators
5. **Test** — Cross-platform smoke tests; target startup < 50ms

### Command hierarchy

Design the tree before writing code:

```
mytool                           # Root
├── init [options]              # Setup
├── config
│   ├── get <key>              # Nested subcommands
│   ├── set <key> <value>
│   └── list
├── deploy [environment]        # Positional + flags
│   ├── --dry-run
│   ├── --force
│   └── --config <file>
└── plugins
    ├── install <name>
    ├── list
    └── remove <name>
```

Rules:
- Positional arguments for required inputs
- Flags for optional behavior
- Short + long forms for common flags (`-v`, `--verbose`)
- Consistent naming across subcommands

### Quick-start example (Node.js / commander)

```javascript
#!/usr/bin/env node
const { program } = require('commander');

program.name('mytool').description('Developer platform CLI').version('1.0.0');

program
  .command('deploy <environment>')
  .description('Deploy to target environment')
  .option('-f, --force', 'skip confirmation')
  .option('-d, --dry-run', 'preview changes')
  .action((env, opts) => {
    if (!opts.force && env === 'production') {
      // prompt for confirmation in interactive mode
    }
    console.log(`Deploying to ${env}...`);
  });

program.parse();
```

> For Python (click/typer) and Go (cobra) examples, load `references/cli-patterns.md`.

### Error messages

Every CLI error follows: **context → problem → solution**. Never show raw stack traces or codes like `ENOENT`.

### Framework selection

Use **commander** (Node.js), **click/typer** (Python), or **cobra** (Go). For details and alternatives, load `references/cli-patterns.md`.

### Constraints

**Must do:**
- Keep startup under 50ms
- Support `--help` and `--version`
- Handle SIGINT (Ctrl+C) gracefully
- Provide shell completions (bash/zsh/fish)
- Write logs/diagnostics to stderr, output to stdout
- Test on Windows, macOS, and Linux

**Must not:**
- Use colors when output is not a TTY
- Require interactive input in CI environments
- Break existing command signatures (treat flag renames as breaking changes)
- Hardcode paths — use `os.homedir()` / `Path.home()` / `os.UserHomeDir()`

---

## API collection generation

> For the full Postman collection v2.1 schema and framework-specific scanner implementations, load `references/api-collection-generators.md`.

### Core workflow

1. **Scan routes** — Find all API route definitions in the codebase
2. **Extract metadata** — Methods, paths, params, request bodies, headers
3. **Organize** — Group endpoints by resource or folder structure
4. **Generate** — Create Postman Collection v2.1 JSON (or OpenAPI)
5. **Add examples** — Include realistic request/response examples
6. **Configure** — Environment variables for base URL, auth tokens

### Supported frameworks

| Framework | Route pattern | Detection |
|-----------|--------------|-----------|
| Express | `app.get()`, `router.post()` | Method chaining on app/router |
| Next.js | `app/api/**/route.ts` | File-based routing, exported methods |
| Fastify | `fastify.get()`, route schema | Method + schema decorators |
| Hono | `app.get()`, `app.post()` | Similar to Express |
| NestJS | `@Get()`, `@Post()` decorators | Decorator-based |
| Koa | `router.get()`, `router.post()` | Koa-router patterns |

### Collection structure

```json
{
  "info": {
    "name": "My API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Users",
      "item": [
        {
          "name": "GET users",
          "request": {
            "method": "GET",
            "url": { "raw": "{{baseUrl}}/users", "host": ["{{baseUrl}}"], "path": ["users"] }
          }
        }
      ]
    }
  ],
  "variable": [
    { "key": "baseUrl", "value": "http://localhost:3000/api" },
    { "key": "authToken", "value": "" }
  ]
}
```

### Best practices

- Use Postman variables (`{{baseUrl}}`, `{{authToken}}`) for environment flexibility
- Group endpoints by resource, not by HTTP method
- Include request bodies with realistic example data for POST/PUT/PATCH
- Add endpoint descriptions explaining what each operation does
- Configure collection-level auth (bearer, basic, or API key)
- Create a matching environment template (dev, staging, production)
- Commit the generated collection to the repo — regenerate on route changes in CI

---

## Phase gates

**CLI — after implementation:** Run `mytool --help` and verify all commands render. Run `mytool --version`. Test in non-interactive mode: `CI=true mytool deploy staging --force`.

**CLI — before release:** Generate completions and test in bash/zsh: `source <(mytool completion bash) && mytool <TAB>`. Run on macOS, Linux, and Windows (or CI matrix).

**API collection — after generation:** Validate the JSON: `npx ajv validate -s postman-collection-v2.1-schema.json -d collection.json`. Import into Postman and confirm all endpoints render.

## Quality checklist

### CLI tools
- [ ] `--help` renders correctly for all commands
- [ ] Shell completions work (bash, zsh, fish)
- [ ] Startup time < 50ms
- [ ] Works in CI/non-interactive mode
- [ ] Error messages include remediation steps
- [ ] Colors disabled when not TTY

### API collections
- [ ] All routes scanned from codebase
- [ ] Endpoints grouped by resource
- [ ] Path parameters extracted and documented
- [ ] Request bodies included for POST/PUT/PATCH
- [ ] Environment variables configured
- [ ] Collection imports cleanly in Postman

