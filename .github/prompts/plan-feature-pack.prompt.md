---
name: "Plan Feature Pack"
description: "Use when splitting a wedding invitation feature into parallel, non-overlapping board tasks with dependencies and file claims."
argument-hint: "Feature name and outcome"
agent: "agent"
model: "GPT-5 (copilot)"
---

Interpret the chat input as the next feature to plan.

Your job is to turn that feature into a board-ready parallel work pack for the wedding invitation project.

Required behavior:

1. Read `.github/coordination/roadmap.md`, `.github/coordination/board.md`, and `.github/coordination/handoffs.md`.
2. Propose file-safe slices that can be worked on in parallel.
3. Prefer one owner per file and explicit dependencies when composition must wait.
4. Update `.github/coordination/roadmap.md` and `.github/coordination/board.md` if the plan is accepted in the current task.
5. Return a short summary with feature goal, slice list, dependencies, and recommended execution order.
