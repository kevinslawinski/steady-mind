# GitHub Actions Pipeline Improvements

## Summary of Changes

### Build & Test Pipeline

| Improvement              | Current State                | New Approach             | Time/Cost Impact       |
| ------------------------ | ---------------------------- | ------------------------ | ---------------------- |
| **Job Parallelization**  | Sequential lint→build→test   | Parallel execution       | ~50% faster            |
| **node_modules Caching** | npm ci every job (~60s)      | Shared cache across jobs | -50-55s per job        |
| **Playwright Caching**   | Downloads every run (~200MB) | Cache between runs       | -30-60s per run        |
| **Matrix Strategy**      | Single version matrix        | Direct specification     | -10s overhead          |
| **Artifact Retention**   | 1 day                        | 7 days                   | Enables manual deploys |
| **Concurrency Control**  | None                         | Cancel outdated runs     | Saves runner minutes   |
| **Timeouts**             | None (infinite)              | Job-specific limits      | Prevents hung jobs     |
| **Artifact Naming**      | Generic name                 | SHA-based naming         | Better traceability    |

### Deploy Pipeline

| Improvement               | Current State        | New Approach          | Time/Cost Impact   |
| ------------------------- | -------------------- | --------------------- | ------------------ |
| **Manual Dispatch**       | Full rebuild (~3min) | Reuse artifacts       | -100% build time   |
| **Run Selection**         | Latest only          | Specify any run       | Deploy any build   |
| **Deployment Tracking**   | Basic logs           | Rich summary w/ SHA   | Better visibility  |
| **Error Messages**        | Generic              | Detailed with context | Faster debugging   |
| **Artifact Verification** | Basic check          | Comprehensive listing | Catch issues early |

## Detailed Improvements

### 1. Avoid Duplicate Workflow Runs

**Problem**: Pushing to a PR branch triggers workflow twice - once for `push` event, once for `pull_request` event.

**Old configuration:**

```yaml
on:
  push:
    branches: ['main', 'feature/**'] # Fires on feature push
  pull_request:
    branches: ['main'] # Also fires on PR
```

**Impact**: When you push to a feature branch with an open PR, you get:

- Run #1: `push` event (feature/\*\* matches)
- Run #2: `pull_request` event (PR targeting main)
- **Result**: Double the CI costs, double the wait time, cluttered checks

**Solution**: Only use `push` for main branch, `pull_request` for all PRs:

```yaml
on:
  push:
    branches: ['main'] # Only merged code
  pull_request:
    branches: ['main'] # All PRs
    types: [opened, synchronize, reopened]
```

**Benefits:**

- ✅ PRs run once per push
- ✅ Main branch runs on merge
- ✅ 50% fewer workflow runs
- ✅ Cleaner GitHub checks UI
- ⚠️ Feature branches without PRs don't run CI (typically desired behavior)

### 2. Job Parallelization Strategy

**Rationale**: Build and test are independent operations. Running them in parallel provides faster feedback.

**Benefits**:

- Developers get test results while build is running
- Failed lints prevent wasting resources on build/test
- Overall pipeline completion: ~3-4 minutes instead of 5-6 minutes

**Trade-off**: Uses more concurrent runners (usually not an issue for free tier)

### 3. Playwright Browser Caching

**Problem**: Browsers are large (~200MB for Chromium) and downloaded every run.

**Solution**: Cache based on Playwright version hash.

**Impact**:

- First run: Same time (downloads and caches)
- Subsequent runs: -30-60 seconds
- Cache invalidates automatically when version changes

**Cache key**: `playwright-{os}-{version}` ensures correct binaries.

### 4. node_modules Caching Between Jobs

**Problem**: Each parallel job runs `npm ci`, which installs ~300-500 packages and takes 50-60 seconds per job.

**Solution**: Cache the entire `node_modules` directory based on `package-lock.json` hash, shared across all jobs.

```yaml
- name: Cache node_modules
  uses: actions/cache@v4
  id: node-modules-cache
  with:
    path: node_modules
    key: node-modules-${{ runner.os }}-${{ hashFiles('package-lock.json') }}
    restore-keys: |
      node-modules-${{ runner.os }}-

- name: Install dependencies
  if: steps.node-modules-cache.outputs.cache-hit != 'true'
  run: npm ci
```

**Impact**:

- First job: Installs dependencies normally (~60s), saves to cache
- Parallel jobs: Restore from cache (~5-10s) instead of running `npm ci`
- Subsequent runs: All jobs use cache until dependencies change
- **Saves ~50-55 seconds per job** on cache hit

