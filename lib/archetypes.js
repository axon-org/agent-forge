const fs = require('node:fs');
const path = require('node:path');
const { renderTemplateFile, packageRoot } = require('./templates');

const ARCHETYPES = {
  strategy: 'Business strategy, research synthesis, and stakeholder-ready decision support',
  engineering: 'Software engineering execution, testing rigor, and code review discipline',
  design: 'Product/design quality, accessibility, and user-centered creative workflows',
  operations: 'Planning, prioritization, execution tracking, and stakeholder operations cadence',
};

function archetypesTemplateDir() {
  return path.join(packageRoot(), 'templates', 'archetypes');
}

function listArchetypes() {
  return Object.entries(ARCHETYPES).map(([id, description]) => ({ id, description }));
}

function assertValidArchetype(archetype) {
  if (!archetype) return;
  if (!Object.prototype.hasOwnProperty.call(ARCHETYPES, archetype)) {
    const available = Object.keys(ARCHETYPES).join(', ');
    throw new Error(`Unknown archetype \"${archetype}\". Available: ${available}`);
  }
}

function renderArchetypeOverlays(archetype, vars) {
  assertValidArchetype(archetype);
  if (!archetype) return [];

  const dir = path.join(archetypesTemplateDir(), archetype);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.hbs'))
    .sort()
    .map((templateFile) => {
      const templatePath = path.join(dir, templateFile);
      const outputName = templateFile.replace(/\.hbs$/, '');
      return {
        templateFile,
        outputName,
        content: renderTemplateFile(templatePath, vars),
      };
    });
}

module.exports = {
  ARCHETYPES,
  archetypesTemplateDir,
  listArchetypes,
  assertValidArchetype,
  renderArchetypeOverlays,
};
