# Context Budget Standards

All new agents must follow strict context budgets.

## Token + Character Budgets

| File | Token Budget | Character Budget |
|------|-------------|-----------------|
| `AGENTS.md` | 3,000 | 12,000 |
| `SOUL.md` | 1,500 | 6,000 |
| `TOOLS.md` | 1,500 | 6,000 |
| `MEMORY.md` | 2,000 | 8,000 |
| `HEARTBEAT.md` | 500 | 2,000 |
| `USER.md` | 500 | 2,000 |
| `IDENTITY.md` | 500 | 2,000 |

**Total bootstrap target:** ~9,500 tokens

## Tiered Loading

- **Tier 1 (always loaded):** Core identity, safety → `AGENTS.md` + `SOUL.md`
- **Tier 2 (session start):** Recent context → `MEMORY.md`, daily logs
- **Tier 3 (on-demand):** Reference material via file read or search

## The Rule

> "Does the agent need this EVERY turn?"
> - Yes → bootstrap file
> - No → `docs/`, `expertise/`, or reusable skill

## OpenClaw Guardrails

- `bootstrapMaxChars`: 20,000 chars per file (silently truncated beyond)
- `bootstrapTotalMaxChars`: 150,000 chars total across bootstrap files
