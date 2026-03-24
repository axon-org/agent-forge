const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

function expandHome(p) {
  if (!p) return p;
  if (p === '~') return os.homedir();
  if (p.startsWith('~/')) return path.join(os.homedir(), p.slice(2));
  return p;
}

function parseFallbacks(fallbacksRaw) {
  if (!fallbacksRaw) return [];
  return fallbacksRaw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function checkAgentDirCollision(agentDir) {
  // Warn if agentDir already has sessions from another agent
  const sessionsPath = path.join(path.dirname(agentDir), 'sessions');
  if (fs.existsSync(sessionsPath)) {
    const files = fs.readdirSync(sessionsPath);
    if (files.length > 0) {
      return `⚠️  WARNING: agentDir already has ${files.length} session(s). Reusing agentDir across agents causes collision risks.`;
    }
  }
  return null;
}

function buildRegisterConfig(agentId, options = {}) {
  const workspaceDefault = `~/.openclaw/workspace-${agentId}`;
  const workspace = path.resolve(expandHome(options.workspace || workspaceDefault));
  const agentDir = path.resolve(expandHome(`~/.openclaw/agents/${agentId}/agent`));

  return {
    id: agentId,
    name: agentId,
    workspace,
    agentDir,
    model: {
      primary: options.model || '',
      fallbacks: parseFallbacks(options.fallbacks),
    },
  };
}

function toYaml(obj, indent = 0) {
  const pad = ' '.repeat(indent);
  if (Array.isArray(obj)) {
    if (obj.length === 0) return `${pad}[]`;
    return obj
      .map((item) => {
        if (item && typeof item === 'object') {
          return `${pad}-\n${toYaml(item, indent + 2)}`;
        }
        return `${pad}- ${JSON.stringify(item)}`;
      })
      .join('\n');
  }

  if (obj && typeof obj === 'object') {
    return Object.entries(obj)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.length === 0) return `${pad}${key}: []`;
          return `${pad}${key}:\n${toYaml(value, indent + 2)}`;
        }
        if (value && typeof value === 'object') {
          return `${pad}${key}:\n${toYaml(value, indent + 2)}`;
        }
        return `${pad}${key}: ${JSON.stringify(value)}`;
      })
      .join('\n');
  }

  return `${pad}${JSON.stringify(obj)}`;
}

function renderRegisterConfig(agentId, options = {}) {
  const format = (options.format || 'json').toLowerCase();
  const config = buildRegisterConfig(agentId, options);

  // Check for agentDir collision
  const collision = checkAgentDirCollision(config.agentDir);

  let output = '';

  if (format === 'yaml' || format === 'yml') {
    output = toYaml(config);
  } else if (format === 'json') {
    output = JSON.stringify(config, null, 2);
  } else {
    throw new Error(`Unsupported format "${format}". Use json or yaml.`);
  }

  const commentPrefix = format === 'json' ? '//' : '#';

  const lines = [output, ''];
  if (collision) lines.push(collision, '');
  lines.push(`${commentPrefix} Also add "${agentId}" to main.subagents.allowAgents in openclaw.json.`);
  lines.push('');
  lines.push(`${commentPrefix} Post-registration verification:`);
  lines.push(`${commentPrefix}   1. openclaw gateway restart`);
  lines.push(`${commentPrefix}   2. openclaw agents list    (confirm agent appears)`);
  lines.push(`${commentPrefix}   3. Test spawn the agent to verify workspace resolution`);

  return lines.join('\n');
}

module.exports = {
  buildRegisterConfig,
  renderRegisterConfig,
};
