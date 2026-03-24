#!/usr/bin/env bash
set -euo pipefail

TOOLS_FILE="${1:-TOOLS.md}"

if [[ ! -f "$TOOLS_FILE" ]]; then
  echo "❌ TOOLS file not found: $TOOLS_FILE"
  exit 1
fi

# Simple path/command extraction for backticked commands
commands=$(grep -oE '`[^`]+`' "$TOOLS_FILE" | tr -d '`' || true)

if [[ -z "$commands" ]]; then
  echo "⚠️ No commands found in $TOOLS_FILE"
  exit 0
fi

fail=0
while IFS= read -r cmd; do
  bin=$(echo "$cmd" | awk '{print $1}')
  if [[ "$bin" == */* ]]; then
    [[ -x "$bin" || -f "$bin" ]] && echo "✅ $bin" || { echo "❌ Missing path: $bin"; fail=1; }
  else
    command -v "$bin" >/dev/null 2>&1 && echo "✅ $bin" || { echo "❌ Missing command: $bin"; fail=1; }
  fi
done <<< "$commands"

[[ $fail -eq 0 ]] && echo "Tool validation passed." || { echo "Tool validation failed."; exit 1; }
