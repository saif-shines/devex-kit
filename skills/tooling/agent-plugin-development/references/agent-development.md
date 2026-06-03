# Agent Development for High-Agency Specialists

When and how to create agents in the modern plugin model. Agents are complementary to skills, not a replacement.

## When Agents Are Appropriate (Post-Restructure)

Use an agent when the task has these properties:

- Requires focused, deep, or different reasoning (e.g. opus for architecture review vs sonnet for routine).
- Benefits from isolation: the specialist should not be distracted by the full parent context or other concerns.
- Is repeatable and has clear "I know it when I see it" triggers that can be described with concrete examples.
- Can be usefully spawned in parallel (multiple aspects of a PR, multiple connectors, etc.).
- The main agent (or skill) can describe the handoff in one sentence to the user.

Classic good example: the six agents in pr-review-toolkit (now often invoked via a skill or thin command that replaced the old monolithic review-pr command).

- code-reviewer: general project guidelines + bug detection
- silent-failure-hunter: error handling that swallows problems
- type-design-analyzer: new types and invariants
- pr-test-analyzer: test coverage and quality
- comment-analyzer: comment accuracy vs code
- code-simplifier: polish after other reviews pass

Each is narrowly chartered, has its own color, and the orchestrator chooses which subset to launch based on what files changed.

Bad: an "everything agent" that duplicates what a well-written skill already does.

## Agent File Location and Number

- Preferred: plugin-root `agents/` (shared across skills).
- Acceptable: inside a skill dir if the agent is only relevant to that skill's workflow.
- Target: 0-6 agents per plugin. More signals you need to split skills or turn some agents back into reference data + skill prompts.
- Empty `agents/` dir is correct and signals adherence to the model (see restructured agentkit/).

## Agent Frontmatter (Exact Shape)

```yaml
---
name: code-reviewer
description: |
  Use this agent when you need to review code for adherence to project guidelines, style guides, and best practices. This agent should be used proactively after writing or modifying code, especially before committing changes or creating pull requests. It will check for style violations, potential issues, and ensure code follows the established patterns in CLAUDE.md. Also the agent needs to know which files to focus on for the review. In most cases this will be recently completed work which is unstaged in git (can be retrieved by running git diff). However there can be cases where this is different, make sure to specify this as the agent input when calling the agent. Typical triggers include the user asking for a review of a feature they just implemented, the assistant proactively reviewing its own newly-written code before declaring a task done, and a final pre-PR check before opening a pull request. See "When to invoke" in the agent body for worked scenarios.
model: opus
tools:
  - Read
  - Glob
  - Grep
  - Bash
  - Task
color: green
---
```

- `name`: kebab-case, matches filename without .md
- `description`: long, third-person, includes multiple concrete `<example>` blocks (the original plugin-development skill shows the XML-ish example format). This is the most important part — it trains the parent when and how to spawn it.
- `model`: sonnet (default, fast), opus (hard reasoning, expensive), or other available.
- `tools`: list only what it truly needs. Over-granting defeats the "focused worker" benefit.
- `color`: red, green, yellow, blue, magenta, cyan, white. Gives visual identity in the UI.

## The <example> Blocks Inside Description (Critical)

From the pr-review-toolkit agents and the original guidance:

```
<example>
Context: User situation or file state
user: "User request that should trigger this agent"
assistant: "How the orchestrator should announce and call the agent"
<commentary>Why this agent is appropriate and what the expected output contract is</commentary>
</example>
```

Include 2-4 such examples. They are not just documentation — they are few-shot training for the parent agent.

## Body Content

After frontmatter the agent file is self-contained instructions. It should:

- Restate its charter narrowly.
- List "When to invoke" with the same scenarios from the description.
- Give review/generation/analysis scope.
- Provide output format (tables, PASS/FAIL lists, specific sections).
- Include any project-specific rules it must enforce (or tell it to read CLAUDE.md / AGENTS.md at the workspace root).
- End with "Report findings in this exact structure..." so the parent can reliably parse and present results.

Keep it reasonably self-contained so it can be spawned with a short prompt and still succeed.

## Orchestration From a Skill (Recommended Pattern)

In the restructured world, the skill (not the command) does the orchestration:

1. Skill receives the high-level request.
2. Skill explores the workspace (git diff, file types, etc.) using its own tools.
3. Skill decides the subset of specialists needed.
4. Skill tells the user the plan: "Running code review + silent failure hunt + type analysis in parallel."
5. Skill calls the Task tool (or equivalent) for each chosen agent, passing focused context ("Only the files that changed error handling: ...").
6. Skill collects results, dedupes, prioritizes, and presents a unified report.
7. Optionally spawns a simplifier agent in a follow-up turn.

See the deleted review-pr command in skillkit/scalekit for the old command-centric version, and imagine the new version living in a `skills/pr-review/SKILL.md` that does exactly the classification + spawning.

This is "agents + skill instead of command".

## Model and Tool Choices

- Routine classification / data extraction / light review → sonnet + minimal tools.
- Architecture, security, subtle invariant, cross-file reasoning → opus + broader read tools.
- Never give an agent Write/Edit unless the whole point is that it performs the edit under strict constraints (rare).
- Always give Bash/Glob/Grep/Read for investigation agents.

## Colors and UI Identity

Assign distinct colors. The UI uses them for badges and turn indicators. Consistent assignment across sessions helps users learn "green = the thorough reviewer", "magenta = the strict security one".

## Common Agent Anti-Patterns

- Vague description with no examples → parent never knows when to spawn it.
- Agent that duplicates a skill's entire charter.
- 15 agents because "we might need a specialist for X".
- Agent that assumes massive shared context instead of being given focused input on spawn.
- Putting the agent body in a command or inside a skill SKILL.md (separate .md file under agents/ is the contract).

## Relation to Skills

- Skill = primary, lean, always the first thing the user invokes (`/my-plugin-skill`).
- Agent = specialist worker the skill (or parent) can call when the task has the properties above.
- Many great plugins have skills only (docs-engineering in skillkit is an excellent minimal example: skills + references/ + examples/, one top-level command shim, no agents).
- Plugins with both (pr-review-toolkit style) are powerful when the specialists are truly distinct.

## Checklist for Every New Agent

- [ ] Description contains 2-4 concrete <example> blocks with user/assistant/commentary
- [ ] Narrow charter that does not overlap a skill
- [ ] Appropriate model for the reasoning depth
- [ ] Minimal sufficient tool list
- [ ] Distinct color
- [ ] Self-contained enough that a one-paragraph handoff + the agent's own file produces good output
- [ ] Documented in the parent skill's "When to spawn agents" or equivalent section
- [ ] Listed in the plugin README under "Specialist agents"

