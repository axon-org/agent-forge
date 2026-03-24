# Pre-Restart Safety Protocol

**NEVER restart the gateway without checking for active work.**

## Before Every Gateway Restart

1. **Run the safety check:**
   ```bash
   ~/Projects/agent-architecture/protocols/browser-resilience/pre-restart-check.sh
   ```

2. **If check FAILS** (active work detected):
   - **Option A:** Wait for tasks to complete
   - **Option B:** Verify tasks have checkpoints, then force restart
   - **Option C:** Manually stop tasks, save state, then restart

3. **If check PASSES:**
   ```bash
   openclaw gateway restart
   ```

## Active Task Monitoring

**File:** `~/.openclaw/active-browser-tasks.json`

Agents must log long-running browser tasks here.

```json
{
  "tasks": [
    {
      "task_id": "unique-task-id",
      "agent": "agent-id",
      "started": "ISO-8601-timestamp",
      "checkpoint_file": "/path/to/checkpoint.json",
      "safe_to_interrupt": false
    }
  ]
}
```

**Task lifecycle:**
- **On start:** Add task, `safe_to_interrupt: false`
- **At checkpoints:** Update `safe_to_interrupt: true`
- **On completion:** Remove task

## Emergency Restart Procedure

If you MUST restart with active work:

1. Document active tasks: `cp ~/.openclaw/active-browser-tasks.json ~/restart-recovery-$(date +%Y%m%d-%H%M).json`
2. Force restart
3. Resume tasks after restart using checkpoints
4. Post-mortem: Why was emergency restart needed?
