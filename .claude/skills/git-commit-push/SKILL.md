---
name: git-commit-push
description: Automates the full git commit and push workflow. Use this skill whenever the user wants to commit code, save changes to git, push to a remote, stage files, write a commit message, or says things like "commit my changes", "push this", "save my work to git", "git add commit push", "commit and push", or "ship this". Trigger even when the request is casual or brief — if it involves getting code into git history or a remote, this skill applies.
---

# Git Commit & Push Skill

Automates staging files, generating a commit message from the diff, and pushing to remote — stopping clearly if anything goes wrong.

## Workflow

### Step 1 — Check git status

```bash
git status
git diff --stat
```

Confirm there are changes to commit. If the working tree is clean, tell the user and stop.

### Step 2 — Show the user what will be staged

Before staging anything, show a brief summary of changed files. Ask the user to confirm if:
- There are untracked files that look unintentional (e.g. `.env`, `node_modules/`, large binaries)
- The diff is very large (>50 files)

Otherwise, proceed automatically.

### Step 3 — Stage files

```bash
git add -A
```

Or, if the user specified particular files/folders, stage only those.

### Step 4 — Generate commit message from diff

```bash
git diff --cached
```

Read the staged diff and write a commit message following these rules:
- **Subject line**: ≤72 chars, imperative mood ("Add feature" not "Added feature")
- **Body** (optional): Explain *why*, not *what*, if the change is non-obvious
- Use conventional commits format when the repo already uses it (check recent `git log --oneline -5`)
- Be specific — reference filenames or components touched when helpful

Example good messages:
```
Add user authentication via JWT

Implement login/logout endpoints, token validation middleware,
and session storage. Resolves repeated auth failures in #42.
```

```
Fix null pointer in PaymentService.process()
```

Show the message to the user **before** committing and ask for approval or edits.

### Step 5 — Commit

```bash
git commit -m "<subject>" -m "<body if any>"
```

### Step 6 — Push

Check the current branch and remote:

```bash
git branch --show-current
git remote -v
```

Then push:

```bash
git push origin <branch>
```

If the branch has no upstream yet:

```bash
git push --set-upstream origin <branch>
```

### Step 7 — Confirm

Report success: branch name, remote, and the short commit hash from `git rev-parse --short HEAD`.

---

## Error Handling

Stop immediately and explain clearly for any of these:

| Situation | What to say |
|---|---|
| `git push` rejected (non-fast-forward) | Explain the remote has commits the local branch doesn't. Suggest `git pull --rebase` then retry. Do NOT force push. |
| Merge conflicts after pull | Show the conflicting files. Tell the user to resolve them manually, then they can re-run the skill. |
| No remote configured | Tell the user no remote is set up. Suggest `git remote add origin <url>`. |
| Dirty working tree with submodules | Warn about submodules and ask user how to proceed. |
| `.env` or secrets in staged files | Warn loudly. Do not commit. Tell user to add to `.gitignore` first. |
| Authentication failure on push | Show the error. Suggest checking SSH keys or HTTPS credentials. |

Never force-push (`--force` / `-f`) unless the user explicitly requests it and confirms they understand the consequences.

---

## Notes

- If the user says "just commit, don't push", skip Steps 6–7.
- If the user provides a commit message themselves, skip Step 4 and use theirs.
- If there are staged changes already (from a previous `git add`), skip Step 3.
