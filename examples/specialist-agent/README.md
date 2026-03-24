# Example: Specialist Agent (AI Developer)

This example shows the complete workspace for a specialist agent.
Based on Devi (AI Developer) — the first specialist created using the playbook.

## Pre-Creation Answers

| Question | Answer |
|----------|--------|
| **Name** | Devi |
| **Emoji** | 🧬 |
| **Agent ID** | ai-developer |
| **Domain** | AI/ML development, LLM applications, agent systems |
| **Type** | Specialist |
| **Reports to** | Alim (CEO) |
| **Model** | claude-sonnet-4-6 (default), opus for complex work |

## OpenClaw Config Entry

```json
{
  "id": "ai-developer",
  "workspace": "/Users/alimai/.openclaw/workspace-ai-developer",
  "model": "anthropic/claude-sonnet-4-20250514",
  "identity": {
    "name": "Devi",
    "emoji": "🧬"
  },
  "subagents": {
    "allowAgents": ["*"]
  },
  "groupChat": {
    "mentionPatterns": ["@devi", "@Devi", "devi", "Devi"]
  }
}
```

## Evolution Cron

- **Frequency:** Daily (AI/ML field moves extremely fast)
- **Schedule:** `0 9 * * *` (9:00 AM PKT)
- **Deliver:** false (CEO synthesizes at 12 PM)

## Skills Bundle

- docker-essentials
- test-runner
- tdd-guide
- ollama-local-llm
- codex-backend
- codex-ai-ml

## Key Design Decisions

1. **Model:** Opus for complex reasoning, Sonnet for day-to-day — AI/ML requires deep analysis
2. **Daily evolution:** The field moves too fast for anything less
3. **Browser tooling:** OpenClaw browser default (exploratory debugging), agent-browser for CI test flows
