# Cookbook operations

## Reasoning Requirements

### Standard Reasoning
- State identification from symptoms
- Single-recipe diagnosis
- Generating recipe scaffold templates

### Extended Reasoning (ultrathink)
Use extended thinking for:
- Full doc audit across 10+ recipes: requires holding patterns across multiple states simultaneously
- Information architecture redesign: structural decisions have cascading effects
- Diagnosing when multiple states co-occur and interact

**Trigger phrases:** "full audit", "redesign the structure", "comprehensive review", "is this doc working?"

## Execution Strategy

### Sequential (Default)
- Triage before intervention: always diagnose before prescribing
- AC1 (structure) before AC5 (expertise): structure fix reveals content problems
- AC7 (coverage) before AC1 (structure): can't organize what shouldn't exist

### Parallelizable
- Multiple recipe scaffolds generate independently
- Quality checks across independent sections are parallel
- Coverage audit and writing audit are independent: run concurrently on large cookbooks

### Subagent Candidates
| Task | Agent Type | When to Spawn |
|------|------------|---------------|
| Recipe file scan | Explore | Cookbook has 20+ files |
| Reader research | general-purpose | Synthesizing support tickets, search data, forum posts |

## Context Management

### Approximate Token Footprint
- **Skill base:** ~3k tokens
- **With full state definitions:** ~5k tokens
- **With script output inline:** ~7k tokens

### Context Optimization
- Load recipe samples one at a time during diagnosis
- Reference recipes by filename during audit runs, not full content
- Use `coverage-audit.ts` output rather than embedding raw recipe text

### When Context Gets Tight
- Prioritize: Current state diagnosis + recipe under review
- Defer: Full coverage audit, integration graph
- Drop: Script source code, full anti-pattern list

## Integration Graph

### Inbound (From Other Skills)
| Source Skill | Source State | Leads to State |
|--------------|--------------|----------------|
| developer-onboarding | Missing reference docs | AC7: Priority Inversion |
| technical-tutorials | Tutorial too complex → recipe extraction | AC1: Structure Void |
| sdk-dx | API complexity creates fragile examples | AC6: Fragile Examples |

### Outbound (To Other Skills)
| This State | Leads to Skill | Target State |
|------------|----------------|--------------|
| AC5: Expertise Gap | developer-onboarding | When gaps reveal missing onboarding flow |
| AC7: Priority Inversion | docs-as-marketing | When coverage gaps are also discovery problems |
| AC6: Fragile Examples | sdk-dx | When example fragility stems from API design |

### Complementary Skills
| Skill | Relationship |
|-------|--------------|
| technical-tutorials | Different depth contract; route complex topics to tutorials |
| developer-onboarding | Cookbooks are often the final destination in onboarding flows |
| sdk-dx | API design quality directly affects example complexity |
| docs-as-marketing | Discoverability and documentation quality are coupled |

## Output Persistence

Output goes to: `skills/documentation/authoring-cookbooks/`

### What to Persist
- Generated SKILL.md and scripts
- Audit reports from `coverage-audit.ts` runs
- Recipe scaffolds generated during sessions

### Conversation vs. File
| Goes to File | Stays in Conversation |
|---|---|
| Generated recipe stubs | Diagnosis discussion |
| Audit reports | State identification iteration |
| Coverage maps | Intervention planning |
