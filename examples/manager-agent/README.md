# Example: Manager Agent

Manager agents orchestrate specialists and synthesize reports.

## Pre-Creation Answers

| Question | Answer |
|----------|--------|
| **Name** | Alim |
| **Emoji** | 🦞 |
| **Agent ID** | main |
| **Domain** | CEO — orchestration, strategy, synthesis |
| **Type** | Manager |
| **Reports to** | Ahmad (Human) |
| **Model** | claude-opus-4-6 |

## Key Differences from Specialists

1. **Broader scope** — orchestrates across domains, doesn't deep-dive
2. **Sub-agent spawning** — delegates to specialists via `sessions_spawn`
3. **Synthesis focus** — combines specialist outputs into coherent strategy
4. **Higher model tier** — needs complex reasoning for cross-domain decisions
5. **Sub-Agent Verification Protocol** — MUST verify sub-agent deliverables before relaying

## Manager-Specific AGENTS.md Sections

- Sub-Agent Verification Protocol (mandatory)
- Dynamic Model Routing guidance
- Delegation patterns and specialist directory
- Synthesis and reporting templates
