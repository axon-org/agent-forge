# Known OpenClaw Agent Issues & Best Practices

_Last updated: 2026-03-24_

## Critical Rules

### 1. Never Reuse `agentDir`
Each agent MUST have a unique `agentDir`. Sharing causes session collision and auth confusion.
- Pattern: `~/.openclaw/agents/<agent-id>/agent`
- The `register` command enforces this by default.

### 2. Config Schema Is Strict
Unknown keys in `agents.list` entries can block gateway startup (see [#52732](https://github.com/openclaw/openclaw/issues/52732)).
Only use documented keys: `id`, `name`, `workspace`, `agentDir`, `model`.

### 3. Workspace Override Edge Cases
Workspace paths in `agents.list` can be silently ignored in some subagent scenarios ([#21770](https://github.com/openclaw/openclaw/issues/21770), [#29367](https://github.com/openclaw/openclaw/issues/29367)).
Always verify post-registration:
```bash
openclaw agents list
# Then test-spawn the agent and confirm cwd is correct
```

### 4. Binding Specificity Is Deterministic
Channel bindings follow "most specific wins" routing. Account-scoped bindings (`accountId: "specific"`) beat wildcard (`"*"`).
Plan your bindings before registration.

## Post-Registration Checklist
1. `openclaw gateway restart`
2. `openclaw agents list` — confirm agent appears with correct workspace
3. Test-spawn the agent — verify it resolves the right workspace
4. Check session isolation — sessions should be under `~/.openclaw/agents/<id>/sessions/`

## Common Community Pain Points
- Config complexity — bindings and routing rules are hard to reason about
- Memory durability — no built-in backup; use git snapshots of workspace
- Handoff protocols — under-specified between agents; define explicit contracts
- Schema drift — OpenClaw releases frequently; test after upgrades

## Relevant GitHub Issues
- [#49895](https://github.com/openclaw/openclaw/issues/49895) — Sub-agent lifecycle management
- [#29367](https://github.com/openclaw/openclaw/issues/29367) — Default subagent workspace inheritance
- [#52732](https://github.com/openclaw/openclaw/issues/52732) — Per-agent config overrides rejected
- [#21770](https://github.com/openclaw/openclaw/issues/21770) — Workspace override ignored in some paths
- [#50073](https://github.com/openclaw/openclaw/issues/50073) — Skill-based task routing proposal
