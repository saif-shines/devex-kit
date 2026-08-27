import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const CLAUDE_MD = "CLAUDE.md";
const AGENTS_MD = "AGENTS.md";
const HUMAN_INDEX = join("docs", "skills.md");
const COOKBOOK_SKILL = join("plugins", "documentation", "skills", "authoring-cookbooks", "SKILL.md");
const COOKBOOK_WORD_CAP = 2000;
const ORCHESTRATORS = new Set(["ask-saif", "docs-contribution-router", "skill-craft"]);
const RETIRED_SKILLS = {
  "using-devex-kit": "the kit router name is ask-saif",
  "ask-devex": "the kit router name is ask-saif",
  "create-skill": "the kit author skill is skill-craft",
  "agent-plugin-development": "the plugin skill is plugin-craft",
};

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

function shippedSkillFiles(rootDir) {
  const files = [];
  for (const plugin of pluginNames(rootDir)) {
    const skillsDir = join(rootDir, "plugins", plugin, "skills");
    if (!existsSync(skillsDir)) {
      continue;
    }
    for (const entry of readdirSync(skillsDir, { withFileTypes: true })) {
      const skillFile = join(skillsDir, entry.name, "SKILL.md");
      if (entry.isDirectory() && existsSync(skillFile)) {
        files.push({ plugin, name: entry.name, path: skillFile });
      }
    }
  }
  return files;
}

function skillNames(rootDir) {
  return shippedSkillFiles(rootDir).map((skill) => skill.name);
}

function pluginManifestSkills(pluginManifestPath) {
  const manifest = JSON.parse(readFileSync(pluginManifestPath, "utf8"));
  if (!Array.isArray(manifest.skills)) {
    return null;
  }
  return manifest.skills;
}

function skillNameFromPromotionPath(entry) {
  return String(entry).split("/").filter(Boolean).at(-1);
}

function firstBodyLine(text) {
  const body = text.replace(/^---[\s\S]*?---\s*/, "");
  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    return trimmed;
  }
  return "";
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
  for (const [oldName, reason] of Object.entries(RETIRED_SKILLS)) {
    if (seen.has(oldName)) {
      failures.push(`${oldName} exists as a skill; ${reason}`);
    }
  }
  for (const skill of shippedSkillFiles(rootDir)) {
    const text = readFileSync(skill.path, "utf8");
    for (const [oldName, reason] of Object.entries(RETIRED_SKILLS)) {
      if (new RegExp(`^name:\\s*${oldName}\\s*$`, "m").test(text)) {
        failures.push(`${oldName} exists as a skill; ${reason}`);
      }
    }
    if (text.includes("\u2014")) {
      failures.push(`${skill.name} contains an em-dash; skill text must not use em-dashes`);
    }
    if (/^You are\b/.test(firstBodyLine(text))) {
      failures.push(`${skill.name} starts with "You are"; write in imperative voice`);
    }
  }
  const askSaif = join(rootDir, "plugins", "tooling", "skills", "ask-saif", "SKILL.md");
  if (!existsSync(askSaif)) {
    failures.push("ask-saif is missing from plugins/tooling/skills");
  } else if (!readFileSync(askSaif, "utf8").includes("disable-model-invocation: true")) {
    failures.push("ask-saif must be user-invoked (disable-model-invocation: true)");
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
    const listed = pluginManifestSkills(pluginManifest);
    if (!listed) {
      failures.push(`${plugin} plugin.json must list shipped skills`);
      continue;
    }
    const listedNames = new Set(listed.map((entry) => skillNameFromPromotionPath(entry)));
    const folderNames = shippedSkillFiles(rootDir)
      .filter((skill) => skill.plugin === plugin)
      .map((skill) => skill.name);
    for (const name of folderNames) {
      if (!listedNames.has(name)) {
        failures.push(`${name} is under ${plugin} but not on the promotion list`);
      }
    }
    for (const name of listedNames) {
      if (!folderNames.includes(name)) {
        failures.push(`${plugin} promotion list names ${name} but that skill folder is missing`);
        continue;
      }
      const skillDir = join(rootDir, "plugins", plugin, "skills", name);
      const skillFile = join(skillDir, "SKILL.md");
      const yamlFile = join(skillDir, "agents", "openai.yaml");
      if (existsSync(skillFile)) {
        const skillText = readFileSync(skillFile, "utf8");
        const userInvoked = skillText.includes("disable-model-invocation: true");
        if (ORCHESTRATORS.has(name) && !userInvoked) {
          failures.push(`${name} must be user-invoked (disable-model-invocation: true)`);
        }
        if (!ORCHESTRATORS.has(name) && userInvoked) {
          failures.push(`${name} is a craft skill and must stay model-invoked`);
        }
      }
      if (!existsSync(yamlFile)) {
        failures.push(`${name} is missing agents/openai.yaml`);
        continue;
      }
      const yaml = readFileSync(yamlFile, "utf8");
      const forbidsImplicit = /allow_implicit_invocation:\s*false/.test(yaml);
      if (ORCHESTRATORS.has(name) && !forbidsImplicit) {
        failures.push(`${name} Codex file must forbid implicit invocation`);
      }
      if (!ORCHESTRATORS.has(name) && forbidsImplicit) {
        failures.push(`${name} is a craft skill and must allow implicit invocation`);
      }
    }
  }
  const indexPath = join(rootDir, HUMAN_INDEX);
  if (!existsSync(indexPath)) {
    failures.push("docs/skills.md is missing; the kit needs one human skills table");
  } else {
    const index = readFileSync(indexPath, "utf8");
    if (!index.includes("| [ask-saif]")) {
      failures.push("docs/skills.md must list ask-saif");
    }
    for (const name of skillNames(rootDir)) {
      if (!index.includes(`| [${name}]`)) {
        failures.push(`${name} is shipped but missing from docs/skills.md`);
      }
    }
    for (const name of skillNames(rootDir)) {
      if (existsSync(join(rootDir, "docs", "skills", `${name}.md`))) {
        failures.push(`${name} has a per-skill human page; keep one table only`);
      }
    }
  }
  const cookbookPath = join(rootDir, COOKBOOK_SKILL);
  if (existsSync(cookbookPath)) {
    const cookbook = readFileSync(cookbookPath, "utf8");
    const body = cookbook.replace(/^---[\s\S]*?---\s*/, "");
    const words = body.trim().split(/\s+/).filter(Boolean).length;
    if (words > COOKBOOK_WORD_CAP) {
      failures.push(`authoring-cookbooks body is ${words} words; keep it at ${COOKBOOK_WORD_CAP} or fewer`);
    }
    if (!/^>\s+.*load `references\//m.test(cookbook)) {
      failures.push("authoring-cookbooks must load extra text from references");
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
