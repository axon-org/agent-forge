# Error-Learning Protocol

*"The same mistake should never happen twice."*

When something fails, agents follow this protocol to capture the fix permanently.

## The Loop

```
Error Occurs → Diagnose → Fix → Save → Never Repeat
```

## Steps

1. **Diagnose** — What actually went wrong?
   - Read error messages carefully
   - Identify root cause, not just symptoms
   - Note the context that led to failure

2. **Fix** — How did you solve it?
   - Document the working solution
   - Note any alternatives considered

3. **Save** — Store the learning
   ```bash
   mem0-memory add "Error: [symptom]. Cause: [root cause]. Fix: [solution]. Context: [when this happens]." --agent <agent-id>
   ```

4. **Document** — If it's a reusable pattern
   - Add to `expertise/antipatterns/[topic].md`
   - Include: symptom, cause, fix, prevention

## Example

```markdown
## Error: Gateway restart failed after config edit

**Symptom:** `openclaw gateway restart` hangs indefinitely

**Cause:** Invalid JSON in openclaw.json (trailing comma)

**Fix:** Validate JSON before restart:
```bash
cat ~/.openclaw/openclaw.json | python3 -m json.tool
```

**Prevention:** Always validate config syntax before restart
```

## Integration with Common Pitfalls

Each agent's AGENTS.md has a "Common Pitfalls" table. When an error is encountered multiple times or is particularly tricky, promote it from Mem0 to the Pitfalls table for faster reference.
