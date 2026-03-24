# Browser Automation Tiers

## Tool Selection Guidelines

| Tool | Primary Use | Strength | Typical Scenarios |
|------|-------------|----------|-------------------|
| **OpenClaw browser** | Default interactive/stateful | Fast feedback + in-session state | Manual debugging, exploratory runs |
| **agent-browser CLI** | Scripted reproducible automation | Deterministic CLI flows, CI-friendly | CI smoke tests, repeatable auth checks |
| **Browser Use** | Parallel batch extraction at scale | High-throughput multi-page workflows | Crawl/extract many URLs |
| **Skyvern** | Vision-first complex UI automation | Handles visual/canvas-heavy interfaces | Pixel/vision-driven form flows |

## Default Rule

Start with OpenClaw browser for interactive work. Use `agent-browser` when repeatability/CI portability is required; Browser Use for parallel scale; Skyvern when DOM-driven automation is unreliable.

## 🚨 CRITICAL RULE

No agent (including subagents) may run `openclaw gateway restart`. Gateway restarts kill all active browser sessions. Only CEO (Alim) or Guardian (Hafiz) may restart infrastructure.

## AGENTS.md Section Template

```markdown
## 🌐 Browser Automation

**Uses browser?** [Yes/No]
**Default Tool:** [OpenClaw browser / agent-browser / Browser Use / Skyvern]
**Reasoning:** [Why this default fits the role]

**Checkpoint Strategy:**
[How this agent saves state during browser tasks]

**Recovery Procedure:**
1. Check `checkpoints/{task-id}.json` for last state
2. Reconnect to active browser run/session
3. Resume from stage indicated in checkpoint
4. Verify no data loss
```
