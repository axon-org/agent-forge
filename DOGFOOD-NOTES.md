# DOGFOOD NOTES — Phase 4 (Venture Strategist)

Date: 2026-03-24  
Runner: ai-developer subagent  
Scenario: Create and customize a new `venture-strategist` agent workspace using `agent-forge`.

## What worked well
- `create` command successfully scaffolded all expected core files (`SOUL.md`, `AGENTS.md`, `TOOLS.md`, `IDENTITY.md`, `HEARTBEAT.md`, `USER.md`, `MEMORY.md`).
- Immediate validation after scaffold is useful and gave fast confidence.
- Defaults are clean enough to customize quickly.
- Output path override (`--output`) worked as expected.

## Missing / awkward
- No interactive or flag-based support to pre-fill richer domain sections (expertise bullets, collaboration protocols, escalation rules). Manual editing is still substantial.
- No optional template bundles for common specialist archetypes (strategy, design, engineering, finance) to reach the “80% done” target with less hand-editing.
- Scaffolder assumes config location guidance that may not match runtime reality.

## Template gaps found
- `AGENTS.md` base template could include placeholder sections for:
  - Research protocol
  - Structured deliverables
  - Collaboration handoffs
  - Escalation matrix
- `TOOLS.md` template is generic and doesn’t prompt domain-specific tool categories.
- `HEARTBEAT.md` template is minimal; lacks domain KPI/check placeholders.

## Bugs / inconsistencies encountered
1. **Config path mismatch in instructions vs environment**
   - Requested check: `~/.openclaw/openclaw.yaml`
   - Actual environment uses `~/.openclaw/openclaw.json`.
   - Impact: onboarding friction/confusion when registering new agents.

_No direct runtime crash from `agent-forge` itself was encountered in this run._

## Suggested Phase 5 improvements
1. Add `agent-forge register --print-config-block <agent-id>` to emit ready-to-paste JSON/YAML config snippets.
2. Add `--template <archetype>` (e.g., `venture-strategy`, `engineering`, `design`) for richer initial scaffolds.
3. Add optional guided mode to collect:
   - Domain expertise bullets
   - Collaboration partners
   - Escalation policy
   - Deliverable formats
4. Add post-create checklist output with:
   - Files requiring manual completion
   - Suggested next commands (`validate`, copy workspace, config snippet generation).
5. Add stronger validation rules for “placeholder leftovers” to catch incomplete identity/user/heartbeat sections.

## Overall verdict
- Core generator is reliable.
- Great base scaffolding, but currently closer to ~60–70% complete for specialist agents requiring nuanced operating protocols.
- With archetype templates + registration helper, Phase 5 could realistically hit 85%+ readiness.
