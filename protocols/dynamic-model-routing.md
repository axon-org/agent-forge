# Dynamic Model Routing for Sub-Agents

Match model capability to task complexity instead of using a single model for everything.

## The 3-Tier Model

| Tier | Model | Alias | Cost/Task* | When to Use |
|------|-------|-------|------------|-------------|
| 🟢 Simple | DeepSeek V3/Chat | `deepseek` | ~$0.002 | Quick, deterministic, low-stakes |
| 🟡 Standard | Gemini 3 Flash Preview | `flash` | ~$0.013 | **Default for most work** |
| 🔴 Complex | Claude Sonnet 4.5 | `sonnet` | ~$0.066 | Multi-step, critical, high-failure-cost |

*Estimated: ~2K input, ~4K output tokens per task*

## Quick Decision Guide

### 🟢 Simple (`deepseek`)
- Single-operation tasks (summarize, format, lookup)
- Clear input/output specification, low ambiguity

### 🟡 Standard (`flash`) — Default when uncertain
- Multi-step reasoning (research → synthesize → write)
- Tool orchestration, creative/generative work
- Handles 80% of tasks competently

### 🔴 Complex (`sonnet`)
- Multi-phase workflows with dependencies
- Deep domain expertise required
- High failure cost (hours of rework, reputational risk)

## Implementation

```javascript
sessions_spawn({
  agentId: "architect",
  task: "[Your detailed task brief]",
  label: "[descriptive-label]",
  model: "flash",  // deepseek | flash | sonnet
  reasoning: "off"  // or "on" for deep thinking
})
```

## Guardrails

- ✅ Default to `flash` when uncertain
- ✅ Document routing decision if non-obvious
- ❌ Don't use `deepseek` for multi-step reasoning
- ❌ Don't use `sonnet` for simple formatting tasks
