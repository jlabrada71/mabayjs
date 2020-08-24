const { replace } = require('../utils');
const fs   = require('fs').promises;
const regeneratorRuntime = require("regenerator-runtime");

module.exports = class FileModifier {
  constructor( { fileName, templatePath, configFile } ) {
    this.fileName = fileName;
    this.templateConfig = templatePath + '/' + configFile;
  }

  addVariable( variableName, template ) {
    const instance = replace(template.variableTemplate, template.variableTemplateMark, variableName);
    return replace(this.file, template.fileMark, instance);
  }

  async initiate() {
    this.file = await fs.readFile(this.fileName, 'utf-8');
    this.config = JSON.parse(await fs.readFile(this.templateConfig, 'utf-8'));
    this.templates = this.config.templates;
  }

  async generate( variableName, outputPath) {
    await this.initiate();
    this.templates.forEach((template, i) => {
      this.file = this.addVariable( variableName, template )
    });
    await fs.writeFile(outputPath, this.file);
  }
}
