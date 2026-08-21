import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { checkKitContract } from "./check-kit-contract.mjs";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

async function makeKit(mutate) {
  const root = await mkdtemp(join(tmpdir(), "kit-contract-"));
  const skillDir = join(root, "plugins/tooling/skills/code-style-patterns");
  await mkdir(skillDir, { recursive: true });
  await writeFile(join(skillDir, "SKILL.md"), "---\nname: code-style-patterns\n---\n");
  await writeFile(join(root, "CLAUDE.md"), "kit contract\n");
  await writeFile(join(root, "AGENTS.md"), "kit contract\n");
  await mkdir(join(root, "in-progress"), { recursive: true });
  await mkdir(join(root, ".changeset"), { recursive: true });
  await writeFile(join(root, ".changeset/config.json"), "{}\n");
  if (mutate) {
    await mutate(root);
  }
  return root;
}

test("fails when a plugin version does not match its package", async () => {
  const root = await makeKit(async (kit) => {
    await mkdir(join(kit, "plugins/tooling/.claude-plugin"), { recursive: true });
    await writeFile(
      join(kit, "plugins/tooling/.claude-plugin/plugin.json"),
      JSON.stringify({ name: "tooling", version: "1.0.0" }),
    );
    await writeFile(
      join(kit, "plugins/tooling/package.json"),
      JSON.stringify({ name: "tooling", version: "2.0.0" }),
    );
  });
  try {
    const result = checkKitContract(root);
    assert.equal(result.ok, false);
    assert.match(result.failures.join("\n"), /version/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("fails when Changesets config is missing", async () => {
  const root = await makeKit();
  await rm(join(root, ".changeset"), { recursive: true, force: true });
  try {
    const result = checkKitContract(root);
    assert.equal(result.ok, false);
    assert.match(result.failures.join("\n"), /changeset/i);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("fails when a draft skill is also under plugins", async () => {
  const root = await makeKit(async (kit) => {
    const draft = join(kit, "in-progress/code-style-patterns");
    await mkdir(draft, { recursive: true });
    await writeFile(join(draft, "SKILL.md"), "---\nname: code-style-patterns\n---\n");
  });
  try {
    const result = checkKitContract(root);
    assert.equal(result.ok, false);
    assert.match(result.failures.join("\n"), /code-style-patterns/);
    assert.match(result.failures.join("\n"), /in-progress/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("fails when in-progress is missing", async () => {
  const root = await makeKit();
  await rm(join(root, "in-progress"), { recursive: true, force: true });
  try {
    const result = checkKitContract(root);
    assert.equal(result.ok, false);
    assert.match(result.failures.join("\n"), /in-progress/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("fails when root contracts differ", async () => {
  const root = await makeKit(async (kit) => {
    await writeFile(join(kit, "AGENTS.md"), "different contract\n");
  });
  try {
    const result = checkKitContract(root);
    assert.equal(result.ok, false);
    assert.match(result.failures.join("\n"), /identical/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("fails when AGENTS.md is missing", async () => {
  const root = await makeKit();
  await rm(join(root, "AGENTS.md"));
  try {
    const result = checkKitContract(root);
    assert.equal(result.ok, false);
    assert.match(result.failures.join("\n"), /AGENTS\.md/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("fails when CLAUDE.md is missing", async () => {
  const root = await makeKit();
  await rm(join(root, "CLAUDE.md"));
  try {
    const result = checkKitContract(root);
    assert.equal(result.ok, false);
    assert.match(result.failures.join("\n"), /CLAUDE\.md/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("fails when .agents/skills is present", async () => {
  const root = await makeKit(async (kit) => {
    await mkdir(join(kit, ".agents/skills/other"), { recursive: true });
    await writeFile(join(kit, ".agents/skills/other/SKILL.md"), "---\nname: other\n---\n");
  });
  try {
    const result = checkKitContract(root);
    assert.equal(result.ok, false);
    assert.match(result.failures.join("\n"), /\.agents\/skills/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("fails when code-style-patterns is not a tooling skill", async () => {
  const root = await makeKit();
  await rm(join(root, "plugins/tooling/skills/code-style-patterns"), {
    recursive: true,
    force: true,
  });
  try {
    const result = checkKitContract(root);
    assert.equal(result.ok, false);
    assert.match(result.failures.join("\n"), /code-style-patterns/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("fails when a skill name appears twice", async () => {
  const root = await makeKit(async (kit) => {
    const copy = join(kit, "plugins/documentation/skills/code-style-patterns");
    await mkdir(copy, { recursive: true });
    await writeFile(join(copy, "SKILL.md"), "---\nname: code-style-patterns\n---\n");
  });
  try {
    const result = checkKitContract(root);
    assert.equal(result.ok, false);
    assert.match(result.failures.join("\n"), /code-style-patterns/);
    assert.match(result.failures.join("\n"), /more than once/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("passes for a valid plugin-only tree", async () => {
  const root = await makeKit();
  try {
    const result = checkKitContract(root);
    assert.deepEqual(result, { ok: true, failures: [] });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("passes for this kit", () => {
  const result = checkKitContract(repoRoot);
  assert.deepEqual(result, { ok: true, failures: [] });
});

test("fails when scalekit-code-doctor is under plugins", async () => {
  const root = await makeKit(async (kit) => {
    const doctor = join(kit, "plugins/tooling/skills/scalekit-code-doctor");
    await mkdir(doctor, { recursive: true });
    await writeFile(join(doctor, "SKILL.md"), "---\nname: scalekit-code-doctor\n---\n");
  });
  try {
    const result = checkKitContract(root);
    assert.equal(result.ok, false);
    assert.match(result.failures.join("\n"), /scalekit-code-doctor/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
