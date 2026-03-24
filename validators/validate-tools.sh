#!/usr/bin/env bash
set -euo pipefail

TOOLS_FILE="${1:-TOOLS.md}"

if [[ ! -f "$TOOLS_FILE" ]]; then
  echo "❌ TOOLS file not found: $TOOLS_FILE"
  exit 1
fi

OPENCLAW_TOOLS_REGEX='^(web_search|web_fetch|browser|read|write|edit|exec|process|message|image|pdf|canvas|tts)$'

commands=$(awk -F'|' '
  /^\|/ {
    cmd=$4
    gsub(/^ +| +$/, "", cmd)
    if (cmd ~ /`[^`]+`/) {
      match(cmd, /`[^`]+`/)
      c=substr(cmd, RSTART+1, RLENGTH-2)
      print c
    }
  }
' "$TOOLS_FILE")

if [[ -z "$commands" ]]; then
  echo "⚠️ No tool commands found in markdown table"
  exit 0
fi

fail=0
while IFS= read -r cmd; do
  [[ -z "$cmd" ]] && continue
  bin=$(echo "$cmd" | awk '{print $1}')

  if [[ "$bin" =~ $OPENCLAW_TOOLS_REGEX ]]; then
    echo "✅ $bin (OpenClaw tool)"
    continue
  fi

  if [[ "$bin" == */* ]]; then
    if [[ -x "$bin" || -f "$bin" ]]; then
      echo "✅ $bin"
    else
      echo "❌ Missing path: $bin"
      fail=1
    fi
  else
    if command -v "$bin" >/dev/null 2>&1; then
      echo "✅ $bin"
    else
      echo "❌ Missing command: $bin"
      fail=1
    fi
  fi
done <<EOF_CMDS
$commands
EOF_CMDS

if [[ $fail -eq 0 ]]; then
  echo "Tool validation passed."
else
  echo "Tool validation failed."
  exit 1
fi
