#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR="${1:-.}"
REQUIRED=(SOUL.md AGENTS.md TOOLS.md USER.md IDENTITY.md HEARTBEAT.md MEMORY.md)

missing=0
for f in "${REQUIRED[@]}"; do
  if [[ ! -f "$TARGET_DIR/$f" ]]; then
    echo "❌ Missing: $f"
    missing=1
  else
    echo "✅ Found: $f"
  fi
done

if [[ $missing -eq 1 ]]; then
  echo "Workspace validation failed."
  exit 1
fi

echo "Workspace validation passed."