**Why this vs npm's cache?**

- `cache: 'npm'` in setup-node only caches npm's download directory (~/.npm)
- This speeds up npm downloads but still requires full installation
- Caching `node_modules` skips both download AND installation

### 5. Concurrency Groups

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

**Scenario**: You push commit A, then quickly push commit B to the same branch.

**Without concurrency control**: Both pipelines run to completion (~10 runner-minutes wasted)

**With concurrency control**: First pipeline cancels, only second completes (~5 runner-minutes saved)

### 6. SHA-Based Artifact Naming

**Current**: `build-artifacts`  
**Improved**: `build-a1b2c3d...`

**Benefits**:

- Can't accidentally deploy wrong build
- Multiple builds can coexist
- Clear traceability in logs
- Enables deploying any previous build

### 7. Smart Manual Deployment

**Current workflow for manual deploy**:

1. Trigger manual deploy
2. Checkout code
3. Install dependencies (~60s)
4. Build application (~90s)
5. Upload to Pages
6. **Total: ~3 minutes, redundant work**

**Improved workflow**:

1. Trigger manual deploy (optionally specify run ID)
2. Download pre-built artifacts (~10s)
3. Upload to Pages
4. **Total: ~30 seconds, reuses existing build**

**Advanced use case**: Deploy last week's build

```bash
# Find the run ID you want to deploy
gh run list --workflow="Build & Test" --branch=main --limit=10

# Deploy that specific build
gh workflow run deploy.yml -f run_id=123456789
```

### 8. Job Timeouts

Prevents scenarios where:

- Hung tests run for 6 hours (uses 360 runner-minutes)
- Network issues cause indefinite waiting
- Accidentally infinite loops in build scripts

**Timeout values**:

- Lint: 5 minutes (typically <1 minute)
- Build: 10 minutes (typically 2-3 minutes)
- Test: 10 minutes (typically 1-2 minutes)
- Deploy: 10 minutes (typically 1-2 minutes)

### 9. Comprehensive Status Checks

**New `all-checks` job**: Single status check that depends on all others.

**Benefits**:

- Branch protection rule: require 1 job instead of 3
- Clear pass/fail indication
- Better for automation/bots

## Migration Path

```bash
# Rename old files as backup
mv .github/workflows/build-and-test.yml .github/workflows/build-and-test.old.yml
mv .github/workflows/deploy.yml .github/workflows/deploy.old.yml

# Rename improved files
mv .github/workflows/build-and-test-improved.yml .github/workflows/build-and-test.yml
mv .github/workflows/deploy-improved.yml .github/workflows/deploy.yml
```

## Cost/Performance Analysis

**Typical PR workflow**:

- **Before**: 5-6 minutes, 5-6 runner-minutes
- **After (with all caching)**: 2-3 minutes (parallel + caching), ~3-4 runner-minutes
- **Savings**: 50-60% faster feedback to developers

**Manual deployment**:

- **Before**: ~3 minutes to rebuild and deploy
- **After**: ~30 seconds to deploy pre-built artifact
- **Savings**: 83% faster

**Cache benefits** (after first run):

- **Playwright browsers**: -30-60 seconds per test run
- **node_modules**: -50-55 seconds per job (×3 jobs = ~2.5-3 minutes saved per workflow)
- **Combined**: First run establishes cache, subsequent runs are dramatically faster
- **Over 100 runs**: 250-350 minutes saved (~4-6 hours)

## Optional Future Enhancements

### 1. PR Preview Deployments

Deploy PR builds to `pr-{number}.steady-mind.pages.dev` for testing before merge.

### 2. Test Coverage Reporting

Add coverage reports to PR comments showing test coverage changes.

### 3. Lighthouse CI

Automated performance, accessibility, and SEO audits on every build.

### 4. ~~Dependency Caching~~ ✅ IMPLEMENTED

Cache `node_modules` between jobs for even faster setup.

**Status**: Fully implemented with package-lock.json-based caching, saves ~50-55s per job.

### 5. Matrix Testing

Test against multiple Node versions if supporting older LTS versions.

### 6. Slack/Discord Notifications

Notify team of deployment status.

## Checklist Before Switching

- [x] Review improved workflow files
- [x] Verify artifact names match between workflows
- [x] Implement node_modules caching
- [ ] Test manual deployment with run_id input
- [ ] Update branch protection rules if using `all-checks` job
- [ ] Monitor first few runs for issues
- [ ] Delete old workflow files after verification
