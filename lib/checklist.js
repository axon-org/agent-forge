const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const { packageRoot } = require('./templates');

function parseChecklistYaml(text) {
  const lines = text.split(/\r?\n/);
  const items = [];
  let inChecklist = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === 'checklist:') {
      inChecklist = true;
      continue;
    }
    if (!inChecklist) continue;

    const match = trimmed.match(/^-\s+(.+)$/);
    if (match) {
      items.push(match[1].replace(/^"|"$/g, ''));
    }
  }

  return items;
}

async function runChecklist(agentId) {
  const checklistPath = path.join(packageRoot(), 'checklists', 'creation-checklist.yaml');
  const raw = fs.readFileSync(checklistPath, 'utf8');
  const items = parseChecklistYaml(raw);

  if (items.length === 0) {
    console.error('No checklist items found.');
    process.exitCode = 1;
    return;
  }

  console.log(`\nCreation checklist for ${agentId}\n`);
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

  const completed = [];
  for (let i = 0; i < items.length; i += 1) {
    const answer = await ask(`[ ] ${items[i]} — done? (y/N): `);
    const done = /^y(es)?$/i.test(answer.trim());
    completed.push(done);
    console.log(`${done ? '[x]' : '[ ]'} ${items[i]}`);
  }

  rl.close();

  const doneCount = completed.filter(Boolean).length;
  console.log(`\nSummary: ${doneCount}/${items.length} completed.`);
}

module.exports = {
  runChecklist,
  parseChecklistYaml,
};
