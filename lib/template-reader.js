const fs   = require('fs').promises;

module.exports = class TemplateReader {
  constructor() {
  }

  async read( key, type, templatePath ) {
    //console.log('reading template: ' + templatePath );
    const source = await fs.readFile(templatePath, 'utf-8');
    //console.log( source );
    return { key: key, type: type, source: source }
  }

  async fetch( key, type, path, templateFile ) {
    let templatePath = `${path}/${templateFile}`;
    console.log('------- template path -------')
    console.log( `${key}:${type}` );
    console.log( templatePath );
    let template = await this.read( key, type, templatePath );
    //console.log('****** show String template ********');
    //console.log( showStringTemplate );
    return template
  }
}
