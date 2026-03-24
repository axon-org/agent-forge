# Task Checkpointing Protocol

**Required for:** All multi-step work, especially browser automation.

**Principle:** Any task that takes >2 minutes or involves multiple steps MUST be designed to resume after interruption.

## Checkpoint Requirements

1. **State Persistence** — Save task state to disk
2. **Idempotent Operations** — Steps can be safely re-run
3. **Recovery Procedure** — Documented way to resume
4. **Progress Logging** — Clear indication of current stage

## Checkpoint File Structure

```
~/.openclaw/workspace-{agent-id}/
  checkpoints/
    {task-id}.json          # Current state
    {task-id}.log           # Progress log
    {task-id}.recovery.md   # Recovery instructions
```

## Example Checkpoint

```json
{
  "task_id": "stitch-mockup-20260211",
  "agent": "ui-designer",
  "started": "2026-02-11T10:05:00Z",
  "stage": "assets_uploaded",
  "data": {
    "project_id": "abc123",
    "assets": ["logo.png", "hero.jpg"]
  },
  "next_steps": ["Generate mockup variations", "Export final designs"],
  "safe_to_interrupt": false
}
```

## Design Pattern

```
def long_running_task(task_id, resume_from=None):
    # Load checkpoint if resuming
    if checkpoint_exists:
        state = load_checkpoint()
    else:
        state = initialize()

    # Each stage checks state before executing
    if state.stage == "initialized":
        do_setup()
        save_checkpoint()

    if state.stage == "setup_complete":
        do_processing()
        save_checkpoint()

    if state.stage == "processing_complete":
        finalize()
        cleanup_checkpoint()
```

## When to Skip Checkpointing

Only skip for tasks that:
- Complete in <2 minutes
- Are trivial to restart from scratch
- Have no expensive setup or side effects
- Don't involve external state
