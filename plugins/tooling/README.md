# Tooling Plugin

Skills for building the artifacts devrel professionals ship — SDKs, CLI tools, MCP servers, agent plugins, and skills. Includes the devex-kit router.

## Installation

```sh
/plugin marketplace add saif-shines/devex-kit
/plugin install tooling@devex-kit
```

## Skills

| Skill | Slash command | What it does |
|-------|--------------|--------------|
| ask-saif | `/ask-saif` | Router. Names the next kit skill and the line to type. |
| sdk-craft | `/sdk-craft` | Design, build, document, and ship SDKs — full lifecycle |
| devrel-tooling | `/devrel-tooling` | Build CLI tools and generate API collections |
| mcp-server-craft | `/mcp-server-craft` | Build MCP servers — tool design, security, testing |
| pragmatic-fp | `/pragmatic-fp` | Pragmatic 80/20 fp-ts in TypeScript (pipe, Option, Either + when to skip) |
| code-style-patterns | `/code-style-patterns` | Apply community code styles (shadcn, sindresorhus, ahmadawais) |
| skill-craft | `/skill-craft` | Create new skills or improve existing SKILL.md files |
| plugin-craft | `/plugin-craft` | Design, build, and restructure Claude Code plugins |

## Usage

Start with the router:
```
/ask-saif I need to build a TypeScript SDK for our REST API
```

Or invoke directly:
```
/sdk-craft I'm building a TypeScript SDK. Start with design phase.
```

```
/mcp-server-craft I'm building an MCP server to expose our search API to AI agents.
```

```
/pragmatic-fp I have nested null checks and want the practical fp-ts version (or to be told to keep optional chaining).
```

```
/skill-craft Turn this repeated release checklist into a reusable skill.
```