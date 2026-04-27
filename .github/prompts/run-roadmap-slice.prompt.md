---
name: "Run Roadmap Slice"
description: "Use when you want a worker to execute one claimed roadmap slice from the coordination board and leave a standard handoff."
argument-hint: "Task ID | owner | scope or goal tweak"
agent: "wedding-feature-worker"
model: "GPT-5 (copilot)"
---

Interpret the chat input as:

`Task ID | owner | scope or goal tweak`

Execute exactly one roadmap slice for the wedding invitation project.

Required behavior:

1. Read `.github/coordination/roadmap.md`, `.github/coordination/board.md`, and `.github/coordination/handoffs.md`.
2. Confirm or claim the task in `board.md`.
3. Change only the claimed files plus the coordination files.
4. Run the task validation command when available.
5. Append a new top entry to `handoffs.md` using the repository handoff format.
6. Return the worker summary in this exact shape:

```text
Task: <id> <title>
Status: <done|blocked|in-progress>
Changed: <files>
Validated: <command or not run>
Notes: <short continuation context>
Next: <next action>
```
