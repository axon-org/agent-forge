# Inter-Agent Communication

## Enabling Communication

Agents must be able to communicate with each other for:
- CEO delegating to specialists
- Specialists collaborating on shared tasks
- Managers assigning work to their reports
- Agents asking each other for help

### Setup Checklist

1. **Add `subagents.allowAgents` to the agent config:**
   ```json
   {
     "id": "<agent-id>",
     "subagents": {
       "allowAgents": ["*"]
     }
   }
   ```

2. **Add to `tools.agentToAgent.allow`:**
   ```json
   {
     "tools": {
       "agentToAgent": {
         "enabled": true,
         "allow": ["main", "<new-agent-id>"]
       }
     }
   }
   ```

3. **Symlink org directory:**
   ```bash
   ln -sf /Users/alimai/clawd/org ~/.openclaw/workspace-<agent-id>/org
   ```

4. **Update `org/DIRECTORY.md`** with the new agent's info.

### Session Tools (Automatic)

All agents automatically have access to session tools:
- `sessions_spawn` — Create subagent sessions for delegated tasks
- `sessions_send` — Send messages to active sessions
- `sessions_list` — View active sessions
- `sessions_history` — Review past session interactions

No per-agent configuration needed.

## The Discord Communication Rule

**Discord is for HUMAN visibility. Internal tools are for AGENT coordination.**

If you need another agent to DO something → `sessions_spawn` or `sessions_send`
If you want a HUMAN to SEE something → Post to Discord
Both → Use sessions tool first, THEN post to Discord with status

### What Does NOT Work

- ❌ @tagging another agent in Discord does NOT reach them
- ❌ Assigning tasks via Discord messages
- ❌ Expecting a response from another agent via Discord tag

### The Right Way

```
✅ sessions_spawn({ agentId: "ai-developer", task: "Fix bug in auth.js" })
   THEN post to Discord: "Spawned Devi to fix the auth.js bug."
```
