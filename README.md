# agent-forge

Templates, protocols, and guides for creating OpenClaw specialist agents.

This repo replaces a single monolithic playbook with a modular system you can compose per agent.

## Phase 1 Scope
- Workspace file templates (Handlebars)
- Modular AGENTS sections
- Protocol docs (creation, model selection, skill assignment)
- Conceptual guides
- Validation scripts
- Example real agent configuration

## Structure

```text
templates/
  workspace/   # SOUL/AGENTS/TOOLS/USER/IDENTITY/HEARTBEAT templates
  sections/    # Optional AGENTS sections
  cron/        # Evolution cron templates
validators/    # Workspace/tool validation scripts
protocols/     # Decision frameworks
guides/        # Explanatory docs
checklists/    # Machine-readable checklists
examples/      # Real-world example configs
scripts/       # Utility scripts (workspace scaffold)
```

## Quick Start

```bash
git clone git@github.com:axon-org/agent-forge.git
cd agent-forge

# scaffold a workspace
./scripts/setup-workspace.sh ai-specialist ~/Projects/workspace-ai-specialist

# validate core files
./validators/validate-workspace.sh ~/Projects/workspace-ai-specialist
./validators/validate-tools.sh ~/Projects/workspace-ai-specialist/TOOLS.md
```

## Template Variables
Common Handlebars variables used in `templates/workspace/*.hbs`:
- `{{agentName}}` / `{{agentDisplayName}}`
- `{{agentId}}`
- `{{domain}}`
- `{{roleTitle}}`
- `{{primaryStakeholders}}`

## Notes
- Content is distilled from `~/Projects/agent-architecture/PLAYBOOK.md`.
- Phase 1 intentionally includes docs/templates only (no runtime service code).
