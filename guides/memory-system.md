# Agent Memory System

## Memory Architecture

Agents use a multi-tier memory system:

| System | Purpose | Auto vs Manual |
|--------|---------|----------------|
| **memory-lancedb** | Conversational context, preferences, facts | **Auto** (platform) |
| **Mem0** | Agent-specific learnings, domain expertise | Manual (`--agent <id>`) |
| **MEMORY.md** | Curated long-term memory, strategic context | Manual (weekly curation) |
| **expertise/** | Structured knowledge, patterns, antipatterns | Manual (during evolution) |

**Rule of thumb:** If it's a preference or fact from conversation, auto-capture handles it. If it's a learning from work or research, store it manually in Mem0 or expertise/.

## Memory Discipline

### Wake/Sleep Protocol (MANDATORY)

#### Wake (session start)
1. Read `SOUL.md`
2. Read `memory/YYYY-MM-DD.md` (today + yesterday)
3. Load 🔴 tagged items from daily logs first (critical context)
4. Resume `CURRENT_TASK.md` if it exists

#### Sleep (pre-compaction)
1. Flush working memory to disk (notes, decisions, progress)
2. Update `memory/YYYY-MM-DD.md` with priority tags:
   - 🔴 Critical — decisions, commitments, blockers, corrections
   - 🟡 Notable — insights, preferences, useful discoveries
   - 🟢 Routine — status updates, low-signal context
3. Commit changes

### Daily Logs (`memory/YYYY-MM-DD.md`)

Use typed memory structure:
- `memory/decisions/` → `YYYY-MM-DD-<topic>.md`
- `memory/lessons/` → `YYYY-MM-DD-<topic>.md`
- `memory/people/` → `<person-name>.md`
- `memory/YYYY-MM-DD.md` → append-only daily log

Use wiki-links (`[[...]]`) when possible.

### Post-Compaction Recovery

If context feels thin after Wake steps:
1. Check `MEMORY.md` for curated context
2. Use `sessions_history` if needed
3. **Never ask "what were we discussing?" — look it up.**

## Memory Auto-Capture (Platform Feature)

The organization uses **memory-lancedb** for automatic learning from conversations.

### What Gets Auto-Captured
- Preferences, explicit requests, decisions, corrections, facts

### What Agents Still Do Manually
- Complex nuanced learnings → `mem0-memory add --agent <id>`
- Cross-agent knowledge sharing
- Structured expertise → `expertise/` folders
- Domain-specific patterns → `expertise/patterns/`

### Auto-Recall
Relevant memories are automatically injected into agent context before they respond. No agent action required.
