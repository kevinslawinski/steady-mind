# Deployment Guide

## GitHub Pages Deployment

This application uses GitHub Actions for automated deployment to GitHub Pages.

### How It Works

**Two-Stage Workflow:**

1. **CI Pipeline** (`.github/workflows/pipeline.yml`)
   - Runs on pushes to `main` and PRs targeting `main`
   - Parallel jobs: `lint`, `build`, `test`, and `all-checks` (summary)
   - Uploads build artifacts on success (7-day retention)

2. **Deploy** (`.github/workflows/deploy.yml`)
   - Automatically triggers after successful CI Pipeline on `main`
   - Downloads and verifies build artifacts
   - Deploys to GitHub Pages: `https://kevinslawinski.github.io/steady-mind`
   - Supports manual deployment with optional run ID

**Result:** Every push to `main` that passes all checks automatically deploys within minutes.

### First-Time Setup

To enable automatic deployment:

1. Go to repository **Settings** → **Pages**
2. Under "Source", select **GitHub Actions**
3. Push to `main` (or merge a PR) to trigger the first deployment
4. Monitor progress in the **Actions** tab

### Manual Deployment

Via GitHub Actions workflow_dispatch:

1. Go to **Actions** tab
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. **(Optional)** Enter a specific Run ID to deploy a previous build, or leave empty to deploy the latest successful build
5. Click "Run workflow" button

**Note:** The deploy workflow will automatically find and use artifacts from the most recent successful CI Pipeline run on `main` if no Run ID is specified.

### Testing Locally

Test the production build:

```bash
npm run build-gh
npx http-server dist/steady-mind/browser -p 8080
```

### Development Workflow

**Pull Requests:**

- Full CI Pipeline runs on all PRs targeting `main`
- All checks must pass; artifacts created but not deployed

**Direct Pushes to Main:**

- Triggers CI Pipeline → automatic deployment on success

**Branch Protection (Recommended):**

- Require status checks before merging
- Require PR reviews
- Prevent direct pushes to `main`

### Workflow Details

**CI Pipeline (Node.js 24.x, Ubuntu):**

- **Parallel Jobs:** Lint (5 min) | Build (10 min) | Test (10 min) | All Checks (1 min)
- **Performance Features:**
  - `node_modules` caching across jobs
  - Playwright browser caching (test job)
  - Concurrency control cancels outdated runs
- **All Checks Job:** Ensures lint, build, and test all succeed before passing

**Deploy Workflow:**

- **Smart Artifact Resolution:** Matches artifacts by commit SHA
- **Manual Dispatch:** Can specify past run ID or use latest successful build
- **Output:** Deployment summary with URL, commit SHA, and run ID

### Troubleshooting

**Common Issues:**

- **Pipeline fails:** Check Actions tab to see which job failed (lint, build, or test)
- **Lint/Build/Test errors:** Run `npm run lint`, `npm run build-gh`, or `npm run test:no-watch` locally
- **Deployment not triggered:** Verify CI Pipeline completed successfully on `main`
- **Artifact not found:** Artifacts expire after 7 days; check CI Pipeline uploaded them
- **Manual deploy fails:** Ensure run ID is from a successful CI Pipeline run on `main`

**Setup Verification:**

- GitHub Pages source set to "GitHub Actions" (Settings → Pages)
- All workflow files present in `.github/workflows/`

**Performance Notes:**

- First runs are slower while caches populate
- Subsequent runs use cached `node_modules` and Playwright browsers
