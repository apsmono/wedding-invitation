# Coordination Board

Update this file before editing shared project files.

## Available Status Values

- `todo`
- `in-progress`
- `blocked`
- `done`

## Roadmap Focus

- Current milestone: `F1` Invitation Landing MVP
- Source plan: `.github/coordination/roadmap.md`

## Active Tasks

| Task ID | Title                                     | Owner          | Status | Depends On                   | Claimed Files                                                                                                                                                                                                                                | Validation                      | Notes                                                                                                                    |
| ------- | ----------------------------------------- | -------------- | ------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| F1-A    | Invitation content model and copy seed    | GitHub Copilot | done   | none                         | `src/content/invitation.ts`                                                                                                                                                                                                                  | `npm run build`                 | Shared content model now includes normalized names, venue data, CTA links, RSVP deadline, and stable IDs                 |
| F1-B    | Global theme tokens and page frame        | GitHub Copilot | done   | none                         | `src/index.css`                                                                                                                                                                                                                              | `npm run build`                 | Shared visual system now defines surfaces, layout, spacing, radius, and motion tokens                                    |
| F1-C    | Hero section                              | GitHub Copilot | done   | F1-A, F1-B                   | `src/components/HeroSection.tsx`, `src/components/hero-section.css`                                                                                                                                                                          | `npm run build`                 | Reusable hero section now reads from the shared invitation content module                                                |
| F1-D    | Event details section                     | GitHub Copilot | done   | F1-A, F1-B                   | `src/components/DetailsSection.tsx`, `src/components/details-section.css`                                                                                                                                                                    | `npm run build`                 | Reusable details section now covers story, logistics, schedule, and RSVP guidance                                        |
| F1-E    | Decorative assets and supporting media    | GitHub Copilot | done   | F1-B                         | `src/assets/**`, `public/**`, `src/components/gallery-section.css`                                                                                                                                                                           | `npm run build`                 | Invitation-specific decorative assets and gallery styling scaffold are ready for final page assembly                     |
| F1-F    | Final page composition and CTA wiring     | GitHub Copilot | done   | F1-A, F1-B, F1-C, F1-D, F1-E | `src/App.tsx`, `src/App.css`                                                                                                                                                                                                                 | `npm run build`                 | The landing page now composes the extracted hero, decorative media, and details slices in place of the old inline markup |
| F1-G    | Coordination and delivery docs            | GitHub Copilot | done   | none                         | `README.md`, `CHANGELOG.md`, `AGENTS.md`, `.github/**`                                                                                                                                                                                       | `npm run build`                 | AI workflow docs now require reading all applicable instructions, always documenting completed changes, and using the documented git refs |
| F2-A    | Multi-page guest flow and RSVP experience | GitHub Copilot | done   | F1-F                         | `src/App.tsx`, `src/App.css`, `src/main.tsx`, `src/content/invitation.ts`, `src/index.css`, `package.json`, `package-lock.json`, `README.md`, `CHANGELOG.md`, `TODO.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md` | `npm run build`, `npm run lint` | Routed guest experience, RSVP demo form, personal TODO note, and public-access guide are now in place                    |
| T8      | Real names, exact date, and Firebase bootstrap | GitHub Copilot | in-progress | F2-A                     | `src/content/invitation.ts`, `src/App.tsx`, `package.json`, `package-lock.json`, `.env.example`, `src/lib/firebase.ts`, `README.md`, `CHANGELOG.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`                       | `npm run build`, `npm run lint` | Replace the couple and date, leave unfinished details blank-safe, and add Firebase app initialization scaffolding         |
| T5      | GitHub Pages deployment                   | GitHub Copilot | done   | none                         | `vite.config.ts`, `index.html`, `src/App.tsx`, `README.md`, `CHANGELOG.md`, `.github/workflows/deploy.yml`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`                                                              | `npm run build`                 | Pages base path, workflow, custom domain, and renamed-repo support                                                       |
| T6      | Free deployment guidance                  | GitHub Copilot | done   | T5                           | `README.md`, `CHANGELOG.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`                                                                                                                                             | `npm run build`                 | Clarify zero-cost deployment path and free workaround for shorter URLs                                                   |
| T7      | Free multi-host deployment                | GitHub Copilot | done   | T5, T6                       | `vite.config.ts`, `package.json`, `.github/workflows/deploy.yml`, `wrangler.jsonc`, `README.md`, `CHANGELOG.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`                                                         | `npm run build:root`            | Support `apsmono.github.io`, add Cloudflare Pages backup config, and document exact publish clicks                       |

## Parallel Start Now

- Start `F1-A` and `F1-B` immediately.
- After they are stable, `F1-C`, `F1-D`, and `F1-E` can run in parallel without overlapping file ownership.
- Reserve `F1-F` for the assembly worker after the slice tasks land.

## Claim Template

Copy a row and update it before starting a new slice.

| Task ID | Title           | Owner      | Status      | Depends On | Claimed Files                    | Validation      | Notes        |
| ------- | --------------- | ---------- | ----------- | ---------- | -------------------------------- | --------------- | ------------ |
| FX      | short task name | agent-name | in-progress | F1-A       | `path/to/file`, `path/to/dir/**` | `npm run build` | short intent |
