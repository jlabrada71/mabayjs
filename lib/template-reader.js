
const Handlebars = require('handlebars');
const fs   = require('fs').promises;

module.exports = class TemplateReader {
  constructor() {
  }

  async read( context, key, type, templatePath ) {
    //console.log('reading template: ' + templatePath );
    const source = await fs.readFile(templatePath, 'utf-8');
    //console.log( source );
    return { context: context, key: key, type: type, source: source }
  }
}
