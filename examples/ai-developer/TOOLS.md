# TOOLS.md — Devi Quick Reference

Detailed tool notes were moved to `docs/tool-reference.md`.

| Tool | Path | Quick Command |
|---|---|---|
| Mem0 CLI | `~/bin/mem0-memory` | `mem0-memory search "<topic>" --agent ai-developer` |
| NeuroBits | `~/bin/neurobits` | `~/bin/neurobits query "<topic>"` |
| Web Search | `OpenClaw tool: web_search` | `web_search "<query>"` |
| Web Fetch | `OpenClaw tool: web_fetch` | `web_fetch "https://..."` |
| Browser | `OpenClaw tool: browser` | `browser action=snapshot` |
| Python | `python3 / pip / venv` | `python3 -m venv .venv && source .venv/bin/activate` |
| Testing | `pytest` | `pytest -q` |

## Usage Notes
- Use only tools relevant to your specialist domain.
- Prefer repeatable commands and minimal-risk operations.
- Keep this file short; put long examples in `docs/tool-reference.md`.


## Knowledge Lookup Order
1. `expertise/` and `docs/` — local curated knowledge (fastest, most relevant)
2. Mem0 (`mem0-memory search`) — cross-session learnings
3. NeuroBits (`~/bin/neurobits query`) — organizational knowledge base
4. Web search — current external practices (last resort)

## GitHub

- **Account:** devi-axon
- **Auth:** `source scripts/gh-agent-env.sh Devi` or set `GH_CONFIG_DIR=/Users/alimai/.openclaw/workspace-ai-developer/.gh`
- **Usage:** Always set GH_CONFIG_DIR before using `gh` CLI
- **Git config:** Automatically uses `/Users/alimai/.openclaw/workspace-ai-developer/.gitconfig` for commits
