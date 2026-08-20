import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

function pluginNames(rootDir) {
  const pluginsDir = join(rootDir, "plugins");
  if (!existsSync(pluginsDir)) {
    return [];
  }
  return readdirSync(pluginsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function skillNames(rootDir) {
  const names = [];
  for (const plugin of pluginNames(rootDir)) {
    const skillsDir = join(rootDir, "plugins", plugin, "skills");
    if (!existsSync(skillsDir)) {
      continue;
    }
    for (const entry of readdirSync(skillsDir, { withFileTypes: true })) {
      if (entry.isDirectory() && existsSync(join(skillsDir, entry.name, "SKILL.md"))) {
        names.push(entry.name);
      }
    }
  }
  return names;
}

export function checkKitContract(rootDir) {
  const failures = [];
  if (existsSync(join(rootDir, ".agents", "skills"))) {
    failures.push(".agents/skills is present; the plugin tree must be the only skill source");
  }
  for (const plugin of pluginNames(rootDir)) {
    if (existsSync(join(rootDir, "plugins", plugin, "skills", "scalekit-code-doctor"))) {
      failures.push("scalekit-code-doctor is present under plugins; it must not live in this kit");
      break;
    }
  }
  if (!existsSync(join(rootDir, "plugins", "tooling", "skills", "code-style-patterns", "SKILL.md"))) {
    failures.push("code-style-patterns is missing from plugins/tooling/skills");
  }
  const seen = new Set();
  for (const name of skillNames(rootDir)) {
    if (seen.has(name)) {
      failures.push(`skill name "${name}" appears more than once`);
    }
    seen.add(name);
  }
  return { ok: failures.length === 0, failures };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = checkKitContract(process.cwd());
  if (!result.ok) {
    for (const failure of result.failures) {
      console.error(failure);
    }
    process.exit(1);
  }
}
