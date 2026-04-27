# Wedding Invitation

React + TypeScript project scaffolded with Vite.

## Scripts

- `npm install` installs dependencies.
- `npm run dev` starts the local development server.
- `npm run build` runs TypeScript project build checks and creates a production bundle.
- `npm run lint` runs ESLint.
- `npm run preview` serves the built app locally.

## AI-Friendly Repository Files

- `.github/copilot-instructions.md` defines the repository-wide AI working rules.
- `AGENTS.md` gives agents and collaborators a quick project guide.
- `CHANGELOG.md` tracks notable changes.
- `.gitmessage` provides a reusable AI commit template for Git.
- `.vscode/tasks.json` adds workspace tasks for `dev`, `build`, and `lint`.

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

## Changelog Workflow

Add entries to `CHANGELOG.md` whenever a change affects behavior, tooling, developer workflow, or project documentation.
