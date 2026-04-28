# Handoffs

Append new entries at the top.

## 2026-04-28 17:22 | GitHub Copilot | T10

- Status: done
- Changed: `.env.example`, `README.md`, `CHANGELOG.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build`
- Notes: Documented the exact Firebase env keys, marked the Analytics measurement ID as optional, and clarified the Firebase Auth plus Firestore setup sequence for RSVP and dashboard usage.
- Next: `T9` is still blocked until the final venue, address, RSVP inbox, and planner contact details are available.

## 2026-04-28 17:19 | GitHub Copilot | T10

- Status: in-progress
- Changed: `.env.example`, `README.md`, `CHANGELOG.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: pending `npm run build`
- Notes: Tightening the Firebase setup docs so the env template, required keys, optional analytics key, Auth setup, and Firestore setup are explicit for the RSVP and dashboard flows.
- Next: Run `npm run build`, then mark `T10` done if the documentation-only slice is clean.

## 2026-04-27 23:06 | GitHub Copilot | T13

- Status: done
- Changed: `src/content/invitation.ts`, `src/App.tsx`, `src/components/AdminDashboard.tsx`, `src/App.css`, `src/index.css`, `src/assets/ornament-nusantara.svg`, `src/lib/firebase.ts`, `src/lib/dashboard.ts`, `CHANGELOG.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build`, `npm run lint`
- Notes: Converted the public invitation and dashboard to formal Indonesian, added Islamic phrasing and a slight Javanese tone, introduced an original ornamental SVG plus a greener gold-toned Nusantara visual treatment, and kept the Firebase-backed RSVP and admin flows working after translation.
- Next: Optional follow-up only if desired: reduce the production bundle size warning by splitting the dashboard into a separate async chunk.

## 2026-04-27 22:44 | GitHub Copilot | T12

- Status: done
- Changed: `src/App.tsx`, `src/App.css`, `src/components/AdminDashboard.tsx`, `src/lib/dashboard.ts`, `src/lib/firebase.ts`, `README.md`, `CHANGELOG.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build`, `npm run lint`
- Notes: Added Firebase email/password dashboard login at `/#/dashboard/login`, protected dashboard access at `/#/dashboard`, local invitation content overrides for live preview, and browser-stored version snapshots with restore controls.
- Next: Create Firebase admin user accounts, enable Email/Password auth in Firebase, and connect dashboard persistence to Firestore or another shared backend if you want dashboard changes to sync across devices.

## 2026-04-27 23:59 | GitHub Copilot | T11

- Status: done
- Changed: `src/App.tsx`, `src/lib/firebase.ts`, `src/content/invitation.ts`, `README.md`, `CHANGELOG.md`, `TODO.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build`, `npm run lint`
- Notes: Verified the live public celebration, guest-guide, and thanks routes; wired the RSVP flow to Firestore when Firebase is configured; retained local fallback for preview mode; and removed stale placeholder wording from the public invitation copy.
- Next: Provide the final venue name, city, full address, RSVP inbox email, planner contact email, and any map or registry details so `T9` can be completed.

## 2026-04-27 23:40 | GitHub Copilot | F1-G

