#!/usr/bin/env bash
# Creates the standard agent workspace directory structure.
# Usage: ./directory-structure.sh <agent-id>
set -euo pipefail

AGENT_ID="${1:?Usage: $0 <agent-id>}"
WORKSPACE="$HOME/.openclaw/workspace-${AGENT_ID}"

mkdir -p "${WORKSPACE}"/{memory/{decisions,lessons,people},expertise/{fundamentals,patterns,antipatterns,emerging},evolution,learning,projects,docs,checkpoints}

echo "✅ Created workspace structure at ${WORKSPACE}"
