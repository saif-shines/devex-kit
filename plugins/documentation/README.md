# Documentation Plugin

Documentation workflow skills for devrel professionals — routing contributions, enforcing writing style, auditing cookbook quality, and designing sidebar navigation.

## Installation

```sh
/plugin marketplace add saif-shines/devex-kit
/plugin install documentation@devex-kit
```

## Skills

| Skill | Slash command | What it does |
|-------|--------------|--------------|
| docs-contribution-router | `/docs-contribution-router` | Routes docs contributions to the right content type, placement, template, and workflow |
| docs-writing-style | `/docs-writing-style` | Handoff mode (style prompt for your agent) or review mode (quality rubric against a draft) |
| authoring-cookbooks | `/authoring-cookbooks` | Diagnoses documentation quality — skimmability, writing clarity, reader helpfulness |
| journey-sidebar-labels | `/journey-sidebar-labels` | Sidebar navigation labels and order following a developer journey |

## Usage

```
/docs-contribution-router I have a customer issue to document — users are confused about session token revocation.
```

```
/docs-writing-style review mode. [paste your draft or file path]
```

```
/authoring-cookbooks My cookbook has plenty of content but readers say it's hard to follow.
```

```
/journey-sidebar-labels Review these sidebar labels for sentence case and journey order: [paste]
```