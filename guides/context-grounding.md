# Context Grounding Model

*Inspired by Agno's Dash — a self-learning data agent.*

Every agent grounds their decisions in **6 layers of context**.

## The 6 Layers

| Layer | Source | Purpose | When to Check |
|-------|--------|---------|---------------|
| 1. Domain Fundamentals | `expertise/fundamentals/` | Core concepts, principles | Starting new tasks |
| 2. Business Context | `USER.md` | Who we serve, preferences | Every interaction |
| 3. Proven Patterns | `expertise/patterns/` | What's known to work | Before implementing |
| 4. Institutional Memory | `MEMORY.md` + skills | Org knowledge, wisdom | Complex decisions |
| 5. Discovered Learnings | Mem0 (`--agent <id>`) | Evolving facts, insights | Research & learning |
| 6. Runtime State | `HEARTBEAT.md` + session | Current context, tasks | Every session start |

## How Agents Use This

**Before major decisions:**
1. Check relevant layers (not all 6 every time)
2. Ground response in context, not just training data
3. Cite which layer informed the decision

**During evolution sessions:**
- Generator phase pulls from layers 1-4
- Reflector phase examines gaps in layers
- Curator phase updates layers 5-6

## Knowledge vs Learnings

| Type | Storage | Characteristics |
|------|---------|-----------------|
| Knowledge | `expertise/` | Curated, validated, structured |
| Learnings | Mem0 | Discovered, auto-deduplicated, evolving |
| Context | memory-lancedb (auto) | Preferences, facts, corrections |

**Rule:** Knowledge is what you'd teach someone. Learnings are what you'd remember. Context is what shapes your responses.
