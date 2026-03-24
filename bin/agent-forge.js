#!/usr/bin/env node

const path = require('node:path');
const { Command } = require('commander');
const { createWorkspace } = require('../lib/create');
const { validateWorkspace } = require('../lib/validate');
const {
  listWorkspaceTemplates,
  listSectionTemplates,
  workspaceTemplateDir,
  sectionsTemplateDir,
} = require('../lib/templates');
const { runChecklist } = require('../lib/checklist');

const program = new Command();

program
  .name('agent-forge')
  .description('Scaffold and validate OpenClaw agent workspaces')
  .version('0.2.0');

program
  .command('create <agentId>')
  .description('Scaffold a new agent workspace')
  .requiredOption('--name <name>', 'Agent display name')
  .requiredOption('--domain <domain>', 'Agent domain, e.g. backend')
  .requiredOption('--model <model>', 'Agent model, e.g. claude-sonnet-4')
  .option('--emoji <emoji>', 'Agent emoji', '🤖')
  .option('--output <path>', 'Output directory (default: ./<agent-id>)')
  .action((agentId, options) => {
    const output = options.output || `./${agentId}`;
    createWorkspace(agentId, { ...options, output });
  });

program
  .command('validate <workspacePath>')
  .description('Validate an existing workspace')
  .action((workspacePath) => {
    const code = validateWorkspace(path.resolve(workspacePath));
    process.exitCode = code;
  });

program
  .command('list-templates')
  .description('Show available templates and optional sections')
  .action(() => {
    const workspaceTemplates = listWorkspaceTemplates();
    const sectionTemplates = listSectionTemplates();

    console.log(`Workspace templates (${workspaceTemplateDir()}):`);
    workspaceTemplates.forEach((t) => console.log(`  - ${t}`));

    console.log(`\nOptional section templates (${sectionsTemplateDir()}):`);
    if (sectionTemplates.length === 0) {
      console.log('  (none)');
    } else {
      sectionTemplates.forEach((t) => console.log(`  - ${t}`));
    }
  });

program
  .command('checklist <agentId>')
  .description('Run interactive creation checklist')
  .action(async (agentId) => {
    await runChecklist(agentId);
  });

program.parse(process.argv);
