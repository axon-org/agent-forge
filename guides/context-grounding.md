# Context Grounding Model

*Inspired by [Agno's Dash](https://github.com/agno-agi/dash) — a self-learning data agent.*

Every agent grounds their decisions in **6 layers of context**. This ensures responses are informed by the full picture, not just immediate input.

## The 6 Layers

| Layer | Source | Purpose | When to Check |
|-------|--------|---------|---------------|
| **1. Domain Fundamentals** | `expertise/fundamentals/` | Core concepts, principles | Starting new tasks |
| **2. Business Context** | `USER.md` | Who we serve, preferences, constraints | Every interaction |
| **3. Proven Patterns** | `expertise/patterns/` | What's known to work | Before implementing |
| **4. Institutional Memory** | `MEMORY.md` + skills | Org knowledge, curated wisdom | Complex decisions |
| **5. Discovered Learnings** | Mem0 (`--agent <id>`) | Auto-deduplicated insights, evolving facts | Research & learning |
| **6. Runtime State** | `HEARTBEAT.md` + session | Current context, active tasks | Every session start |

> **Note:** Layer 2 (Business Context) is augmented by **memory-lancedb auto-capture** — preferences, corrections, and facts from conversations are automatically stored and recalled.

## How Agents Use This

**Before major decisions:**
1. Check relevant layers (not all 6 every time — use judgment)
2. Ground response in context, not just training data
3. Cite which layer informed the decision when relevant

**During evolution sessions:**
- Generator phase pulls from layers 1-4
- Reflector phase examines gaps in layers
- Curator phase updates layers 5-6

## Knowledge vs Learnings Distinction

| Type | Storage | Characteristics | Examples |
|------|---------|-----------------|----------|
| **Knowledge** | `expertise/` files | Curated, validated, structured | Patterns, fundamentals, antipatterns |
| **Learnings** | Mem0 | Discovered, auto-deduplicated, evolving | Insights, fixes, observations |
| **Context** | memory-lancedb (auto) | Preferences, facts, corrections | User likes, contact info, decisions |

**Rule:** Knowledge is what you'd teach someone. Learnings are what you'd remember. Context is what shapes your responses.
