# agent-forge

[![Validate](https://github.com/axon-org/agent-forge/actions/workflows/validate.yml/badge.svg)](https://github.com/axon-org/agent-forge/actions/workflows/validate.yml)

Templates, protocols, and guides for creating OpenClaw specialist agents.

## What this includes
- Workspace file templates (Handlebars)
- Archetype overlays (`strategy`, `engineering`, `design`, `operations`)
- Modular AGENTS sections
- Validation scripts
- Example real agent configuration
- CLI for scaffolding and validation

## Structure

```text
templates/
  workspace/              # SOUL/AGENTS/TOOLS/USER/IDENTITY/HEARTBEAT templates
  archetypes/             # Additive overlays by archetype
  sections/               # Optional AGENTS sections
  cron/                   # Evolution cron templates
validators/               # Workspace/tool validation scripts
protocols/                # Decision frameworks
guides/                   # Explanatory docs
checklists/               # Machine-readable checklists
examples/                 # Real-world example configs
bin/                      # CLI entrypoint
lib/                      # CLI command implementation
```

## Install CLI locally

```bash
git clone https://github.com/axon-org/agent-forge.git
cd agent-forge
npm install
npm link
```

This makes `agent-forge` available globally on your machine.

## Quick start (full workflow)

```bash
# 1) Generate workspace (optionally with archetype overlay)
agent-forge create venture-strategist \
  --name "Venture Strategist" \
  --domain "strategy" \
  --model "anthropic/claude-sonnet-4-6" \
  --archetype strategy \
  --output /tmp/venture-strategist

# 2) Customize generated files (SOUL.md / AGENTS.md / TOOLS.md)

# 3) Validate workspace quality
agent-forge validate /tmp/venture-strategist

# 4) Generate OpenClaw registration snippet
agent-forge register venture-strategist \
  --model anthropic/claude-sonnet-4-6 \
  --fallbacks "openai/gpt-5.4,google/gemini-3.1-pro"

# 5) Add snippet to openclaw.json + add id to main.subagents.allowAgents
```

## CLI Usage

### Create a workspace

```bash
agent-forge create ai-developer \
  --name "Devi" \
  --domain "ai/ml systems" \
  --model "claude-sonnet-4" \
  --emoji "🧬" \
  --archetype engineering
```

Options:
- `--output /path/to/workspace` (default `./<agent-id>`)
- `--archetype <type>` (additive overlays)

### List available archetypes

```bash
agent-forge list-archetypes
```

### Validate a workspace

```bash
agent-forge validate ~/.openclaw/workspace-ai-developer
```

Validation checks include:
- required files exist and are non-empty
- no leftover `{{...}}` placeholders
- minimum file sizes (`SOUL.md > 500 bytes`, `AGENTS.md > 300 bytes`)
- non-empty Domain Expertise section in `SOUL.md`
- filled-in agent name in `IDENTITY.md`

### Generate registration config snippet

```bash
# JSON (default)
agent-forge register venture-strategist \
  --model anthropic/claude-sonnet-4-6 \
  --fallbacks "openai/gpt-5.4,google/gemini-3.1-pro"

# YAML
agent-forge register venture-strategist \
  --model anthropic/claude-sonnet-4-6 \
  --format yaml
```

Options:
- `--workspace <path>` default `~/.openclaw/workspace-<agent-id>`
- `--model <model>` primary model
- `--fallbacks <m1,m2,...>` comma-separated fallback models
- `--format json|yaml`

### List available templates

```bash
agent-forge list-templates
```

### Run interactive creation checklist

```bash
agent-forge checklist ai-developer
```

## Post-create workflow summary

After `agent-forge create`, the CLI prints:
1. workspace location
2. files needing customization (`SOUL.md`, `AGENTS.md`, `TOOLS.md`)
3. next-step commands for copying workspace, creating agent dir, generating config, and validating

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
