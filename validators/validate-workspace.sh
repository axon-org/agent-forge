#!/usr/bin/env bash
# Validates an agent workspace has all required files and directories.
# Usage: ./validate-workspace.sh <agent-id>
set -euo pipefail

AGENT_ID="${1:?Usage: $0 <agent-id>}"
WORKSPACE="$HOME/.openclaw/workspace-${AGENT_ID}"
PASS=0
FAIL=0

check_exists() {
  local path="$1" label="$2"
  if [ -e "${WORKSPACE}/${path}" ]; then
    echo "✅ ${label}"
    ((PASS++))
  else
    echo "❌ MISSING: ${label} (${path})"
    ((FAIL++))
  fi
}

echo "=== Workspace Validation for ${AGENT_ID} ==="
echo "Path: ${WORKSPACE}"
echo ""

# Core files
echo "--- Core Files ---"
check_exists "IDENTITY.md" "IDENTITY.md"
check_exists "SOUL.md" "SOUL.md"
check_exists "AGENTS.md" "AGENTS.md"
check_exists "TOOLS.md" "TOOLS.md"
check_exists "USER.md" "USER.md"
check_exists "MEMORY.md" "MEMORY.md"
check_exists "HEARTBEAT.md" "HEARTBEAT.md"

# Directories
echo ""
echo "--- Directories ---"
check_exists "memory" "memory/"
check_exists "memory/decisions" "memory/decisions/"
check_exists "memory/lessons" "memory/lessons/"
check_exists "memory/people" "memory/people/"
check_exists "expertise" "expertise/"
check_exists "expertise/fundamentals" "expertise/fundamentals/"
check_exists "expertise/patterns" "expertise/patterns/"
check_exists "expertise/antipatterns" "expertise/antipatterns/"
check_exists "expertise/emerging" "expertise/emerging/"
check_exists "evolution" "evolution/"
check_exists "learning" "learning/"
check_exists "projects" "projects/"

# SOUL.md content checks
echo ""
echo "--- SOUL.md Content Checks ---"
if [ -f "${WORKSPACE}/SOUL.md" ]; then
  if grep -q "ACE Cognitive Loop\|Tri-Cognitive Loop" "${WORKSPACE}/SOUL.md"; then
    echo "✅ ACE Cognitive Loop section"
    ((PASS++))
  else
    echo "❌ MISSING: ACE Cognitive Loop section in SOUL.md"
    ((FAIL++))
  fi
  if grep -q "Self-Correction" "${WORKSPACE}/SOUL.md"; then
    echo "✅ Self-Correction section"
    ((PASS++))
  else
    echo "❌ MISSING: Self-Correction section in SOUL.md"
    ((FAIL++))
  fi
fi

# Broken symlinks
echo ""
echo "--- Symlink Check ---"
BROKEN=$(find "${WORKSPACE}" -type l ! -exec test -e {} \; -print 2>/dev/null | wc -l | tr -d ' ')
if [ "$BROKEN" -eq 0 ]; then
  echo "✅ No broken symlinks"
  ((PASS++))
else
  echo "❌ ${BROKEN} broken symlink(s) found:"
  find "${WORKSPACE}" -type l ! -exec test -e {} \; -print
  ((FAIL++))
fi

echo ""
echo "Results: ${PASS} passed, ${FAIL} failed"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi

echo "✅ All workspace checks passed!"
