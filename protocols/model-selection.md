# Model Selection Protocol (MANDATORY)

**Before assigning a model to any agent, research the optimal fit for their domain.**

## Step 1: Understand Domain Requirements

| Factor | Questions to Ask |
|--------|------------------|
| **Reasoning Depth** | Does this domain require multi-step logic, planning, or complex analysis? |
| **Code Generation** | Will the agent write, debug, or review code regularly? |
| **Creative Output** | Does the agent produce marketing copy, designs, or creative content? |
| **Speed vs Quality** | Is fast response critical, or is deep thinking more valuable? |
| **Context Length** | Will the agent need to process large documents or codebases? |
| **Cost Sensitivity** | Is this a high-frequency agent where cost matters? |

## Step 2: Model Strengths by Domain

| Domain | Best Models | Reasoning |
|--------|-------------|-----------|
| **AI/ML Development** | Claude Opus 4-6, Gemini 3.1 Pro | Complex reasoning, code generation |
| **Frontend/Backend Dev** | Claude Sonnet 4-6, GPT-5.4 | Fast iteration, strong coding |
| **UI/UX Design** | Claude Sonnet 4-6, Gemini 3 Flash | Visual reasoning, creative |
| **Marketing/Content** | Claude Sonnet 4-6, GPT-5.4 | Persuasive writing, creativity |
| **Project Management** | Claude Sonnet 4-6, Gemini 3 Flash | Organization, synthesis |
| **Security/Platform Ops** | Claude Opus 4-6, GPT-5.4 | Deep analysis, edge cases |
| **Architecture/Systems** | Claude Opus 4-6, Gemini 3.1 Pro | Long-context, strategic planning |

## Step 3: Cost-Performance Trade-offs

| Model | Input ($/1M) | Output ($/1M) | Best For |
|-------|--------------|---------------|----------|
| **Claude Opus 4-6** | $15 | $75 | CEO, complex specialists |
| **Claude Sonnet 4-6** | $3 | $15 | Most specialists |
| **Gemini 3.1 Pro** | $1.25 | $10 | Long-context analysis |
| **Gemini 3 Flash** | $0.15 | $0.60 | High-frequency, cost-sensitive |
| **GPT-5.4** | $2.50 | $10 | Balanced alternative |

## Step 4: Document Recommendation

```markdown
## Model Selection: [Agent Name]

**Domain:** [agent's expertise]
**Recommended Model:** [model]
**Reasoning:** [Why this model fits]
**Cost Projection:** Estimated daily cost: $X
```

## Step 5: CEO Approval

Include model selection in CEO approval request.

## Dynamic Model Routing for Sub-Agents

### The 3-Tier Model

| Tier | Model | Alias | When to Use |
|------|-------|-------|-------------|
| **🟢 Simple** | DeepSeek V3/Chat | `deepseek` | Quick, deterministic, low-stakes |
| **🟡 Standard** | Gemini 3 Flash Preview | `flash` | **Default** — balanced quality/cost |
| **🔴 Complex** | Claude Sonnet 4.5 | `sonnet` | Multi-step, critical, high-failure-cost |

**Default to `flash` when uncertain.**
