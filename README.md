# Wedding Invitation

React + TypeScript project scaffolded with Vite.

## Content Source

Most invitation copy, dates, venue details, route labels, gallery text, map guidance, registry text, and RSVP settings live in `src/content/invitation.ts`.

Your personal follow-up reminder is tracked in `TODO.md`.

## GitHub Pages

This repository is configured to deploy to GitHub Pages with GitHub Actions.

- Current repository URL: `https://apsmono.github.io/wedding-invitation/`
- Workflow: `.github/workflows/deploy.yml`
- Deploy base path: controlled by `VITE_BASE_PATH`

### Free Deployment Summary

The zero-cost deployment path is to use the default GitHub Pages URL.

- GitHub Pages is free for public repositories.
- A custom domain is optional and usually costs money because you must own the domain.
- If you do not want any paid service, do not set `PAGES_CNAME` and keep the default `github.io` address.

### First-Time Setup

1. Push the repository to GitHub.
2. Open `Settings -> Pages`.
3. Set `Build and deployment -> Source` to `GitHub Actions`.
4. Push to `main` or run the workflow manually from the Actions tab.

### Publish On GitHub Pages Right Now

Use these clicks in GitHub for the current free Pages setup:

1. Open the repository on GitHub.
2. Click `Settings`.
3. In the left sidebar, click `Pages`.
4. Under `Build and deployment`, open the `Source` dropdown.
5. Select `GitHub Actions`.
6. Click `Actions` in the top repository navigation.
7. Click `Deploy static content to Pages`.
8. Click `Run workflow`.
9. Click the green `Run workflow` button in the dropdown.
10. Wait for the workflow to finish, then open the deployed site URL from the run summary.

### Current Repository URL

The workflow defaults to the current project-site path automatically.

- Build base path: `/wedding-invitation/`
- Published URL: `https://apsmono.github.io/wedding-invitation/`

If the repository is private and you want a zero-cost deployment, the GitHub Pages workaround is to make the repository public before enabling Pages.

### Custom Domain

To deploy the same site behind a custom domain, add these repository variables in GitHub:

- `PAGES_BASE_PATH` = `/`
- `PAGES_CNAME` = your domain, for example `invite.example.com`

Then add the same custom domain in `Settings -> Pages` and configure the required DNS records with your DNS provider.

When `PAGES_CNAME` is set, the deployment workflow writes a `CNAME` file into `dist` automatically.

Skip this section entirely if you want a fully free setup.

### Shorter URL By Renaming The Repository

If you want a shorter `github.io` URL without using a custom domain, rename the repository.

- Current repository name: `wedding-invitation`
- Example shorter names: `invite`, `wedding`, `wi`
- URL pattern after rename: `https://apsmono.github.io/<new-repository-name>/`

Exact rename to get a shorter URL example:

1. Rename the GitHub repository from `wedding-invitation` to `invite`.
2. The deployed URL becomes `https://apsmono.github.io/invite/`.
3. Optionally update `package.json` `name` to `invite` so local production builds use the same default path outside GitHub Actions.
4. Push a new commit or rerun the Pages workflow.

### Free Shorter-URL Workaround

If you want the shortest free GitHub Pages URL, use a user site repository instead of a project site repository.

1. Create or rename a public repository to `apsmono.github.io`.
2. Publish this app from that repository.
3. The site URL becomes `https://apsmono.github.io/`.

That avoids a paid custom domain and is shorter than any project-site URL.

This repo is now ready for that move:

- The Vite config treats any repository ending in `.github.io` as a root deployment.
- The GitHub Pages workflow automatically switches the build base path to `/` for a user-site repository.

To move this project into a free `apsmono.github.io` repository:

1. Create a new public repository named `apsmono.github.io`, or rename the existing repository to that exact name.
2. Push this code into that repository.
3. Open `Settings -> Pages` in that repository.
4. Set `Source` to `GitHub Actions`.
5. Run the `Deploy static content to Pages` workflow.
6. Open `https://apsmono.github.io/` after the workflow completes.

Optional cleanup after the move:

1. Update `package.json` `name` to `apsmono.github.io` if you want local `npm run build` output to default to `/` as well.
2. Keep `PAGES_CNAME` unset unless you later buy a custom domain.

### Other Free Deployment Services

If you do not want to rely on GitHub Pages, these also have free tiers for static frontend hosting:

- Cloudflare Pages
- Netlify

For this repository, GitHub Pages is still the simplest free option because the workflow is already configured.

## Cloudflare Pages Backup

This repository also includes a minimal Cloudflare Pages configuration in `wrangler.jsonc`.

- Cloudflare config file: `wrangler.jsonc`
- Root-base build script: `npm run build:root`
- Direct deploy script: `npm run deploy:cloudflare`

### Publish On Cloudflare Pages

Use these clicks in Cloudflare if you want a free backup host:

1. Sign in to Cloudflare.
2. Open the left navigation and click `Workers & Pages`.
3. Click `Create`.
4. Choose `Pages`.
5. Choose `Connect to Git`.
6. Authorize GitHub if Cloudflare asks.
7. Select the repository.
8. In build settings, set `Framework preset` to `Vite` if it is not auto-detected.
9. Set `Build command` to `npm run build:root`.
10. Set `Build output directory` to `dist`.
11. Click `Save and Deploy`.

