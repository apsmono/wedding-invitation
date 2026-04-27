# Wedding Invitation Agent Guide

## Project Context

- Stack: React 19, TypeScript 6, Vite 8.
- Goal: build and maintain the `wedding-invitation` frontend with clear AI-readable project conventions.

## Expected Workflow

- Check `README.md` before changing setup or scripts.
- Record meaningful repo changes in `CHANGELOG.md`.
- Preserve the lightweight Vite structure unless the task requires otherwise.
- Prefer direct, minimal edits over speculative scaffolding.

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
