# Changesets

Record a plugin version bump here. Do not edit `plugin.json` version by hand.

```bash
npm run changeset
```

Apply recorded bumps and copy them into each plugin manifest:

```bash
npm run version
```

The three packages are `documentation`, `tooling`, and `dev-gtm`.
