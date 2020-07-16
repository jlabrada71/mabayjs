const ModelReader  = require('./model-reader');
const Model = require('./model');
const ManifestoReader = require('./manifesto-reader');
const TemplateCompiler = require('./template-compiler');
const CodeGenerator = require('./code-generator');
const TemplateReader = require('./template-reader');
const AggregateCodeGenerator = require('./aggregate-code-generator');
const CodeWriter = require('./code-writer');

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

  async readMixerTemplate( templatesPath ) {
    let templateCompiler = new TemplateCompiler();
    // alternatively `${templatePath}/${context}`
    const templateFile = 'mixer.template';
    console.log( templatePath );
    console.log('readMixerTemplate');
    await this.compileTemplate( 'mixer', 'mixer', templatesPath, templateFile, templateCompiler );

    return templateCompiler.getTemplates();
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
    let useCase = manifesto.useCases[0];
    let mixer = manifesto.contextMixer;
    let context = manifesto.contexts[0];
    let ext = manifesto.ext;

    let technologyPath = `${templatesPath}/${technology}`;
    let useCasePath = `${technologyPath}/${useCase}`;
    let contextPath = `${useCasePath}/${context}`;

    console.log('88888888888 contextPath ******');
    console.log( contextPath );

    let aggregateTemplate = await this.readPrimitiveTemplates( manifesto.primitives, contextPath);
    let aggregateCodeGenerator = new AggregateCodeGenerator( model,
                                     new CodeGenerator( aggregateTemplate ));

    for( let aggregate in model.definitions.aggregates ) {
      console.log( "****** aggregate to generate:" + JSON.stringify(aggregate) +":" + JSON.stringify(model.definitions.aggregates[aggregate]) );
      let aggregateCode = unEscape( aggregateCodeGenerator.generateCodeFor( aggregate ));
      const codeWriter = new CodeWriter();
      await codeWriter.write( aggregate, aggregateCode, outputPath, ext );
      console.log( aggregateCode );
    }

   // ********************************************************************************
   // pending definition of MixerCodeGenerator ( could be a composite pattern )
     let mixerTemplate = await this.readMixerTemplate( technologyPath );
   //  let mixerCodeGenerator = new MixerCodeGenerator( new CodeGenerator( mixerTemplate ));

    //model.definitions.aggregates.forEach( (aggregate) => {this.generateDefinition(aggregate, aggregate, aggregateCodeGenerator,
    //   outputPath, manifesto.ext ); });
//  }
  }
};