- Status: done
- Changed: `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: documentation review
- Notes: Prepared the next work for other AI workers by splitting the post-`T8` follow-up into three non-overlapping tasks: final content pass (`T9`), Firebase setup/docs (`T10`), and RSVP backend wiring (`T11`).
- Next: Another AI can claim one of `T9`, `T10`, or `T11` without conflicting file ownership; `T11` should wait until the final content shape from `T9` is stable if the backend payload depends on it.

## 2026-04-27 23:30 | GitHub Copilot | F1-G

- Status: done
- Changed: `.github/copilot-instructions.md`, `AGENTS.md`, `README.md`, `CHANGELOG.md`, `.github/coordination/README.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build`, `npm run lint`
- Notes: Added an explicit coordination rule that AI workers must hold any branch change until other active AI work is finished or explicitly sequenced in the coordination files.
- Next: Future AI workers should pause before any branch switch and check `board.md` plus recent `handoffs.md` entries first.

## 2026-04-27 22:13 | GitHub Copilot | T8

- Status: done
- Changed: `src/content/invitation.ts`, `src/App.tsx`, `package.json`, `package-lock.json`, `.env.example`, `src/lib/firebase.ts`, `README.md`, `CHANGELOG.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build`, `npm run lint`
- Notes: Replaced the placeholder couple with Amalia Indah Palupi and Arif Eko Pramono, updated the invitation date to Monday, 1 Juni 2026, blanked unfinished venue and contact details with safe UI fallbacks, installed Firebase, and added `.env.example` plus a reusable Firebase app bootstrap module.
- Next: Create the real Firebase project, copy the Web App config into `.env`, and wire the RSVP flow to a backend service before public launch.

## 2026-04-27 23:28 | GitHub Copilot | F1-G

- Status: done
- Changed: `.github/copilot-instructions.md`, `AGENTS.md`, `README.md`, `CHANGELOG.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build`, `npm run lint`
- Notes: Created and pushed the `development` branch plus annotated milestone tags `v0.0.0` and `v0.1.0` after documenting the branch and tag workflow in the repository instructions.
- Next: Leave the unrelated working tree edits in the app files for the active feature task instead of mixing them into this workflow update.

## 2026-04-27 23:24 | GitHub Copilot | F1-G

- Status: done
- Changed: `.github/copilot-instructions.md`, `AGENTS.md`, `README.md`, `CHANGELOG.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build`, `npm run lint`
- Notes: Tightened the AI workflow so agents must read all applicable instruction files before acting, always document completed changes, and follow the documented branch and tag strategy.
- Next: Create the `development` branch and the milestone tags `v0.0.0` and `v0.1.0`, then push the refs.

## 2026-04-27 23:20 | GitHub Copilot | F1-G

- Status: in-progress
- Changed: `.github/copilot-instructions.md`, `AGENTS.md`, `README.md`, `CHANGELOG.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: pending `npm run build`
- Notes: Tightening the AI workflow so agents must read all applicable instruction files before acting, always write documentation for completed changes, and document the new branch and tag strategy.
- Next: Run `npm run build`, then create the `development` branch and milestone tags and mark the docs slice done.

## 2026-04-27 23:05 | GitHub Copilot | F2-A

- Status: done
- Changed: `src/App.tsx`, `src/App.css`, `src/main.tsx`, `src/content/invitation.ts`, `package.json`, `package-lock.json`, `README.md`, `CHANGELOG.md`, `TODO.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build`, `npm run lint`
- Notes: Converted the invitation into a hash-routed multi-page guest flow with welcome, celebration, guest guide, RSVP, and confirmation pages; added client-side RSVP draft and submit handling; documented the public route URLs and publishing workflow; and added a root TODO reminder for replacing placeholder wedding details.
- Next: Replace the placeholder names, venue, dates, email links, registry text, and map guidance in `src/content/invitation.ts`, then connect the RSVP form to a centralized backend or form service before public launch.

## 2026-04-27 22:27 | GitHub Copilot | F1-G

- Status: done
- Changed: `.github/copilot-instructions.md`, `AGENTS.md`, `README.md`, `CHANGELOG.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build`
- Notes: Updated the repository AI workflow so agents must read applicable context before acting, write back to coordination and docs after acting, and treat each completed change as a commit-and-push step.
- Next: Future agents should follow the new execution order in `.github/copilot-instructions.md` and the mirrored workflow summary in `README.md`.

## 2026-04-27 22:25 | GitHub Copilot | F1-G

