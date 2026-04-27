# Changelog

All notable project changes should be recorded in this file.

## Unreleased

### Added

- React + TypeScript + Vite project scaffold.
- AI collaboration instructions in `.github/copilot-instructions.md`.
- Repository agent guidance in `AGENTS.md`.
- Git commit template in `.gitmessage`.
- VS Code tasks for local dev, build, and lint.
- Shared multi-agent coordination files in `.github/coordination/` for task claims and handoffs.
- GitHub Pages deployment workflow for automated site publishing.
- VS Code launch configuration for browser debugging.
- Pull request template aligned with the AI change summary format.
- Custom worker assets in `.github/agents/` and `.github/prompts/` for running roadmap slices and recording handoffs.
- Cloudflare Pages backup configuration via `wrangler.jsonc` and root-base deployment scripts.
- Multi-page invitation flow with welcome, celebration, guest guide, RSVP, and confirmation routes.
- Countdown, gallery, map and travel guidance, registry notes, and RSVP form handling.
- Root `TODO.md` for personal follow-up reminders.
- Git milestone tags `v0.0.0` and `v0.1.0` plus the long-lived `development` branch.
- Firebase app bootstrap with an environment template for later backend integration.

### Changed

- README updated to describe project setup, development workflow, AI commit format, and Git template usage.
- AGENTS and README updated with the parallel AI workflow and coordination protocol.
- Vite asset handling and build base path now support GitHub Pages project URLs, custom domains, and repository renames.
- Starter Vite content replaced with a wedding invitation landing page.
- Coordination board upgraded from generic buckets to a feature roadmap with dependency-aware invitation MVP slices.
- README now distinguishes free GitHub Pages deployment from optional paid custom-domain usage and documents a free shorter-URL workaround via `apsmono.github.io`.
- GitHub Pages deployment now auto-detects owner-site repositories and deploys them at `/`, while README documents exact GitHub and Cloudflare publishing clicks.
- README now explains the guest flow, current RSVP behavior, and direct public route URLs.
- AI workflow instructions now require reading all applicable instructions before action, always writing documentation after action, and committing then pushing each completed change.
- AI workflow instructions now explicitly require holding any branch change until other active AI work is finished or explicitly sequenced in the coordination files.
- Invitation content now uses Amalia Indah Palupi, Arif Eko Pramono, and Monday, 1 Juni 2026 as the seeded real details while unfinished venue and contact fields stay blank-safe in the UI.
