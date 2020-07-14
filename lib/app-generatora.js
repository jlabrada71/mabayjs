const ModelReader  = require('./model-reader');
const TemplateCompiler = require('./template-compiler');
const CodeGenerator = require('./code-generator');
const TemplateReader = require('./template-reader');
const EntityCodeGenerator = require('./entity-code-generator');
const EntityDefinition = require('./entity-definition');
const {
  reduce,
  showMap,
  replace,
  unEscape } = require('./utils');
const fs = require('fs').promises;

module.exports = class AppGenerator {
  constructor( ) {
    this.templateReader = new TemplateReader();
  }

  async compileTemplate( key, type, path, template, templateCompiler ) {
    let templatePath = `${path}/${template}`;
    //console.log('------- template path -------')
    //console.log( templatePath );
    let showStringTemplate = await this.templateReader.read( key, type, templatePath );
    //console.log('****** show String template ********');
    //console.log( showStringTemplate );
    templateCompiler.compile( showStringTemplate );
    //console.log( templateCompiler.templates );
  }

  async readPrimitiveTemplates( primitives, templatesPath ) {
    let templateCompiler = new TemplateCompiler();

    // console.log( templatePath );
    for( let primitive in primitives ) {
      const primitiveFile = `${primitive.key}.template`;
      await this.compileTemplate( primitive.key, primitive.type, templatesPath, primitiveFile, templateCompiler);
    }

    //console.log('===== templateCompiler=======');
    //console.log( templateCompiler.getTemplates() );
    return templateCompiler.getTemplates();
  }

  async readMixerTemplate( templatesPath ) {
    let templateCompiler = new TemplateCompiler();
    // alternatively `${templatePath}/${context}`
    const templateFile = 'mixer.template';
    console.log( templatePath );
    await this.compileTemplate( 'mixer', 'mixer', templatesPath, templateFile, templateCompiler );

    return templateCompiler.getTemplates();
  }

  async readMixerTemplate( templatesPath ) {
    let templateCompiler = new TemplateCompiler();
    // alternatively `${templatePath}/${context}`
    const templateFile = 'mixer.template';
    console.log( templatePath );
    await this.compileTemplate( 'mixer', 'mixer', templatesPath, templateFile, templateCompiler );

    return templateCompiler.getTemplates();
  }

  showModel( model ) {
    console.log('Aggregates');

    for( let aggregate in model.definitions.aggregates ) {
      console.log(JSON.stringify(aggregate) +":" + JSON.stringify(model.definitions.aggregates[aggregate]) );
    }

    console.log('Entities');
    for( let entity in model.definitions.entities ) {
      console.log(JSON.stringify(entity) + ":" + JSON.stringify(model.definitions.entities[entity]));
    }

    console.log('Value-objects');
    for( let value_object in model.definitions.value_objects ) {
      console.log(JSON.stringify(value_object) + ":" + JSON.stringify(model.definitions.value_objects[value_object]));
    }

    console.log('Primitives');
    for( let primitive in model.definitions.primitives ) {
      console.log(JSON.stringify(primitive) + ":" + JSON.stringify(model.definitions.primitives[primitive]));
    }

  }


  async generate(file, templatesPath, outputPath) {
    // read manifesto file
    let manifesto1 = {
      ext: '.vue',
      tecnologies: ['vue-vuetify'],
      useCases: ['show'],
      entity: 'entity.template',
      contextMixer : 'mixer',
      contexts:['html'],
      primitives: [
                    {key:'entity', type: 'entity', definition:'entity.template'},
                    {key:'name', type: 'property', definition:'name.template'},
                    {key:'age', type: 'property', definition:'age.template'}
                  ],
    }

    let manifesto2 = {
      ext: '.vue',
      tecnologies: ['vue-vuetify'],
      useCases: ['show'],
      entity: 'entity.template',
      contextMixer : 'mixer',
      contexts:['html', 'css','script'],
      primitives: [ {key:'entity', type: 'entity', definition:'entity.template'},
                    {key:'string', type: 'property', definition:'string.template'},
                    {key:'long',   type: 'property', definition:'long.template'},
                 ],
    }

    let manifesto = manifesto1;

    //console.log('file: ' + file);
    //console.log('templates: ' + templatesPath );
    //console.log('output: ' + outputPath );
    let modelReader = new ModelReader();
    let model = modelReader.read(file);
    //console.log( JSON.stringify(model));
    this.showModel( model );

    let technology = manifesto.tecnologies[0];
    let useCase = manifesto.useCases[0];
    let mixer = manifesto.contextMixer;
    let context = manifesto.contexts[0];

    let useCasePath = `${templatesPath}/${useCase}`;
    let technologyPath = `${useCasePath}/${technology}`;
    let contextPath = `${technologyPath}/${context}`;
    console.log('esta trabajando');
  }
};
