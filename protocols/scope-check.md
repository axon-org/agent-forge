# Scope Check Protocol

**Run before defining or expanding any agent role.** Prevents "Jack of all trades, master of none" agents.

## The Overload Test

| Question | Red Flag If... |
|----------|----------------|
| How many distinct senior-level domains? | More than 2-3 domains requiring deep expertise |
| Would humans specialize? | Yes — real professionals typically pick one path |
| Clear handoff points? | You can identify where one person's work ends and another's begins |
| "AND" vs "WITH"? | Role uses "AND" repeatedly (Designer AND Engineer AND...) |
| Learning surface area? | Agent tracks 5+ rapidly evolving fields |

## Domain Combination Examples

| ✅ Single Specialist | ❌ Overloaded (Split It) |
|---------------------|--------------------------|
| UI Designer (Figma, design systems) | UI Designer + Front-End + Motion Developer |
| Front-End Engineer (React, Next.js) | Full-Stack + DevOps + AI/ML |
| AI Developer (LLMs, agents, ML) | AI + Backend + Data Engineering + MLOps |

## The Collaboration Test

If the role mentions working "with" different specialists, those might be the agents you need:

> "A front-end engineer who works with a **visual designer** and a **backend developer**"

This suggests 3 specialists, not 1 super-agent.

## When to Split

Recommend multiple specialists when:
1. Role spans 3+ distinct professional disciplines
2. Each discipline has its own tools, best practices, and learning paths
3. Senior practitioners typically specialize in one area
4. There are natural handoff points
5. The "evolve yourself" task would require researching completely different fields

## The Lubna Lesson

Lubna (UI Designer) was expanded to include front-end engineering, motion implementation, React/Next.js architecture, and creative development — 4+ distinct domains. The fix: keep Lubna focused on UI design, create a separate Creative Developer. They collaborate: Lubna designs, Creative Dev implements.

**Lesson:** When a requirements prompt mentions collaboration with other roles, those roles should probably be separate agents.
