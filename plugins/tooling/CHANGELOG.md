# tooling

## 3.0.0

### Major Changes

- Rename create-skill to skill-craft and agent-plugin-development to plugin-craft.

## 2.0.0

### Major Changes

- 6d8281f: Rename the kit router to ask-devex. The old name is gone. The human starts the router. The model does not.

### Minor Changes

- 628a6c9: Mark orchestrators as user-only. Add Codex invocation files. List shipped skills in each plugin manifest.

### Patch Changes

- a7f6e4a: Require a dora --quick review before a kit skill is shipped.
- 107a763: Move Scalekit agent-connector and escalation context out of this kit. That work lives in skillkit docs-engineering.
- 92c30bb: Remove em-dashes and persona leads from shipped skill bodies. Fail the contract check if they return.
