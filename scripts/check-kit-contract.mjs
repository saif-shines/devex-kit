import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const CLAUDE_MD = "CLAUDE.md";
const AGENTS_MD = "AGENTS.md";

function pluginNames(rootDir) {
  const pluginsDir = join(rootDir, "plugins");
  if (!existsSync(pluginsDir)) {
    return [];
  }
  return readdirSync(pluginsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function draftSkillNames(rootDir) {
  const draftsDir = join(rootDir, "in-progress");
  if (!existsSync(draftsDir)) {
    return [];
  }
  const names = [];
  for (const entry of readdirSync(draftsDir, { withFileTypes: true })) {
    if (entry.isDirectory() && existsSync(join(draftsDir, entry.name, "SKILL.md"))) {
      names.push(entry.name);
    }
  }
  return names;
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
  if (!existsSync(join(rootDir, CLAUDE_MD))) {
    failures.push("CLAUDE.md is missing; identical root contracts are required");
  }
  if (!existsSync(join(rootDir, AGENTS_MD))) {
    failures.push("AGENTS.md is missing; identical root contracts are required");
  }
  const claudePath = join(rootDir, CLAUDE_MD);
  const agentsPath = join(rootDir, AGENTS_MD);
  if (
    existsSync(claudePath) &&
    existsSync(agentsPath) &&
    readFileSync(claudePath, "utf8") !== readFileSync(agentsPath, "utf8")
  ) {
    failures.push("CLAUDE.md and AGENTS.md must be identical");
  }
  if (!existsSync(join(rootDir, "in-progress"))) {
    failures.push("in-progress is missing; draft skills must live at the kit root");
  }
  if (!existsSync(join(rootDir, ".changeset", "config.json"))) {
    failures.push(".changeset/config.json is missing; plugin versions must follow Changesets");
  }
  const shipped = new Set(skillNames(rootDir));
  for (const name of draftSkillNames(rootDir)) {
    if (shipped.has(name)) {
      failures.push(`draft skill "${name}" is also under plugins; keep drafts in in-progress only`);
    }
  }
  for (const plugin of pluginNames(rootDir)) {
    const pluginManifest = join(rootDir, "plugins", plugin, ".claude-plugin", "plugin.json");
    if (!existsSync(pluginManifest)) {
      continue;
    }
    const packageManifest = join(rootDir, "plugins", plugin, "package.json");
    if (!existsSync(packageManifest)) {
      failures.push(`${plugin} is missing package.json; plugin versions must follow Changesets`);
      continue;
    }
    const pluginVersion = JSON.parse(readFileSync(pluginManifest, "utf8")).version;
    const packageVersion = JSON.parse(readFileSync(packageManifest, "utf8")).version;
    if (pluginVersion !== packageVersion) {
      failures.push(
        `${plugin} plugin.json version ${pluginVersion} does not match package.json version ${packageVersion}`,
      );
    }
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
