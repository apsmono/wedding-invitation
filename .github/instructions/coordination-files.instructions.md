---
applyTo: ".github/coordination/**/*.md"
description: "Use when updating shared AI coordination files for task claims, handoffs, or file ownership in this repository."
---

# Coordination File Rules

- Treat `.github/coordination/board.md` as the source of truth for active work.
- Claim a task before changing product files by setting an owner, status, and intended file scope.
- Do not claim the same file path in two active tasks at the same time.
- Use `.github/coordination/handoffs.md` as an append-only log for progress, blockers, and next actions.
- Keep entries short, concrete, and timestamped in local ISO-like format such as `2026-04-27 14:20`.
- When work is complete, mark the task `done` in the board and record the outcome in the handoff log.
