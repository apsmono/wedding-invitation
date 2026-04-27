# Wedding Invitation AI Instructions

This repository is a React + TypeScript app powered by Vite.

## Working Rules

- Keep changes small, typed, and easy to review.
- Read the relevant context before taking action. At minimum, review the active task claim, nearby implementation files, and any coordination notes that govern the current slice.
- Prefer editing existing files over adding new abstractions.
- Write back after taking action. Update the coordination log, task state, and any affected workflow docs before concluding work.
- Update `README.md` when setup or workflow changes.
- Update `CHANGELOG.md` for user-visible, workflow, or tooling changes.
- After each completed change, create a commit using the repository commit format and push that commit to the current branch.
- Keep commit messages explicit about intent and affected files.

## Execution Order

1. Read the active context before making changes.
2. Make the smallest grounded change for the claimed slice.
3. Validate the change.
4. Write the outcome back to coordination and documentation surfaces.
5. Commit and push the completed change.

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