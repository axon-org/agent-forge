const fs = require('node:fs');
const path = require('node:path');
const { renderWorkspaceTemplates } = require('./templates');
const { validateWorkspace } = require('./validate');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function createWorkspace(agentId, options) {
  const outputDir = path.resolve(options.output || `./${agentId}`);
  const createdDate = new Date().toISOString().slice(0, 10);

  const vars = {
    agentName: options.name,
    agentId,
    agentDomain: options.domain,
    agentModel: options.model,
    agentEmoji: options.emoji || '🤖',
    createdDate,
    domain: options.domain,
    agentDisplayName: options.name,
    roleTitle: `${options.domain} Specialist`,
    primaryStakeholders: 'Ahmad, Alim',
    agentPersonality: `${options.domain} specialist; pragmatic, precise, and collaborative`,
    agentMission: `build and improve ${options.domain} systems`,
  };

  ensureDir(outputDir);
  for (const file of renderWorkspaceTemplates(vars)) {
    const targetPath = path.join(outputDir, file.outputName);
    fs.writeFileSync(targetPath, file.content, 'utf8');
    console.log(`✅ Wrote ${targetPath}`);
  }

  console.log('\nRunning workspace validation...');
  const status = validateWorkspace(outputDir);
  if (status !== 0) {
    process.exitCode = 1;
    return;
  }

  console.log(`\n🎉 Workspace created successfully at ${outputDir}`);
}

module.exports = {
  createWorkspace,
};
