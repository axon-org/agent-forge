# Research Foundation & Philosophy

## Key Influences

### Stanford ACE Framework (Agentic Context Engineering)
- Treats context as an evolving "playbook" rather than static prompts
- Tri-Cognitive Loop: **Generator → Reflector → Curator**
- "Gardener paradigm" — humans cultivate AI, not just command it
- Key insight: *"True intelligence is not designed, but cultivated"*

### Claude-Flow (Community Multi-Agent System)
- 60+ specialized agents with persistent memory
- Self-learning routing (system learns which agent handles what best)
- Swarm coordination with consensus mechanisms

### Community Best Practices
- Isolated workspaces per agent (prevents context contamination)
- Git versioning for all agent files
- Human-in-loop for external/destructive actions
- Subagents = "AI microservices" — one task, one agent

## Our Hybrid Approach

We combine:
1. **Persistent Workspaces** — For evolving specialists (memory, identity, expertise)
2. **Claude Code Native Subagents** — For quick, session-scoped tasks
3. **ACE Cognitive Loop** — Generator → Reflector → Curator pattern
4. **Gardener Model** — Humans cultivate agents; agents don't self-modify core identity unsupervised
5. **Context Grounding Model** — 6-layer context for decision grounding
6. **Error-Learning Protocol** — Systematic capture of fixes to prevent repeated mistakes
