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

invalid=0
for f in "${REQUIRED[@]}"; do
  fp="$TARGET_DIR/$f"
  if [[ ! -s "$fp" ]]; then
    echo "❌ Empty file: $f"
    invalid=1
    continue
  fi

  if grep -qE '\{\{[^}]+\}\}' "$fp"; then
    echo "❌ Placeholder content detected: $f"
    invalid=1
  fi
done

soul_fp="$TARGET_DIR/SOUL.md"
agents_fp="$TARGET_DIR/AGENTS.md"
identity_fp="$TARGET_DIR/IDENTITY.md"

soul_size=$(wc -c < "$soul_fp")
if [[ "$soul_size" -le 500 ]]; then
  echo "❌ SOUL.md too small ($soul_size bytes). Must be > 500 bytes."
  invalid=1
fi

agents_size=$(wc -c < "$agents_fp")
if [[ "$agents_size" -le 300 ]]; then
  echo "❌ AGENTS.md too small ($agents_size bytes). Must be > 300 bytes."
  invalid=1
fi

if ! awk '
  BEGIN { in_section=0; content="" }
  /^##[[:space:]]+Domain Expertise( Summary)?[[:space:]]*$/ { in_section=1; next }
  /^##[[:space:]]+/ && in_section { in_section=0 }
  in_section { content = content $0 " " }
  END {
    gsub(/[[:space:]]+/, " ", content)
    if (length(content) > 50) exit 0
    exit 1
  }
' "$soul_fp"; then
  echo "❌ SOUL.md must include a non-empty Domain Expertise section with >50 chars."
  invalid=1
fi

name_line=$(grep -iE '^- \*\*Name:\*\*' "$identity_fp" || true)
if [[ -z "$name_line" ]]; then
  echo "❌ IDENTITY.md missing Name field."
  invalid=1
else
  name_value=$(echo "$name_line" | sed -E 's/^- \*\*Name:\*\*\s*//')
  lower_name=$(printf "%s" "$name_value" | tr "[:upper:]" "[:lower:]")
  if [[ -z "$name_value" || "$name_value" == *'{{'* || "$lower_name" == 'agent name' ]]; then
    echo "❌ IDENTITY.md Name appears unfilled/template-like."
    invalid=1
  fi
fi

if [[ $invalid -eq 1 ]]; then
  echo "Workspace validation failed."
  exit 1
fi

echo "Workspace validation passed."
