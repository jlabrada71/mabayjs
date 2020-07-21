const ModelReader  = require('./model-reader');
const Model = require('./model');
const ManifestoReader = require('./manifesto-reader');
const TemplateCompiler = require('./template-compiler');
const CodeGenerator = require('./code-generator');
const TemplateReader = require('./template-reader');
const AggregateCodeGenerator = require('./aggregate-code-generator');
const CompositeCodeGenerator = require('./composite-code-generator');
const CodeWriter = require('./code-writer');
const Handlebars = require('handlebars');

const {
  reduce,
  showMap,
  replace,
  unEscape } = require('./utils');

module.exports = class AppGenerator {
  constructor( ) {
    this.templateReader = new TemplateReader();
  }

  async compileTemplate( key, type, path, template, templateCompiler ) {
    let templatePath = `${path}/${template}`;
    console.log('------- template path -------')
    console.log( `${key}:${type}` );
    console.log( templatePath );
    let showStringTemplate = await this.templateReader.read( key, type, templatePath );
    //console.log('****** show String template ********');
    //console.log( showStringTemplate );
    templateCompiler.compile( showStringTemplate );
    //console.log( templateCompiler.templates );
  }

  async readPrimitiveTemplates( primitives, templatesPath ) {
    let templateCompiler = new TemplateCompiler();

    console.log( JSON.stringify(primitives) );
    for( let primitive of primitives ) {
      const primitiveFile = `${primitive.key}.template`;
      console.log('readPrimitiveTemplates');
      console.log( JSON.stringify(primitive));
      await this.compileTemplate( primitive.key, primitive.type, templatesPath, primitiveFile, templateCompiler);
    }

    console.log('===== templateCompiler=======');
    console.log( templateCompiler.getTemplates() );
    return templateCompiler.getTemplates();
  }

  async readCompositeTemplate( templatesPath , templateFile ) {
    let templateCompiler = new TemplateCompiler();
    // alternatively `${templatePath}/${context}`
    console.log( templatesPath );
    console.log('readCompositeTemplate');
    await this.compileTemplate( 'aggregate', 'composite', templatesPath, templateFile, templateCompiler );

    return templateCompiler.getTemplates();
  }

  async createCodeGenerator( model, manifesto, technologyPath, useCaseName ) {
    let compositeTemplate = await this.readCompositeTemplate( technologyPath, manifesto.contextComposite );
    let compositeCodeGenerator = new CompositeCodeGenerator( new CodeGenerator( compositeTemplate ));

    for( let context of manifesto.contexts ) {
      let contextPath = `${technologyPath}/${useCaseName}/${context}`;

      console.log('88888888888 contextPath ******');
      console.log( contextPath );

      let aggregateTemplate = await this.readPrimitiveTemplates( manifesto.primitives, contextPath);
      const shouldGenerateProperties = manifesto.primitives.length > 1;
      let aggregateCodeGenerator = new AggregateCodeGenerator( model,
                                       new CodeGenerator( aggregateTemplate ), shouldGenerateProperties );
      compositeCodeGenerator.add( context, aggregateCodeGenerator );
    }

    return compositeCodeGenerator;
  }

  async generate( file, templatesPath, manifestoFile, outputPath) {

    //console.log('file: ' + file);
    //console.log('templates: ' + templatesPath );
    //console.log('output: ' + outputPath );
    let modelReader = new ModelReader();
    let model = modelReader.read(file);
    let modelObject = new Model( model );
    //console.log( JSON.stringify(model));
    modelObject.show();

    let manifestoReader = new ManifestoReader();

    let manifesto = manifestoReader.read( manifestoFile );
    console.log( JSON.stringify(manifesto));

    let technology = manifesto.technologies[0];
    console.log( technology )
    let technologyPath = `${templatesPath}/${technology}`;
    const codeWriter = new CodeWriter();

    for( let useCase of manifesto.useCases ) {

      let compositeCodeGenerator = await this.createCodeGenerator( model, manifesto, technologyPath, useCase.name );

      for( let aggregate in model.definitions.aggregates ) {
        console.log( "****** aggregate to generate:" + JSON.stringify(aggregate) +":" + JSON.stringify(model.definitions.aggregates[aggregate]) );
        let aggregateCode = unEscape( compositeCodeGenerator.generateCodeFor( aggregate ));


        const fileNameTemplate = Handlebars.compile( manifesto.fileNameTemplate );
        // "fileNameTemplate" : "{{pascal entityName}}{{pascal usecase}}",
        const fileName = fileNameTemplate({ entityName: aggregate, usecase: useCase.name });

        await codeWriter.write( fileName, aggregateCode, outputPath, useCase.folder, manifesto.ext );
        console.log( aggregateCode );
      }
    }
  }
};
