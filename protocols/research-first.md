# Research-First Protocol (Phase 0)

### ⚠️ THIS PHASE IS MANDATORY BEFORE ANY AGENT CREATION

> **"A skill upgrade for an existing agent beats creating a new agent 90% of the time."**

## Step 0.1: Can Existing Agents Handle This?

```bash
# Review current organization
cat ~/.openclaw/workspace-architect/AGENT_REGISTRY.md

# Check each agent's domain and current skills
for agent in $(ls ~/.openclaw/ | grep workspace- | sed 's/workspace-//'); do
  echo "=== $agent ==="
  head -30 ~/.openclaw/workspace-$agent/SOUL.md | grep -A5 "Domain\|Expertise"
done
```

**Ask yourself:**
- Does this capability fall under an existing agent's domain?
- Would a skill upgrade solve this without a new agent?
- Is this a gap in expertise, not a gap in agents?

## Step 0.2: Deep Research — Skills That Could Fill the Gap

Check ALL primary skill sources:
- https://clawdhub.com/skills
- https://skills.sh
- https://skillhub.club/browse

Search for domain-specific skills and community sources.

## Step 0.3: Pull Best Practices from the Wild

If a new agent might be needed:
```bash
web_search "[domain] agent SOUL.md github"
web_search "[domain] specialist agent architecture"
web_search "multi-agent [domain] patterns"
```

## Step 0.4: Document Research Summary

```markdown
## Research Summary: [Capability Request]

### Existing Agent Analysis
| Agent | Domain Overlap | Can Upgrade? | Notes |
|-------|---------------|--------------|-------|

### Skills Found
| Skill | Source | Target Agent | Notes |
|-------|--------|--------------|-------|

### Recommendation
[ ] Skill upgrade for [existing agent]
[ ] New agent required (explain why)
[ ] Combination approach
```

## Step 0.5: CEO Approval Gate

Send research summary to Alim (CEO) for approval. **Only proceed to Phase 1 after CEO approves.**
