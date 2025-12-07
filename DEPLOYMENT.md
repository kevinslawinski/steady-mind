# Deployment Guide

## GitHub Pages Deployment

This application uses GitHub Actions for automated deployment to GitHub Pages.

### How It Works

**Two-Stage Workflow:**

1. **Build & Test** (`.github/workflows/build-and-test.yml`)

   - Runs on every push to `main` and `feature/**` branches
   - Installs dependencies, builds, and runs tests
   - If on `main` branch and tests pass, uploads build artifacts
   - Feature branches are tested but don't trigger deployment

2. **Deploy** (`.github/workflows/deploy.yml`)
   - Only runs after Build & Test completes successfully on `main`
   - Downloads build artifacts from the Build & Test workflow
   - Deploys to GitHub Pages
   - Also supports manual deployment via workflow_dispatch

**Result:** Every push to `main` that passes tests automatically deploys to `https://kevinslawinski.github.io/steady-mind`

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
3. Click "Run workflow" → Select `main` branch
4. Click "Run workflow" button

### Testing Locally

Test the production build:

```bash
npm run build-gh
npx http-server dist/steady-mind/browser -p 8080
```

### Workflow Details

**Build & Test Workflow:**

- Node.js 24.x
- Runs `npm ci` for clean install
- Runs `npm run build-gh` for production build
- Runs `npm run test:no-watch` for tests
- Uploads artifacts only from `main` branch (retention: 1 day)

**Deploy Workflow:**

- Downloads artifacts from successful Build & Test run
- Verifies artifact integrity before deployment
- Uploads to GitHub Pages
- Deploys using GitHub's Pages API

### Troubleshooting

- Check Actions tab for workflow errors
- Verify GitHub Pages source is set to "GitHub Actions"
- Ensure tests pass locally before pushing
