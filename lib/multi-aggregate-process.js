
const Handlebars = require('handlebars');
const CodeGenerator = require('./code-generator');
const AggregateCodeGenerator = require('./aggregate-code-generator');
const CompositeCodeGenerator = require('./composite-code-generator');
const { unEscape } = require('./utils');

module.exports = class MultiAggregateProcess {
  constructor( model, manifesto, technologyPath, useCase, aggregateTemplateCompiler, codeWriter, outputPath ) {
    this.model = model;
    this.manifesto = manifesto;
    this.technologyPath = technologyPath
    this.useCase = useCase;
    this.aggregateTemplateCompiler = aggregateTemplateCompiler;
    this.codeWriter = codeWriter;
    this.outputPath = outputPath;
  }

  async createCodeGenerator() {
    let compositeTemplate = await this.aggregateTemplateCompiler.compileCompositeTemplate( this.technologyPath, this.manifesto.contextComposite );
    let compositeCodeGenerator = new CompositeCodeGenerator( new CodeGenerator( compositeTemplate ));

    for( let context of this.manifesto.contexts ) {
      let contextPath = `${this.technologyPath}/${this.useCase.name}/${context}`;

      console.log('****** contextPath ******');
      console.log( contextPath );

      let aggregateTemplate = await this.aggregateTemplateCompiler.compilePrimitiveTemplates( this.manifesto.primitives, contextPath);
      const shouldGenerateProperties = this.manifesto.primitives.length > 1;
      let aggregateCodeGenerator = new AggregateCodeGenerator( this.model,
                                       new CodeGenerator( aggregateTemplate ), shouldGenerateProperties );
      compositeCodeGenerator.add( context, aggregateCodeGenerator );
    }

    return compositeCodeGenerator;
  }

  async generateCode() {
    const codeGenerator = await this.createCodeGenerator();

    let compoundCode = unEscape( codeGenerator.generateCodeForList( this.model.definitions.aggregates ));

    const fileNameTemplate = Handlebars.compile( this.manifesto.fileNameTemplate );
    // "fileNameTemplate" : "{{pascal usecase}}",
    const fileName = fileNameTemplate({ usecase: this.useCase.name });

    await this.codeWriter.write( fileName, compoundCode, this.outputPath, this.useCase.folder, this.manifesto.ext );
    console.log( compoundCode );
  }
}
