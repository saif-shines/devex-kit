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
  if (mutate) {
    await mutate(root);
  }
  return root;
}

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
