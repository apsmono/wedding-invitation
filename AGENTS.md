# Wedding Invitation Agent Guide

## Project Context

- Stack: React 19, TypeScript 6, Vite 8.
- Goal: build and maintain the `wedding-invitation` frontend with clear AI-readable project conventions.

## Expected Workflow

- Check `README.md` before changing setup or scripts.
- Read all applicable instruction surfaces before acting: `.github/copilot-instructions.md`, `AGENTS.md`, matching `.github/instructions/*.instructions.md` files, current coordination files, the active task scope, and the nearest implementation files.
- Record meaningful repo changes in `CHANGELOG.md`.
- Write back after acting by updating the board, handoff log, and any workflow docs touched by the change.
- Always write documentation for completed changes that affect behavior, setup, deployment, workflow, or content expectations.
- Preserve the lightweight Vite structure unless the task requires otherwise.
- Prefer direct, minimal edits over speculative scaffolding.
- After each completed change, create a commit with the repository AI commit format and push it to the current branch.

## Git Branch And Tag Workflow

- `main` is the published branch.
- `development` is the integration branch for ongoing work before release.
- Add annotated tags at meaningful milestones so release points are easy to reference and deploy.

## Parallel AI Workflow

- Use `.github/coordination/board.md` to claim a task before editing project files.
- Use `.github/coordination/handoffs.md` to record progress, blockers, and next actions.
- Use `.github/coordination/roadmap.md` to understand the active milestone and slice dependencies.
- Read those coordination files before starting a claimed slice and update them again after finishing the slice.
- Keep one owner per shared file at a time. If your task needs a claimed file, update the board before editing.
- Split work by file scope whenever possible so agents can validate changes independently.
- Read `.github/coordination/README.md` for the full protocol.

## Shared Worker Assets

- `.github/agents/wedding-feature-worker.agent.md` is the reusable hidden worker for executing one claimed slice.
- `.github/prompts/run-roadmap-slice.prompt.md` runs a single slice with the standard handoff format.
- `.github/prompts/plan-feature-pack.prompt.md` turns a new feature into board-ready parallel slices.
- `.github/prompts/record-handoff.prompt.md` appends a normalized handoff entry.

## Commit Message Standard

Every AI-generated commit should use this format:

```text
<type>(<scope>): <summary>

Files:
- add: <file>
- modify: <file>
- remove: <file>

Changes:
- <what changed>
- <why it changed>
```

Example:

```text
docs(setup): add AI workflow documentation

Files:
- add: AGENTS.md
- add: CHANGELOG.md
- modify: README.md
- modify: .github/copilot-instructions.md

Changes:
- document AI collaboration rules for the repository
- define a commit body format that lists added, modified, and removed files
```
