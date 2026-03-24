# Agent Evolution System

## The ACE Cognitive Loop

Every evolution session follows this pattern (from Stanford's ACE Framework):

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   GENERATOR  │ ──▶ │   REFLECTOR  │ ──▶ │    CURATOR   │
│              │     │              │     │              │
│ Research &   │     │ What worked? │     │ Organize &   │
│ Learn        │     │ What didn't? │     │ Store        │
└──────────────┘     └──────────────┘     └──────────────┘
       │                                         │
       └─────────── Evolution Loop ◀─────────────┘
```

1. **Generator Phase** — Actively research and learn
2. **Reflector Phase** — Meta-cognitive analysis
3. **Curator Phase** — Organize and persist

## Evolution Schedule Architecture

**Specialists learn silently. CEO synthesizes and reports.**

| Time | Who | What |
|------|-----|------|
| **9:00 AM** | Specialists (per their frequency) | Learn + Document (silently) |
| **12:00 PM** | Alim (CEO) | Synthesize + Report to Ahmad |

### Recommended Frequencies

| Field Type | Examples | Frequency | Cron |
|------------|----------|-----------|------|
| **Rapidly Evolving** | AI/ML, Security | Daily | `0 9 * * *` |
| **Moderately Evolving** | Frontend, Marketing, Design | 3x/week | `0 9 * * 1,3,5` |
| **Slowly Evolving** | Project Management, Operations | 2x/week | `0 9 * * 1,4` |

## Hierarchical Reporting Pattern

```
┌──────────────────────────────────────────┐
│  9:00 AM — Specialists DO THE WORK       │
│  • Research their domain                 │
│  • Store learnings in Mem0               │
│  • Document in workspace files           │
│  • NO notifications — just work          │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│  12:00 PM — CEO SYNTHESIZES & REPORTS    │
│  • Query each specialist's Mem0          │
│  • Identify strategic implications       │
│  • Send ONE consolidated message         │
└──────────────────────────────────────────┘
```

## Skills Gap Protocol

### How Specialists Log Gaps

Each specialist workspace includes `evolution/gaps.md`:

```markdown
# Skill Gaps & Capability Requests

## Format
### [DATE] - [Gap Description]
**What I need:** [capability]
**Why:** [use case that triggered this]
**Priority:** High/Medium/Low
**Status:** Open / Addressed by Idris [DATE]
```

### The Flow

```
Specialist (Daily Evolution)
     │ "I need X capability" → evolution/gaps.md
     ▼
Idris (Weekly Discovery)
     │ Read ALL gaps.md → Search skills → Install
     ▼
CEO (Daily Synthesis)
     │ Review → Approve major installations
```

## Agent-Learned Skills Protocol

After every task:
1. Decide whether the lesson is reusable
2. Check for conflicts across workspace skills, shared skills, and bundled skills
3. If reusable: append via `~/.openclaw/scripts/append-lesson.sh`
4. If no match: create new `agent-learned-<domain>` skill
5. Lessons go to `## Pending Lessons` only
6. Keep each lesson ≤ 3 lines and dated