If you prefer direct uploads instead of Git integration:

1. Run `npm run build:root` locally.
2. Run `npm run deploy:cloudflare`.
3. Follow the Wrangler login and project prompts.

## Scripts

- `npm install` installs dependencies.
- `npm run dev` starts the local development server.
- `npm run build` runs TypeScript project build checks and creates a production bundle.
- `npm run lint` runs ESLint.
- `npm run preview` serves the built app locally.

## AI-Friendly Repository Files

- `.github/copilot-instructions.md` defines the repository-wide AI working rules.
- `.github/coordination/` contains the shared task board and handoff log for parallel AI work.
- `.github/agents/` contains reusable worker agents for coordination-aware execution.
- `.github/prompts/` contains prompt shortcuts for planning slices, running tasks, and recording handoffs.
- `AGENTS.md` gives agents and collaborators a quick project guide.
- `CHANGELOG.md` tracks notable changes.
- `.gitmessage` provides a reusable AI commit template for Git.
- `.vscode/tasks.json` adds workspace tasks for `dev`, `build`, and `lint`.
- `.vscode/launch.json` lets VS Code start Chrome against the local Vite app.
- `.github/pull_request_template.md` mirrors the AI summary format for pull requests.

## AI Execution Workflow

Use this repository workflow for AI-driven changes:

1. Read before action: review all applicable instruction files, the active coordination files, nearby implementation files, and any instructions that apply to the slice.
2. Change only the claimed scope.
3. Validate the result.
4. Write after action: update `board.md`, `handoffs.md`, and workflow docs when the change affects process or setup.
5. Commit and push each completed change using the AI commit format.

Documentation expectation:
Always document completed changes that affect behavior, setup, workflow, deployment, or content ownership. At minimum, update `README.md` and `CHANGELOG.md` when those surfaces are affected.

## Git Branches And Tags

- Published branch: `main`
- Integration branch: `development`
- Milestone tags: annotated release tags on meaningful snapshots

Current milestone tags:

- `v0.0.0`: initial app scaffold baseline
- `v0.1.0`: invitation guest experience, hosting workflow, and AI coordination baseline

## AI Commit Format

Use the following format for AI-assisted commits:

```text
<type>(<scope>): <short summary>

Files:
- add: path/to/new-file
- modify: path/to/existing-file
- remove: path/to/deleted-file

Changes:
- short statement of the main change
- short statement of the reason or impact
```

Recommended commit types: `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `build`, `chore`.

To use the provided template with Git:

```bash
git config commit.template .gitmessage
```

## Debugging

Use the `Debug Wedding Invitation` launch configuration in VS Code to start the Vite dev server and open the app in a debugger-attached Chrome session.

## Invitation Workflow

The invitation now uses a multi-page guest flow powered by `HashRouter`, which keeps public routing compatible with GitHub Pages and other static hosts.

Guest journey:

1. `/#/` shows the welcome page with the hero section, invitation summary, and live countdown.
2. `/#/celebration` shows the event details, schedule, and gallery section.
3. `/#/guest-guide` shows the map and travel guidance, support contact, and gift registry notes.
4. `/#/rsvp` collects guest responses through the RSVP form.
5. `/#/thanks` shows the confirmation summary after form submission.

## RSVP Handling

The current RSVP form validates required fields and saves the response in browser `localStorage`.

- This is enough for preview and demo use.
- Public guests can complete the flow, but their response is only stored on their own device right now.
- To receive centralized RSVPs, connect the form to a real service such as Formspree, Supabase, Firebase, Airtable automation, or your own API endpoint.

## Public Access

The current public base URL is:

- `https://apsmono.github.io/wedding-invitation/`

Because the app uses hash-based routes, direct public links look like this:

- Welcome: `https://apsmono.github.io/wedding-invitation/#/`
- Celebration: `https://apsmono.github.io/wedding-invitation/#/celebration`
- Guest Guide: `https://apsmono.github.io/wedding-invitation/#/guest-guide`
- RSVP: `https://apsmono.github.io/wedding-invitation/#/rsvp`

How to publish for public users:

1. Push the repository to GitHub.
2. In GitHub `Settings -> Pages`, choose `GitHub Actions` as the source.
3. Push to `main` or run the deploy workflow.
4. Share the final GitHub Pages URL with guests.

Before sharing publicly, replace the placeholder names, date, venue, email links, and registry details in `src/content/invitation.ts`.

## Changelog Workflow

Add entries to `CHANGELOG.md` whenever a change affects behavior, tooling, developer workflow, or project documentation.

## Parallel AI Coordination

When multiple agents are working in this repo at the same time:

1. Read `.github/coordination/roadmap.md`, `.github/coordination/board.md`, and `.github/coordination/handoffs.md` first.
2. Claim a task row with your owner name, status, and exact file scope.
3. Avoid overlapping file claims for active tasks.
4. Append concise handoffs as you reach checkpoints or blockers, and write a final handoff after the slice completes.
5. Commit and push the completed slice after validation.

Use `.github/coordination/README.md` for the full protocol and templates. Use `.github/prompts/run-roadmap-slice.prompt.md` and `.github/prompts/record-handoff.prompt.md` for consistent worker execution.
