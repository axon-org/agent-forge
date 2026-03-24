# Evolution Frequency Protocol

## Determining Appropriate Frequency

### Step 1: Research Field Velocity

| Question | Fast-Moving Field | Slower Field |
|----------|------------------|--------------|
| Major tool/framework releases? | Weekly/Monthly | Quarterly/Yearly |
| Best practices change rate? | Months | Years |
| Daily developments to track? | Yes (AI, security) | No (legal, accounting) |
| Does missing a week matter? | Yes, significant | No, catch up easily |

### Step 2: Recommended Frequencies

| Field Type | Examples | Frequency | Cron |
|------------|----------|-----------|------|
| **Rapidly Evolving** | AI/ML, Security, Platform Ops | Daily | `0 9 * * *` |
| **Moderately Evolving** | Frontend, Marketing, Design | 3x/week (Mon/Wed/Fri) | `0 9 * * 1,3,5` |
| **Slowly Evolving** | Project Management, Operations | 2x/week (Mon/Thu) | `0 9 * * 1,4` |

### Step 3: Document & Get Approval

```markdown
## Evolution Frequency Proposal: [Agent Name]

**Domain:** [expertise area]
**Field Velocity Assessment:**
- Tool release frequency: [weekly/monthly/quarterly]
- Best practice change rate: [fast/moderate/slow]
**Recommended Frequency:** [Daily / 3x week / 2x week]
**Cron Expression:** [expr]
```

## Key Rules

- Specialists DO NOT send notifications — they learn and document only
- CEO synthesizes at 12 PM
- All crons use `deliver: false`
- All crons follow ACE Cognitive Loop pattern
