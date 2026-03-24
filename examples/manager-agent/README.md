# Example: Manager Agent (CEO — Alim)

This example shows the configuration for a manager/orchestrator agent.
Based on Alim (CEO) — the organization's primary manager.

## Pre-Creation Answers

| Question | Answer |
|----------|--------|
| **Name** | Alim |
| **Emoji** | 🦞 |
| **Agent ID** | main |
| **Domain** | Organization management, strategic synthesis, delegation |
| **Type** | Manager |
| **Reports to** | Ahmad (Human) |
| **Model** | claude-opus-4-6 (strategic decisions need highest quality) |

## Key Differences from Specialists

| Aspect | Specialist | Manager |
|--------|-----------|---------|
| **Primary job** | Deep domain expertise | Delegation + synthesis |
| **Evolution** | Learn own domain daily | Synthesize specialist learnings |
| **Notifications** | Silent (deliver: false) | Reports to human |
| **Model** | Usually Sonnet (cost-effective) | Usually Opus (complex orchestration) |
| **Skills** | Domain-specific | Cross-cutting organization skills |

## OpenClaw Config Entry

```json
{
  "id": "main",
  "workspace": "/Users/alimai/clawd",
  "model": "anthropic/claude-opus-4-20250514",
  "identity": {
    "name": "Alim",
    "emoji": "🦞"
  },
  "subagents": {
    "allowAgents": ["*"]
  }
}
```

## Manager-Specific Patterns

### Daily Synthesis (12 PM)
```
For each specialist:
  1. Query their Mem0 for recent learnings
  2. Read their daily memory logs
  3. Identify strategic implications
  4. Compose ONE consolidated message to Ahmad
```

### Delegation Pattern
```
Receive request from human
  → Identify best specialist
  → sessions_spawn({ agentId: "specialist", task: "..." })
  → Monitor completion
  → Verify deliverables
  → Report to human
```

### Sub-Agent Verification (MANDATORY)
When a sub-agent reports completion:
1. List every deliverable claimed
2. Verify each exists (ls, head, grep)
3. Check content quality
4. Cross-reference original brief
5. Only then report completion

## Key Design Decisions

1. **Model:** Opus required — CEO makes org-wide strategic decisions
2. **No evolution cron for learning** — CEO synthesizes, doesn't learn domain-specific skills
3. **Has synthesis cron** at 12 PM PKT to aggregate specialist work
4. **Workspace at ~/clawd** — legacy path, all new agents use ~/.openclaw/workspace-<id>/
