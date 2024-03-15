
import TemplateCompiler from './template-compiler.js';

export default class AggregateTemplateCompiler {
  constructor( templateSource ) {
    this.templateSource = templateSource;
  }

  async compilePrimitiveTemplates( primitives, templatesPath ) {
    let templateCompiler = new TemplateCompiler();

    console.log( JSON.stringify(primitives) );
    for( let primitive of primitives ) {
      const primitiveFile = `${primitive.key}.template`;
      console.log('compilePrimitiveTemplates');
      console.log( JSON.stringify(primitive));
      const template = await this.templateSource.fetch( primitive.key, primitive.type, templatesPath, primitiveFile );
      templateCompiler.compile( template );
    }

    console.log('===== templateCompiler=======');
    console.log( templateCompiler.getTemplates() );
    return templateCompiler.getTemplates();
  }

  async compileCompositeTemplate( templatesPath , templateFile ) {
    let templateCompiler = new TemplateCompiler();
    // alternatively `${templatePath}/${context}`
    console.log( templatesPath );
    console.log('compileCompositeTemplate');
    const template = await this.templateSource.fetch( 'aggregate', 'composite', templatesPath, templateFile );
    templateCompiler.compile( template );
    //console.log( templateCompiler.templates );
    return templateCompiler.getTemplates();
  }
}
