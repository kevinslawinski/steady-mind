# Reusable GitHub Actions Workflow Library

This document describes the strategy for sharing CI/CD workflows across all of
`kevinslawinski`'s GitHub repositories through a centralized, parameterized
workflow library.

## Why a shared library?

Every project deserves the same quality CI: parallelised lint/build/test,
aggressive caching, SHA-keyed artifacts, and clean deploy-from-artifact
pipelines. Without a library those ~300 lines get copy-pasted and quietly
drift out of sync. A reusable workflow library means:

- **One fix, all repos benefit** — update the library, re-run any caller.
- **Tiny caller files** — consuming repos have 20-30 line files that just pass parameters.
- **Consistent quality gates** — branch protection rules target the same job name everywhere.

---

## How GitHub reusable workflows work

```
Your repo                         kevinslawinski/workflows (public)
─────────────────                 ──────────────────────────────────────────
.github/workflows/
  pipeline.yml      ─── uses: ──► .github/workflows/ci.yml@main
  deploy.yml        ─── uses: ──► .github/workflows/deploy-github-pages.yml@main
```

- The library repo **must be public** (required for cross-repo `uses` on the free plan).
- The consuming repo can be public **or private** — any visibility works.
- Inputs/outputs/secrets flow through the `with:` / `secrets:` blocks.
- The caller sets the triggers (`push`, `pull_request`, `workflow_run`, etc.). The reusable workflow only has `on: workflow_call`.

---

## Library repository

**Location**: `kevinslawinski/workflows` 

The files staged in [`workflow-library/`](../workflow-library/) in this repo
are the exact contents to push there.

### Library structure

```
.github/
  workflows/
    ci.yml                          ← Lint + Build + Test (parallel, cached)
    deploy-github-pages.yml         ← GitHub Pages deployment
    deploy-cloudflare-pages.yml     ← Cloudflare Pages deployment (future)
examples/
  angular-app/
    pipeline.yml                    ← Caller template for Angular + Playwright
    deploy-github-pages.yml         ← Caller template: GitHub Pages deployment
    deploy-cloudflare-pages.yml     ← Caller template: Cloudflare deployment
  basic-node/
    pipeline.yml                    ← Caller template: Node/TS, no Playwright
  private-repo/
    pipeline.yml                    ← Caller template: CI-only (no deployment)
README.md
```

---

## Publishing the library (one-time setup)

```bash
# 1. Create a new public repository on GitHub named "workflows"
#    (github.com/new → owner: kevinslawinski → name: workflows → Public)

# 2. Clone the new repo locally
git clone https://github.com/kevinslawinski/workflows.git
cd workflows

# 3. Copy the staged library files from steady-mind
cp -r /path/to/steady-mind/workflow-library/. .

# 4. The reusable workflow files must live at .github/workflows/
mkdir -p .github/workflows
mv reusable-ci.yml                      .github/workflows/ci.yml
mv reusable-deploy-github-pages.yml     .github/workflows/deploy-github-pages.yml
mv reusable-deploy-cloudflare-pages.yml .github/workflows/deploy-cloudflare-pages.yml

# 5. Push
git add .
git commit -m "feat: initial reusable workflow library"
git push origin main
```

---

## Migrating steady-mind to use the library

Once the library repo is live, replace the current self-contained workflow
files with the slim caller versions from `workflow-library/examples/angular-app/`.

### Step 1 — Replace `pipeline.yml`

```yaml
# .github/workflows/pipeline.yml
name: CI Pipeline

on:
  push:
    branches: ['main']
  pull_request:
    branches: ['main']
    types: [opened, synchronize, reopened]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  ci:
    uses: kevinslawinski/workflows/.github/workflows/ci.yml@main
    with:
      node-version: '24.x'
      build-command: 'npm run build-gh'
      build-output-path: './dist/steady-mind/browser'
      lint-command: 'npm run lint'
      test-command: 'npm run test:no-watch'
      playwright-package: '@vitest/browser-playwright'
```

### Step 2 — Replace `deploy.yml`

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  workflow_run:
    workflows: ['CI Pipeline']
    types: [completed]
    branches: [main]
  workflow_dispatch:
    inputs:
      run_id:
        description: 'Run ID to deploy (leave empty for latest successful)'
        required: false
        type: string

permissions:
  contents: read
  actions: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  deploy:
    if: |
      github.event_name == 'workflow_dispatch' ||
      github.event.workflow_run.conclusion == 'success'
    uses: kevinslawinski/workflows/.github/workflows/deploy-github-pages.yml@main
    permissions:
      contents: read
      actions: read
      pages: write
      id-token: write
    with:
      event-name: ${{ github.event_name }}
      workflow-run-id: ${{ github.event.workflow_run.id }}
      manual-run-id: ${{ inputs.run_id }}
      ci-workflow-filename: 'pipeline.yml'
    secrets: inherit
```

> **Behaviour is identical** — the reusable workflows are extracted verbatim
> from the current self-contained files with inputs added for customisation.

---

## Using the library in a new project

### Public repo → GitHub Pages

```bash
# Copy the two caller files
curl -O https://raw.githubusercontent.com/kevinslawinski/workflows/main/examples/angular-app/pipeline.yml
curl -O https://raw.githubusercontent.com/kevinslawinski/workflows/main/examples/angular-app/deploy-github-pages.yml

# Place them
mkdir -p .github/workflows
mv pipeline.yml .github/workflows/
mv deploy-github-pages.yml .github/workflows/deploy.yml

# Edit build-output-path in pipeline.yml → your project name
# Enable Pages in GitHub repo settings (Settings → Pages → Source → GitHub Actions)
```

### Private repo (CI only)

Use `examples/private-repo/pipeline.yml`. No deploy file needed. Artifacts
are retained in GitHub Actions for manual download.

### Any repo → Cloudflare Pages (future)

1. Create Cloudflare Pages project.
2. Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets.
3. Use `examples/angular-app/deploy-cloudflare-pages.yml` as your `deploy.yml`.
4. Change `build-command` to `npm run build` (no `--base-href` needed).

---

## Deployment options at a glance

| Host                 | Public repos | Private repos | Custom domain           | Status               |
| -------------------- | ------------ | ------------- | ----------------------- | -------------------- |
| **GitHub Pages**     | ✅ Free      | ❌            | ✅ CNAME                | ✅ Available now     |
| **Cloudflare Pages** | ✅ Free      | ✅ Free       | ✅ Automatic via CF DNS | 🔜 Stub ready        |
| **Vercel / Netlify** | ✅ Free tier | Limited       | ✅                      | Future consideration |

---

## Build command per host

| Target host                  | `build-command`    | Why                              |
| ---------------------------- | ------------------ | -------------------------------- |
| GitHub Pages (project site)  | `npm run build-gh` | Sets `--base-href /steady-mind/` |
| GitHub Pages (user org site) | `npm run build`    | Root URL                         |
| Cloudflare Pages             | `npm run build`    | CF serves from root              |

---

## Version pinning strategy

| `uses` ref       | Stability      | Use when           |
| ---------------- | -------------- | ------------------ |
| `@main`          | Rolling latest | Active development |
| `@v1`            | Stable release | Production pinning |
| `@abc1234` (SHA) | Immutable      | Audit / compliance |

---

## Future enhancements

- [ ] PR preview deployments (Cloudflare preview channels)
- [ ] Test coverage reporting as PR comment
- [ ] Lighthouse CI audit step (optional input)
- [ ] Multi-node-version matrix testing (optional input)
- [ ] Slack/Discord deployment notifications
- [ ] `@v1` tag on library after steady-mind migration is verified
