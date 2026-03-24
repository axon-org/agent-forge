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
  /\{\{[^}]+\}\}/, // Handlebars leftovers / raw template placeholders
];

const MIN_BYTES = {
  'SOUL.md': 500,
  'AGENTS.md': 300,
};

function runShellValidator(targetPath) {
  const script = path.join(packageRoot(), 'validators', 'validate-workspace.sh');
  return spawnSync('bash', [script, targetPath], { stdio: 'inherit' });
}

function hasDomainExpertiseContent(soul) {
  const headerRegex = /^##\s+Domain Expertise(?:\s+Summary)?\s*$/im;
  const match = soul.match(headerRegex);
  if (!match) return false;

  const after = soul.slice(match.index + match[0].length);
  const nextHeaderIndex = after.search(/^##\s+/m);
  const section = nextHeaderIndex >= 0 ? after.slice(0, nextHeaderIndex) : after;
  const plain = section.replace(/[`*_>#\-]/g, ' ').replace(/\s+/g, ' ').trim();
  return plain.length > 50;
}

function identityNameLooksFilled(identityContent) {
  const match = identityContent.match(/\*\*Name:\*\*\s*(.+)/i);
  if (!match) return false;
  const value = match[1].trim();
  if (!value) return false;
  return !value.includes('{{') && value.toLowerCase() !== 'agent name';
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

    if (MIN_BYTES[file]) {
      const bytes = fs.statSync(fp).size;
      if (bytes <= MIN_BYTES[file]) {
        console.error(`❌ ${file} is too small (${bytes} bytes). Must be > ${MIN_BYTES[file]} bytes.`);
        hasErrors = true;
      }
    }
  }

  const soulPath = path.join(absolute, 'SOUL.md');
  if (fs.existsSync(soulPath)) {
    const soul = fs.readFileSync(soulPath, 'utf8');
    if (!hasDomainExpertiseContent(soul)) {
      console.error('❌ SOUL.md must include a non-empty "Domain Expertise" section with >50 chars of content.');
      hasErrors = true;
    }
  }

  const identityPath = path.join(absolute, 'IDENTITY.md');
  if (fs.existsSync(identityPath)) {
    const identity = fs.readFileSync(identityPath, 'utf8');
    if (!identityNameLooksFilled(identity)) {
      console.error('❌ IDENTITY.md must include a filled-in agent name (not template default).');
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
