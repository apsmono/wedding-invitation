# Wedding Invitation AI Instructions

This repository is a React + TypeScript app powered by Vite.

## Working Rules

- Keep changes small, typed, and easy to review.
- Prefer editing existing files over adding new abstractions.
- Update `README.md` when setup or workflow changes.
- Update `CHANGELOG.md` for user-visible, workflow, or tooling changes.
- Keep commit messages explicit about intent and affected files.

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