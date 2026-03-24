const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { packageRoot } = require('./templates');

const REQUIRED_FILES = [
  'SOUL.md',
  'AGENTS.md',
  'TOOLS.md',
  'USER.md',
  'IDENTITY.md',
  'HEARTBEAT.md',
  'MEMORY.md',
];

const PLACEHOLDER_PATTERNS = [
  /\{\{[^}]+\}\}/, // Handlebars leftovers
];

function runShellValidator(targetPath) {
  const script = path.join(packageRoot(), 'validators', 'validate-workspace.sh');
  return spawnSync('bash', [script, targetPath], { stdio: 'inherit' });
}

function validateWorkspace(targetPath) {
  const absolute = path.resolve(targetPath);
  let hasErrors = false;

  const shellResult = runShellValidator(absolute);
  if (shellResult.status !== 0) {
    hasErrors = true;
  }

  for (const file of REQUIRED_FILES) {
    const fp = path.join(absolute, file);
    if (!fs.existsSync(fp)) {
      console.error(`❌ Missing required file: ${file}`);
      hasErrors = true;
      continue;
    }

    const content = fs.readFileSync(fp, 'utf8');
    if (!content || content.trim().length === 0) {
      console.error(`❌ File is empty: ${file}`);
      hasErrors = true;
      continue;
    }

    if (PLACEHOLDER_PATTERNS.some((rx) => rx.test(content))) {
      console.error(`❌ Placeholder content detected in ${file}`);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.error('Workspace validation failed.');
    return 1;
  }

  console.log('Workspace validation passed.');
  return 0;
}

module.exports = {
  REQUIRED_FILES,
  validateWorkspace,
};
