# 🔨 Agent Forge

**The definitive toolkit for creating specialist AI agents at Axon.**

Agent Forge codifies the [Agent Creation Playbook](https://github.com/axon-org/agent-forge) into reusable templates, guides, protocols, checklists, and validators. It ensures every new agent is created with consistent quality, proper memory systems, and full organizational integration.

## What This Is

Agent Forge handles **agent creation and validation** — the process of going from "we need a specialist for X" to a fully operational, evolution-ready agent with its own workspace, identity, memory, and communication channels.

**Scope:** Creation + validation only. Not runtime management.

## Quick Start

```bash
# 1. Create workspace structure
./templates/workspace/directory-structure.sh <agent-id>

# 2. Copy and customize templates (replace Handlebars variables)
cp templates/workspace/*.hbs ~/.openclaw/workspace-<agent-id>/
# Edit each file: replace {{agentName}}, {{agentId}}, {{agentDomain}}, etc.

# 3. Validate the workspace
./validators/validate-workspace.sh <agent-id>
./validators/validate-tools-md.sh <agent-id>

# 4. Follow the master checklist
# See checklists/master-checklist.yml
```

## Repository Structure

```
agent-forge/
├── README.md                          # This file
├── templates/
│   └── workspace/                     # Handlebars templates for agent workspace files
│       ├── IDENTITY.md.hbs
│       ├── SOUL.md.hbs
│       ├── AGENTS.md.hbs
│       ├── TOOLS.md.hbs
│       ├── USER.md.hbs
│       ├── MEMORY.md.hbs
│       ├── HEARTBEAT.md.hbs
│       └── directory-structure.sh     # Creates workspace directory tree
├── guides/                            # Philosophy and reference guides
│   ├── philosophy.md                  # Axon agent philosophy & research foundation
│   ├── context-grounding.md           # 6-layer context grounding model
│   ├── error-learning.md              # Error-learning protocol
│   ├── discord-setup.md               # Discord bot identity setup
│   ├── memory-system.md               # Multi-tier memory architecture
│   ├── inter-agent-communication.md   # Agent-to-agent messaging
│   └── evolution.md                   # ACE cognitive loop & evolution system
├── protocols/                         # Mandatory procedures
│   ├── scope-check.md                 # Scope overload detection
│   ├── model-selection.md             # Model assignment protocol
│   ├── research-first.md              # Phase 0 research-first gate
│   ├── evolution-frequency.md         # Evolution scheduling by field velocity
│   ├── skill-selection.md             # Skill bundles & installation
│   ├── checkpointing.md              # Task state persistence
│   ├── pre-restart-safety.md          # Gateway restart safety checks
│   └── browser-automation-tiers.md    # Browser tool selection guide
├── checklists/                        # YAML checklists
│   ├── master-checklist.yml           # Complete creation checklist (NEVER SKIP)
│   └── post-creation-checklist.yml    # Post-creation verification
├── validators/                        # Validation scripts
│   ├── validate-workspace.sh          # Checks workspace structure & content
│   └── validate-tools-md.sh          # Checks TOOLS.md completeness
└── examples/                          # Reference implementations
    ├── specialist-agent/              # Specialist agent example (AI Developer)
    │   └── README.md
    └── manager-agent/                 # Manager agent example (CEO)
        └── README.md
```

## Template Variables

Templates use Handlebars syntax. Replace these when creating a new agent:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{agentName}}` | Agent's display name | Devi |
| `{{agentId}}` | Agent's system ID | ai-developer |
| `{{agentEmoji}}` | Agent's emoji | 🧬 |
| `{{agentDomain}}` | Agent's expertise domain | AI/ML development |
| `{{agentVibe}}` | 2-3 personality traits | Curious, systematic, thorough |
| `{{agentMission}}` | One-line mission | build intelligent AI systems |
| `{{agentModel}}` | Default model | anthropic/claude-sonnet-4-6 |

## The Creation Process

1. **Research First** (protocols/research-first.md) — Can existing agents handle this?
2. **Scope Check** (protocols/scope-check.md) — Is the role focused enough?
3. **Model Selection** (protocols/model-selection.md) — What model fits?
4. **Create Workspace** (templates/) — Set up files and directories
5. **Register** — Add to OpenClaw config
6. **Set Up Discord** (guides/discord-setup.md) — Bot identity
7. **Configure Evolution** (guides/evolution.md) — Learning schedule
8. **Validate** (validators/) — Run all checks
9. **Document** — Update registry and dashboard

## Key Principles

- **Specialists over generalists** — Each agent has a focused domain
- **Context grounding** — 6-layer model for decision-making
- **Error-learning** — Same mistake never happens twice
- **ACE Cognitive Loop** — Generator → Reflector → Curator
- **Gardener model** — Humans cultivate agents, not command them
- **Silent evolution** — Specialists learn quietly, CEO synthesizes

## Related

- **Playbook (legacy):** `~/Projects/agent-architecture/PLAYBOOK.md` → Now redirects here
- **Agent Registry:** `~/.openclaw/workspace-architect/AGENT_REGISTRY.md`
- **Org Capabilities:** `~/Projects/agent-architecture/org/CAPABILITIES.md`

---

*Built by Idris (Architect) for Axon. Follow this forge. Create living, breathing specialists.*
