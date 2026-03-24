# agent-forge

[![Validate](https://github.com/axon-org/agent-forge/actions/workflows/validate.yml/badge.svg)](https://github.com/axon-org/agent-forge/actions/workflows/validate.yml)

Templates, protocols, and guides for creating OpenClaw specialist agents.

## What this includes
- Workspace file templates (Handlebars)
- Modular AGENTS sections
- Protocol docs and guides
- Validation scripts
- Example real agent configuration
- CLI for scaffolding and validation

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
bin/           # CLI entrypoint
lib/           # CLI command implementation
```

## Install CLI locally

```bash
git clone https://github.com/axon-org/agent-forge.git
cd agent-forge
npm install
npm link
```

This makes `agent-forge` available globally on your machine.

## CLI Usage

### Create a workspace

```bash
agent-forge create ai-developer \
  --name "Devi" \
  --domain "ai/ml systems" \
  --model "claude-sonnet-4" \
  --emoji "🧬"
```

Optional: `--output /path/to/workspace`

### Validate a workspace

```bash
agent-forge validate ~/.openclaw/workspace-ai-developer
```

### List available templates

```bash
agent-forge list-templates
```

### Run interactive creation checklist

```bash
agent-forge checklist ai-developer
```

## Direct script usage

```bash
./validators/validate-workspace.sh ~/Projects/workspace-ai-specialist
./validators/validate-tools.sh ~/Projects/workspace-ai-specialist/TOOLS.md
```

## Template Variables
Common Handlebars variables used in `templates/workspace/*.hbs`:
- `{{agentName}}`
- `{{agentId}}`
- `{{agentDomain}}`
- `{{agentModel}}`
- `{{agentEmoji}}`
- `{{createdDate}}`

## Notes
- Content is distilled from `~/Projects/agent-architecture/PLAYBOOK.md`.
- CLI is plain Node.js (no build step).