- Status: in-progress
- Changed: `.github/copilot-instructions.md`, `AGENTS.md`, `README.md`, `CHANGELOG.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: pending `npm run build`
- Notes: Added explicit always-on AI workflow rules to read relevant context before acting, write updates back after acting, and treat each completed change as a commit-and-push unit.
- Next: Run `npm run build`, then mark the documentation slice done.

## 2026-04-27 22:23 | GitHub Copilot | F1-F

- Status: done
- Changed: `src/App.tsx`, `src/App.css`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build`
- Notes: Replaced the old inline page structure in `src/App.tsx` with the extracted hero and details slices plus a decorative gallery section, and reduced `src/App.css` to page-level composition and shared action styles.
- Next: Continue `F2-A` from the assembled landing page instead of from the old hardcoded layout.

## 2026-04-27 22:14 | GitHub Copilot | F1-E

- Status: done
- Changed: `src/assets/monogram-crest.svg`, `public/floral-divider.svg`, `src/components/gallery-section.css`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build`
- Notes: Added invitation-specific decorative SVG assets and a gallery section stylesheet scaffold so `F1-F` can compose branded media instead of starter visuals.
- Next: `F1-F` is the next open assembly slice, but it overlaps `src/App.tsx` and `src/App.css` already claimed by active task `F2-A`.

## 2026-04-27 22:08 | GitHub Copilot | F1-D

- Status: done
- Changed: `src/components/DetailsSection.tsx`, `src/components/details-section.css`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build`
- Notes: Extracted a reusable details section component with story, logistics cards, schedule list, and RSVP actions driven entirely by `src/content/invitation.ts`.
- Next: `F1-E` can focus on decorative media assets, and `F1-F` can assemble the page by importing the completed `F1-C` and `F1-D` components.

## 2026-04-27 22:05 | GitHub Copilot | F1-D

- Status: in-progress
- Changed: `src/components/DetailsSection.tsx`, `src/components/details-section.css`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: pending `npm run build`
- Notes: Started the details slice by extracting a reusable section for story, event logistics, schedule, and RSVP guidance directly from `src/content/invitation.ts`.
- Next: Run `npm run build`, then close `F1-D` if the component typechecks cleanly.

## 2026-04-27 22:03 | GitHub Copilot | F1-C

- Status: done
- Changed: `src/components/HeroSection.tsx`, `src/components/hero-section.css`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build`
- Notes: Extracted a reusable hero section that reads from the shared invitation content module and matches the established global visual tokens.
- Next: `F1-D` can mirror the same content-driven component pattern for the supporting sections.

## 2026-04-27 21:58 | GitHub Copilot | F1-C

- Status: in-progress
- Changed: `src/components/HeroSection.tsx`, `src/components/hero-section.css`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: pending `npm run build`
- Notes: Started the hero slice by extracting a standalone component that reads from `src/content/invitation.ts` and carries its own section stylesheet for later assembly.
- Next: Run `npm run build`, then either close `F1-C` or continue with `F1-D` as the next unassigned slice.

## 2026-04-27 21:56 | GitHub Copilot | F1-B

- Status: done
- Changed: `src/index.css`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build`
- Notes: Promoted the global stylesheet into a reusable visual system with shared tokens for surfaces, borders, spacing, radii, motion, focus, selection, and baseline element behavior.
- Next: `F1-C`, `F1-D`, and `F1-E` can build against the new tokens without redefining foundational values.

## 2026-04-27 22:00 | GitHub Copilot | T7

- Status: done
- Changed: `vite.config.ts`, `package.json`, `.github/workflows/deploy.yml`, `wrangler.jsonc`, `README.md`, `CHANGELOG.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build:root`
- Notes: Owner-site deployments now resolve to `/`, the GitHub Pages workflow handles `apsmono.github.io` automatically, and Cloudflare Pages has a repository-backed backup config plus direct-upload script.
- Next: Publish on free GitHub Pages now, or move the repo into `apsmono.github.io` for the shortest free URL and keep Cloudflare Pages as a zero-cost fallback.

## 2026-04-27 21:50 | GitHub Copilot | F1-B

