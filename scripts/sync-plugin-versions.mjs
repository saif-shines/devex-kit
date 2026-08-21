#!/usr/bin/env node
// Copies each plugin package.json version into .claude-plugin/plugin.json.
// Runs as part of `npm run version`, immediately after `changeset version`.
// With --check it changes nothing and exits 1 if any pair differs.

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");
const pluginsDir = join(repo, "plugins");
let failed = false;

for (const plugin of readdirSync(pluginsDir, { withFileTypes: true })) {
  if (!plugin.isDirectory()) {
    continue;
  }
  const pluginRoot = join(pluginsDir, plugin.name);
  const packagePath = join(pluginRoot, "package.json");
  const pluginPath = join(pluginRoot, ".claude-plugin", "plugin.json");
  const { version } = JSON.parse(readFileSync(packagePath, "utf8"));
  const source = readFileSync(pluginPath, "utf8");
  const manifest = JSON.parse(source);

  if (manifest.version === version) {
    console.log(`${plugin.name} plugin.json version is ${version}`);
    continue;
  }

  if (checkOnly) {
    console.error(
      `${plugin.name} plugin.json version is ${manifest.version}, package.json is ${version}. Run \`node scripts/sync-plugin-versions.mjs\`.`,
    );
    failed = true;
    continue;
  }

  const updated = source.replace(/("version"\s*:\s*")[^"]*(")/, `$1${version}$2`);
  if (JSON.parse(updated).version !== version) {
    console.error(`Could not find a version field to replace in ${pluginPath}.`);
    failed = true;
    continue;
  }
  writeFileSync(pluginPath, updated);
  console.log(`${plugin.name} plugin.json version ${manifest.version} -> ${version}`);
}

if (failed) {
  process.exit(1);
}
