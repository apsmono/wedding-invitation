---
name: research
description: >
  Deep research skill with structured thinking and reasoning. Use this skill whenever the user wants to research a topic, investigate a question, analyze a subject, or needs a thorough evidence-based answer. Triggers on phrases like "research", "investigate", "analyze", "deep dive", "find out about", "look into", "what do we know about", "explain in depth", "comprehensive overview", "is it true that", "fact check", or any question that benefits from multi-source synthesis rather than a quick answer. Also triggers when the user wants to understand *why* something is true, not just *what* is true. Use this skill even for casual research requests — the thinking framework applies broadly. Do NOT use for simple one-liner factual lookups (e.g. "what year was X born") unless the user wants analysis beyond the bare fact.
---

# Research Skill

A structured skill for conducting thorough research with explicit thinking, reasoning, and synthesis.

---

## Core Philosophy

Research is not just retrieval — it's reasoning. This skill enforces a **Think → Search → Reason → Synthesize** loop that produces well-grounded, nuanced answers rather than surface-level summaries.

Good research:
- States assumptions and uncertainties **before** searching
- Uses multiple independent sources
- Actively looks for **disconfirming evidence** (not just confirmation)
- Separates **facts** from **interpretations** from **speculation**
- Communicates confidence levels honestly

---

## The Research Loop

### Phase 1 — THINK (Before Searching)

Before touching any search tool, reason through the question:

1. **Decompose** — Break the question into sub-questions. What do I need to know to answer this fully?
2. **Prior knowledge** — What do I already know? What is my confidence level? Flag any assumptions.
3. **Identify gaps** — What specifically is unknown or uncertain?
4. **Anticipate** — What answers might I expect? (This helps spot surprising or contradictory results.)
5. **Plan searches** — List 3–6 distinct search queries that cover different angles. Avoid redundant queries.

> Output this reasoning transparently to the user as a brief "Thinking through this..." section before searching. Keep it concise — 3–6 bullet points. This builds trust and catches misunderstandings early.

---

### Phase 2 — SEARCH (Evidence Gathering)

Execute your planned searches, adapting as you go:

- Use `web_search` for broad discovery; use `web_fetch` to read full articles when a snippet isn't enough
- **Prioritize primary sources**: official reports, peer-reviewed papers, government data, direct statements — over aggregators or secondary summaries
- **Diversify source types**: news, academic, official, commentary — don't rely on one domain
- **Track provenance**: note where each key fact came from
- Adjust the query plan mid-search if results reveal new angles or contradict expectations

**Source quality tiers (highest to lowest):**
1. Primary sources (original studies, official data, direct statements)
2. Quality journalism (major outlets with editorial standards)
3. Expert commentary / reputable analysis
4. General web (use with caution; verify independently)

**Minimum searches**: 3 for simple topics, 5–8 for complex/contested topics.

---

### Phase 3 — REASON (Critical Analysis)

After gathering evidence, reason explicitly before writing the answer:

1. **Converge** — Where do sources agree? This is your high-confidence core.
2. **Diverge** — Where do sources conflict? What explains the disagreement (methodology, bias, recency, framing)?
3. **Stress-test** — Did I find evidence *against* my expected answer? If not, did I try hard enough?
4. **Weight evidence** — Not all sources are equal. A peer-reviewed meta-analysis outweighs a blog post.
5. **Calibrate confidence** — Is this settled, contested, or genuinely unknown?

> This phase is internal reasoning. You don't need to show all of it, but it must happen. Key insights from this phase (especially conflicts or surprises) should surface in the answer.

---

### Phase 4 — SYNTHESIZE (The Answer)

Write a response that is:

- **Structured**: Use headers for multi-part answers; prose for focused answers. Match complexity to the question.
- **Layered**: Lead with the core answer, then supporting evidence, then nuance/caveats.
- **Honest about uncertainty**: Use phrases like "evidence suggests", "it's unclear whether", "experts disagree on" — don't project false confidence.
- **Source-aware**: Cite sources inline. Distinguish primary from secondary.
- **Actionable**: Where relevant, point to next steps, further reading, or what would resolve remaining uncertainty.

**Confidence markers to use consistently:**
- ✅ Well-established / strong consensus
- ⚠️ Contested / mixed evidence
- ❓ Unclear / insufficient data
- 🔄 Evolving / may have changed recently

---

## Output Format Guide

### For factual / explanatory questions:
```
## [Topic]

**Summary** (2–4 sentences: the core answer)

### Key Findings
[Organized sub-sections with evidence]

### What's Uncertain
[Honest gaps or contested areas]

### Sources
[Key references]
```

### For analytical / comparative questions:
```
## Analysis: [Topic]

**Bottom Line**: [Direct answer]

### Evidence For
### Evidence Against / Complications
### Synthesis
### Confidence Level + What Would Change It
```

### For emerging / fast-moving topics:
```
## [Topic] — State of Knowledge as of [date]

**Caveat**: This is rapidly evolving. [Key uncertainty]

### What We Know
### What's Disputed
### What's Unknown
### Where to Follow This
```

---

## Special Research Modes

### Fact-Checking Mode
Triggered by: "is it true that...", "I heard...", "fact check...", "debunk..."

Extra steps:
- Explicitly state the claim being checked
- Search for both supporting AND refuting evidence
- Check if the claim is cherry-picked data, out of context, or misattributed
- Verdict: **True / Mostly True / Mixed / Mostly False / False / Unverifiable**

### Comparative Research Mode
Triggered by: "compare X and Y", "X vs Y", "which is better..."

Extra steps:
- Define the comparison dimensions before searching
- Use a structured comparison (table or parallel sections)
- Flag where the "better" answer depends on context/use case

### Historical / Background Research Mode
Triggered by: "history of...", "origin of...", "how did X come to be..."

Extra steps:
- Establish timeline structure before searching
- Distinguish proximate vs. root causes
- Note how interpretation of history may vary by perspective

---

## Anti-Patterns to Avoid

- ❌ **Confirmation bias**: Only searching for evidence that supports the first answer that comes to mind
- ❌ **Source monoculture**: Using 5 results from the same outlet as if they're independent
- ❌ **False balance**: Giving equal weight to fringe views and scientific consensus
- ❌ **Overconfidence**: Stating contested things as settled facts
- ❌ **Underconfidence**: Hedging everything so much the answer is useless
- ❌ **Recency bias**: Assuming the newest source is always the most reliable
- ❌ **Burying the lede**: Saving the actual answer for the last paragraph

---

## Communicating the Research Process

Always show the user you're thinking before you search. A brief visible reasoning step like:

> *"Let me think through this first: the question involves X, Y, and Z. I'm going to search for [A], [B], and [C] to cover different angles..."*

...builds trust, catches misunderstandings before wasted effort, and helps the user redirect if needed.

After research, if there are surprising findings or important caveats, highlight them explicitly rather than burying them.