- Status: in-progress
- Changed: `src/index.css`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: pending `npm run build`
- Notes: Promoted the global stylesheet into a reusable visual system with surface, border, shadow, spacing, radius, and motion tokens plus base element resets for downstream section work.
- Next: Run `npm run build`, then close `F1-B` and move to the next unassigned slice.

## 2026-04-27 21:37 | GitHub Copilot | F1-A

- Status: done
- Changed: `src/content/invitation.ts`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build`
- Notes: Refined the invitation content module into a reusable typed source with structured couple names, venue info, reusable CTA links, RSVP deadline text, and stable IDs for detail and schedule items.
- Next: `F1-B` can finalize the global theme, and `F1-C` plus `F1-D` can consume `src/content/invitation.ts` directly for hero and details rendering.

## 2026-04-27 21:35 | GitHub Copilot | F1-A

- Status: in-progress
- Changed: `src/content/invitation.ts`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: pending `npm run build`
- Notes: Reopened the content slice to normalize names, venue data, CTA types, and stable item IDs so downstream section workers can render without ad hoc shaping.
- Next: Run `npm run build`, then mark `F1-A` done with the refined model notes.

## 2026-04-27 21:20 | GitHub Copilot | F1-A

- Status: done
- Changed: `src/content/invitation.ts`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build`
- Notes: Added a typed invitation content source with names, venue, schedule, details, and RSVP copy extracted from the current page content for downstream section work.
- Next: Claim `F1-B` to stabilize theme tokens, then wire `F1-A` into section components during `F1-C`, `F1-D`, and `F1-F`.

## 2026-04-27 00:00 | GitHub Copilot | T6

- Status: done
- Changed: `README.md`, `CHANGELOG.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`
- Validated: `npm run build`
- Notes: Clarifying that GitHub Pages on a public repo is the zero-cost path, custom domains are optional and typically paid, and the shortest free GitHub Pages URL comes from a public `apsmono.github.io` repository.
- Next: Use the default GitHub Pages URL for zero cost, or move the site into a public `apsmono.github.io` repository if the shortest free URL matters more than keeping this repo name.

## 2026-04-27 00:10 | planner | F1-G

- Status: done
- Changed: `.github/coordination/roadmap.md`, `.github/coordination/board.md`, `.github/coordination/README.md`, `.github/agents/wedding-feature-worker.agent.md`, `.github/prompts/run-roadmap-slice.prompt.md`, `.github/prompts/plan-feature-pack.prompt.md`, `.github/prompts/record-handoff.prompt.md`, `README.md`, `AGENTS.md`, `CHANGELOG.md`
- Validated: `npm run build`
- Notes: Replaced the generic coordination buckets with a feature roadmap for the invitation landing MVP and added reusable worker entry points with a normalized handoff contract.
- Next: Assign owners to `F1-A` and `F1-B`, then start `F1-C`, `F1-D`, and `F1-E` once those foundation slices land.

## 2026-04-27 00:00 | GitHub Copilot | T5

- Status: done
- Changed: `vite.config.ts`, `index.html`, `src/App.tsx`, `README.md`, `CHANGELOG.md`, `.github/workflows/deploy.yml`, `.github/coordination/board.md`
- Validated: `npm run build`
- Notes: GitHub Pages deploy now defaults to the current repo path, supports custom domains through `PAGES_BASE_PATH=/` and `PAGES_CNAME`, and documents the exact repository rename path for a shorter `github.io` URL.
- Next: Enable `GitHub Actions` in repository `Settings -> Pages`, then push to `main` or run the deploy workflow.

## 2026-04-27 00:00 | setup | T4

- Status: done
- Changed: `.github/coordination/README.md`, `.github/coordination/board.md`, `.github/coordination/handoffs.md`, `.github/instructions/coordination-files.instructions.md`
- Validated: documentation review
- Notes: Established the shared coordination system for parallel AI work. Future agents should claim file scope in `board.md` before changing project files.
- Next: Assign concrete owners to the active tasks in `board.md` before parallel work begins.
