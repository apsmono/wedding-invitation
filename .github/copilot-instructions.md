# Wedding Invitation AI Instructions

This repository is a React + TypeScript app powered by Vite.

## Working Rules

- Keep changes small, typed, and easy to review.
- Read all applicable instructions before taking action. At minimum, review `.github/copilot-instructions.md`, `AGENTS.md`, any matching `.github/instructions/*.instructions.md` files, the active task claim, nearby implementation files, and any coordination notes that govern the current slice.
- If a branch change is being considered, hold the process first. Do not change branches while another AI task is still active unless the coordination files explicitly sequence that branch work.
- Prefer editing existing files over adding new abstractions.
- Write back after taking action. Update the coordination log, task state, and any affected workflow docs before concluding work.
- Always write documentation for completed changes. If behavior, setup, workflow, deployment, or content source expectations change, update the relevant documentation surface instead of leaving the change undocumented.
- Update `README.md` when setup or workflow changes.
- Update `CHANGELOG.md` for user-visible, workflow, or tooling changes.
- After each completed change, create a commit using the repository commit format and push that commit to the current branch.
- Keep commit messages explicit about intent and affected files.

## Execution Order

1. Read the active context before making changes.
2. If the task would require a branch change, pause and confirm that no other AI work is still `in-progress` in `board.md` or the latest `handoffs.md` entries.
3. Make the smallest grounded change for the claimed slice.
4. Validate the change.
5. Write the outcome back to coordination and documentation surfaces.
6. Commit and push the completed change.

## Git Workflow

- Use `main` for the published line and `development` for ongoing integration work.
- Treat branch changes as coordinated operations. Wait for other active AI work to finish before switching branches unless the board and handoffs explicitly say otherwise.
- Add annotated git tags for meaningful milestones so deployment and rollback points are explicit.

## AI Commit Format

Use this Git commit structure for AI-assisted changes:

```text
<type>(<scope>): <short summary>

Files:
- add: path/to/new-file
- modify: path/to/existing-file
- remove: path/to/deleted-file

Changes:
- short statement of the main behavior or tooling change
- short statement of any follow-up impact
```

Valid `type` values:

- `feat` for new features
- `fix` for bug fixes
- `docs` for documentation-only changes
- `refactor` for internal restructuring without behavior change
- `style` for formatting-only updates
- `test` for test additions or changes
- `build` for tooling, scripts, or dependency work
- `chore` for maintenance tasks

## Delivery Checklist

- Confirm the app still builds after code changes.
- Keep file add/remove lists accurate in the commit body.
- Mention removed files explicitly instead of omitting them.
- Avoid vague summaries such as `update files` or `misc changes`.
