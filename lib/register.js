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

  if (format === 'yaml' || format === 'yml') {
    return `${toYaml(config)}\n\n# Also add \"${agentId}\" to main.subagents.allowAgents in openclaw.json.`;
  }

  if (format !== 'json') {
    throw new Error(`Unsupported format \"${format}\". Use json or yaml.`);
  }

  return `${JSON.stringify(config, null, 2)}\n\n// Also add \"${agentId}\" to main.subagents.allowAgents in openclaw.json.`;
}

module.exports = {
  buildRegisterConfig,
  renderRegisterConfig,
};
