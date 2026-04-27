---
name: "Record Handoff"
description: "Use when adding a consistent handoff entry for a board task after progress, completion, or a blocker."
argument-hint: "Task ID | owner | status | changed files | validation | notes | next"
agent: "agent"
model: "GPT-5 (copilot)"
---

Interpret the chat input as:

`Task ID | owner | status | changed files | validation | notes | next`

Read `.github/coordination/handoffs.md` and append a new top entry in the repository handoff format. Normalize the entry so it is short, concrete, and easy for another worker to continue.
