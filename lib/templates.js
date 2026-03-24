const fs = require('node:fs');
const path = require('node:path');
const Handlebars = require('handlebars');

function packageRoot() {
  return path.resolve(__dirname, '..');
}

function workspaceTemplateDir() {
  return path.join(packageRoot(), 'templates', 'workspace');
}

function sectionsTemplateDir() {
  return path.join(packageRoot(), 'templates', 'sections');
}

function listWorkspaceTemplates() {
  const dir = workspaceTemplateDir();
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.hbs'))
    .sort();
}

function listSectionTemplates() {
  const dir = sectionsTemplateDir();
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.hbs'))
    .sort();
}

function renderTemplateFile(templatePath, vars) {
  const raw = fs.readFileSync(templatePath, 'utf8');
  const compiled = Handlebars.compile(raw, { noEscape: true });
  return compiled(vars);
}

function renderWorkspaceTemplates(vars) {
  const dir = workspaceTemplateDir();
  const files = listWorkspaceTemplates();

  return files.map((templateFile) => {
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
  packageRoot,
  workspaceTemplateDir,
  sectionsTemplateDir,
  listWorkspaceTemplates,
  listSectionTemplates,
  renderWorkspaceTemplates,
};
