#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <agent-id> <target-dir>"
  exit 1
fi

AGENT_ID="$1"
TARGET_DIR="$2"

mkdir -p "$TARGET_DIR"/{docs,expertise,memory,assets,projects,evolution,scripts}

for f in SOUL AGENTS TOOLS USER IDENTITY HEARTBEAT; do
  cp "templates/workspace/${f}.md.hbs" "$TARGET_DIR/${f}.md"
done

cat > "$TARGET_DIR/MEMORY.md" <<EOM
# MEMORY.md — ${AGENT_ID}

Long-term curated memory.
EOM

echo "Workspace scaffold created at $TARGET_DIR"
