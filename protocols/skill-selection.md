# Skill Selection Protocol

## Baseline Install (All New Agents)

Install these first to standardize quality and evolution:
- `agent-identity-kit`
- `skill-vetting`
- `skill-creator`
- `evolver`
- `codex-core` — Axon Dev Codex core standards

## Domain Bootstrap Pattern

After baseline, install 5-8 domain-specific foundational skills:
1. **Execution substrate** (e.g., docker, sandbox, runtime)
2. **Core workflow** (e.g., api-dev, artifacts-builder, test-runner)
3. **Quality guardrails** (e.g., tdd-guide, lint/testing skills)
4. **Collaboration layer** (e.g., git-essentials, github)
5. **Deployment/operations** (if relevant)

## Recommended Starter Bundles

| Agent Type | Starter Skills |
|------------|---------------|
| AI Developer | docker-essentials, test-runner, tdd-guide, ollama-local-llm, codex-backend, codex-ai-ml |
| UI Designer | anthropic-frontend-design, ui-skills, generative-ui-toolkit, codex-frontend, codex-design-system |
| Backend Developer | docker-essentials, docker-sandbox, api-dev, test-runner, tdd-guide, backend-patterns, git-essentials, github, codex-backend |
| Frontend Developer | artifacts-builder, anthropic-frontend-design, api-dev, test-runner, git-essentials, github, codex-frontend, codex-design-system |
| DevOps Engineer | docker-essentials, docker-sandbox, coder-workspaces, git-essentials, github, ssh-tunnel, codex-devops |
| QA Engineer | test-runner, tdd-guide, api-dev, git-essentials, github, docker-essentials, codex-qa |
| Revenue Architect | business-model-canvas, financial-calculator, pricing-strategy-toolkit |

## Custom Skill Trigger Criteria

Create custom skills when:
- No trusted public skill exists
- Existing skill lacks required depth
- Internal conventions must be enforced
- Reuse potential spans 2+ agents

## Verification Checklist

- [ ] Skill directory exists in expected location
- [ ] `SKILL.md` exists and is readable
- [ ] Scripts (if any) are executable
- [ ] Agent can invoke skill in a real task
- [ ] No broken symlinks: `find ~/.openclaw/workspace-<id> -type l ! -exec test -e {} \; -print`
