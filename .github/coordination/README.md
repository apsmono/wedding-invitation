# Multi-Agent Coordination

Use this folder when multiple AI agents or human collaborators are working in parallel.

## Goals

- Split work into explicit, non-overlapping slices.
- Make file ownership visible before edits start.
- Leave short handoffs so another agent can continue without re-exploring the repo.

## Files

- `roadmap.md`: current product roadmap and active feature packs.
- `board.md`: current task board and file claims.
- `handoffs.md`: append-only progress log, blockers, and next actions.

## Workflow

1. Read `roadmap.md`, `board.md`, and `handoffs.md` before starting work.
2. Claim one task in `board.md` with owner, status, and file scope.
3. Keep your edits inside the claimed file scope. If the scope changes, update the board first.
4. After a meaningful checkpoint, append a short entry to `handoffs.md`.
5. When finished, mark the task `done` in `board.md` and leave a final handoff entry.

## Task Slice Rules

- Prefer vertical slices that can be validated independently.
- Claim concrete paths such as `src/App.tsx` or `src/assets/**`, not vague areas like `frontend`.
- If two tasks must touch the same file, sequence them instead of working in parallel.
- Reserve shared files like `README.md`, `CHANGELOG.md`, and `AGENTS.md` for one owner at a time.
- Keep roadmap feature IDs and board task IDs aligned, for example `F1-C` in both files.

## Custom Worker Assets

- `.github/agents/wedding-feature-worker.agent.md`: hidden worker agent for implementing a claimed slice.
- `.github/prompts/run-roadmap-slice.prompt.md`: executes one claimed slice with the worker agent.
- `.github/prompts/plan-feature-pack.prompt.md`: plans a new feature into parallel board tasks.
- `.github/prompts/record-handoff.prompt.md`: appends a normalized handoff entry.

## Handoff Format

Use this format in `handoffs.md`:

```md
## 2026-04-27 14:20 | agent-name | task-id

- Status: in-progress | blocked | done
- Changed: src/App.tsx, src/App.css
- Validated: npm run build
- Notes: concise state another agent can continue from
- Next: exact next action or blocker owner
```
