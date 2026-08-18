---
title: 'Switch package manager from npm to pnpm'
type: 'chore'
created: '2026-08-17T22:11:00-03:00'
status: 'done'
route: 'one-shot'
---

# Switch package manager from npm to pnpm

## Intent

**Problem:** Project was using `npm` with a `package-lock.json`, but `pnpm` is requested as the project's package manager.

**Approach:** Import lockfile using `pnpm import`, remove `package-lock.json`, generate `pnpm-lock.yaml`, approve required native build scripts in `pnpm-workspace.yaml`, and update project documentation (`README.md`).

## Suggested Review Order

1. [`pnpm-lock.yaml`](file://./pnpm-lock.yaml) — Generated lockfile replacing package-lock.json.
2. [`pnpm-workspace.yaml`](file://./pnpm-workspace.yaml) — Approved build scripts (`esbuild`, `sharp`).
3. [`README.md`](file://./README.md#L23-L37) — Updated installation and run commands from npm to pnpm.
