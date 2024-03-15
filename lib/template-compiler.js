
import Handlebars from 'handlebars';

export default class TemplateCompiler {
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

  getTemplate( templateKey ) {
    return this.templates[templateKey.type].get( templateKey.key );
  }

  getTemplates() {
    return this.templates;
  }
}
