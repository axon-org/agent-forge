const fs = require('node:fs');
const path = require('node:path');
const { renderWorkspaceTemplates } = require('./templates');
const { renderArchetypeOverlays, assertValidArchetype } = require('./archetypes');
const { validateWorkspace } = require('./validate');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function appendOverlay(targetPath, content) {
  const trimmed = content.trim();
  if (!trimmed) return;
  fs.appendFileSync(targetPath, `\n\n${trimmed}\n`, 'utf8');
  console.log(`➕ Appended archetype overlay to ${targetPath}`);
}

const WORKSPACE_DIRECTORIES = [
  'memory',
  'memory/decisions',
  'memory/lessons',
  'memory/people',
  'expertise',
  'expertise/fundamentals',
  'expertise/patterns',
  'expertise/antipatterns',
  'expertise/emerging',
  'evolution',
  'learning',
  'projects',
  'docs',
  'checkpoints',
];

function createDirectoryStructure(outputDir) {
  for (const dir of WORKSPACE_DIRECTORIES) {
    const fullPath = path.join(outputDir, dir);
    fs.mkdirSync(fullPath, { recursive: true });
  }
  console.log(`📁 Created ${WORKSPACE_DIRECTORIES.length} workspace directories`);
}

function printPostCreateSummary({ outputDir, agentId }) {
  console.log(`\n✅ Workspace created at ${outputDir}\n`);
  console.log('📝 Files that need customization:');
  console.log('  - SOUL.md → Add domain expertise details');
  console.log('  - AGENTS.md → Define collaboration protocols');
  console.log('  - TOOLS.md → Configure tool-specific paths\n');
  console.log('🔜 Next steps:');
  console.log('  1. Customize the generated files');
  console.log(`  2. Copy workspace: cp -r ${outputDir} ~/.openclaw/workspace-${agentId}`);
  console.log(`  3. Create agent dir: mkdir -p ~/.openclaw/agents/${agentId}/agent`);
  console.log(`  4. Generate config: agent-forge register ${agentId} --model <model> --fallbacks <m1,m2>`);
  console.log('  5. Add config block to openclaw.json');
  console.log(`  6. Validate: agent-forge validate ~/.openclaw/workspace-${agentId}`);
}

function createWorkspace(agentId, options) {
  const outputDir = path.resolve(options.output || `./${agentId}`);
  const createdDate = new Date().toISOString().slice(0, 10);

  assertValidArchetype(options.archetype);

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
    archetype: options.archetype || null,
  };

  ensureDir(outputDir);

  // Create workspace directory structure
  createDirectoryStructure(outputDir);

  for (const file of renderWorkspaceTemplates(vars)) {
    const targetPath = path.join(outputDir, file.outputName);
    fs.writeFileSync(targetPath, file.content, 'utf8');
    console.log(`✅ Wrote ${targetPath}`);
  }

  const overlays = renderArchetypeOverlays(options.archetype, vars);
  for (const overlay of overlays) {
    const targetPath = path.join(outputDir, overlay.outputName);
    if (!fs.existsSync(targetPath)) continue;
    appendOverlay(targetPath, overlay.content);
  }

  console.log('\nRunning workspace validation...');
  const status = validateWorkspace(outputDir);
  if (status !== 0) {
    process.exitCode = 1;
    return;
  }

  printPostCreateSummary({ outputDir, agentId });
}

module.exports = {
  createWorkspace,
};
