# File Structure Conventions

## The Critical Rule: Workspace vs ~/Projects/

| Location | What Belongs There |
|----------|-------------------|
| `~/Projects/<name>/` | Organizational deliverables, implementation code, shared infrastructure |
| `~/.openclaw/workspace-*/` | Agent's personal learnings, expertise, evolution |

## The Decision Framework

1. Will other agents touch this? → `~/Projects/`
2. Is this implementation code with tests? → `~/Projects/`
3. Is this cross-cutting infrastructure? → `~/Projects/`
4. Is this an organizational deliverable? → `~/Projects/`
5. Is this personal (learnings, notes)? → workspace

**Simple test:** "Does this belong to ME, or to THE ORGANIZATION?"

## Workspace Directory Structure

```
~/.openclaw/workspace-<agent-id>/
├── SOUL.md, AGENTS.md, TOOLS.md, USER.md, MEMORY.md, IDENTITY.md, HEARTBEAT.md
├── memory/
│   ├── decisions/       # YYYY-MM-DD-<topic>.md
│   ├── lessons/         # YYYY-MM-DD-<topic>.md
│   ├── people/          # <person-name>.md
│   └── YYYY-MM-DD.md    # Daily logs
├── expertise/
│   ├── fundamentals/    # Core concepts
│   ├── patterns/        # Proven approaches
│   ├── antipatterns/    # What to avoid
│   └── emerging/        # New developments
├── evolution/           # Growth tracking
├── learning/            # Content being processed
└── projects/            # Active project context
```
