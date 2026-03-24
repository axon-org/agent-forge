#!/usr/bin/env bash
# Validates TOOLS.md completeness for an agent workspace.
# Usage: ./validate-tools-md.sh <agent-id>
# Exit code 0 = all checks pass, 1 = failures found.
set -euo pipefail

AGENT_ID="${1:?Usage: $0 <agent-id>}"
WORKSPACE="$HOME/.openclaw/workspace-${AGENT_ID}"
TOOLS_FILE="${WORKSPACE}/TOOLS.md"
AGENTS_FILE="${WORKSPACE}/AGENTS.md"
PASS=0
FAIL=0

check() {
  local file="$1" label="$2" pattern="$3"
  if grep -qiE "$pattern" "$file" 2>/dev/null; then
    echo "✅ ${label}"
    ((PASS++))
  else
    echo "❌ MISSING: ${label}"
    ((FAIL++))
  fi
}

echo "=== TOOLS.md Completeness Check for ${AGENT_ID} ==="
echo ""

if [ ! -f "$TOOLS_FILE" ]; then
  echo "❌ TOOLS.md not found at ${TOOLS_FILE}"
  exit 1
fi

# TOOLS.md checks
check "$TOOLS_FILE" "NeuroBits section" "NeuroBits|neurobits"
check "$TOOLS_FILE" "Mem0 section" "Mem0|mem0"
check "$TOOLS_FILE" "Auto-Ingest / Agentic RAG" "Auto-Ingest|Agentic RAG|ingest"
check "$TOOLS_FILE" "Knowledge Lookup Order" "Knowledge Lookup"

# AGENTS.md checks
if [ -f "$AGENTS_FILE" ]; then
  check "$AGENTS_FILE" "AGENTS.md: NeuroBits reference" "NeuroBits|neurobits"
  check "$AGENTS_FILE" "AGENTS.md: Knowledge Lookup Order" "Knowledge Lookup"
else
  echo "⚠️  AGENTS.md not found — skipping AGENTS.md checks"
fi

echo ""
echo "Results: ${PASS} passed, ${FAIL} failed"

if [ "$FAIL" -gt 0 ]; then
  echo "⚠️  Some checks failed. Fix before marking agent as complete."
  exit 1
fi

echo "✅ All checks passed!"
