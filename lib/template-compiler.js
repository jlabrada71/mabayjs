
const Handlebars = require('handlebars');

module.exports = class TemplateCompiler {
  constructor() {
    this.templates = [];
  }

  compile( templateSource ) {

    let template = Handlebars.compile( templateSource.source );
    if( this.templates[ templateSource.type ] == null) {
      this.templates[ templateSource.type ] = new Map();
    }
    this.templates[templateSource.type].set( templateSource.key, template );
  }

  getTemplate( type, key ) {
    return this.templates[type].get( key );
  }

  getTemplates() {
    return this.templates;
  }
}
