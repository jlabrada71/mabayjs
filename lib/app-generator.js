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

  async compileTemplate( context, key, type, path, template, templateCompiler ) {
    let templatePath = `${path}/${template}`;
    //console.log('------- template path -------')
    //console.log( templatePath );
    let showStringTemplate = await this.templateReader.read( context, key, type, templatePath);
    //console.log('****** show String template ********');
    //console.log( showStringTemplate );
    templateCompiler.compile( showStringTemplate );
    //console.log( templateCompiler.templates );
  }

  async readPrimitiveTemplates(tecnology, context, task, primitives, templatesPath) {
    let templateCompiler = new TemplateCompiler();

    // alternatively `${templatePath}/${context}`

    console.log( templatePath );
    for( let primitive in primitives ) {
      const templatePath = `${tecnology}/${context}/${task}/${primitive.primitive}.template`;
      await this.compileTemplate( context, primitive.primitive, primitive.type, templatesPath, templatePath, templateCompiler);
    }

    //await this.compileTemplate( context, 'long', 'field', templatesPath, `${tecnology}/${context}/${task}/long.template`, templateCompiler);
    //await this.compileTemplate( context, 'entity', 'entity', templatesPath, `${tecnology}/${context}/${task}/entity.template`, templateCompiler);

    //console.log('===== templateCompiler=======');
    //console.log( templateCompiler.getTemplates() );
    return templateCompiler.getTemplates();
  }

  async readMainTemplate(tecnology, context, task, templatesPath) {
    let templateCompiler = new TemplateCompiler();
    // alternatively `${templatePath}/${context}`
    const templatePath = `${tecnology}/${context}/${task}/template`;
    console.log( templatePath );
    await this.compileTemplate( context, 'main', 'main', templatesPath, templatePath, templateCompiler );

    return templateCompiler.getTemplates();
  }

  async generateDefinition( definition, entityCodeGenerator, outputPath, ext ) {
    //console.log('processing');
    //console.log(JSON.stringify(definition));
    var entity = new EntityDefinition( definition );

    var entityCode = entityCodeGenerator.generate( entity );
    entityCode = unEscape( entityCode );

    await fs.writeFile(`${outputPath}/${entity.name()}${ext}` , entityCode);
    //console.log( entityCode );
  }

  async generate(file, templatesPath, outputPath) {
    // read manifesto file
    let manifesto = {
      ext: '.vue',
      tecnology: ['vue-vuetify'],
      tasks: ['show'],
      entity: 'entity.template',
      mainContext : 'main',
      contexts:['html', 'css','script'],
      primitives: [{primitive:'string', type: 'primitive', definition:'string.template'},
                   {primitive:'long', type: 'primitive', definition:'long.template'},
                 ]
    }
    //console.log('file: ' + file);
    //console.log('templates: ' + templatesPath );
    //console.log('output: ' + outputPath );
    let modelReader = new ModelReader();
    let model = modelReader.read(file);
    //console.log( JSON.stringify(model));
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

    return;

    let tecnology = 'vue-vuetify';

    let entityCodeGenerator = new EntityCodeGenerator();

    let task = 'show';

    let template = await this.readMainTemplate(tecnology, manifesto.mainContext, task, templatesPath);
    entityCodeGenerator.add( context, new CodeGenerator( template ));

    for( let context of manifesto.contexts ) {
      let template = await this.readPrimitiveTemplates(tecnology, context, task, manifesto.primitives, templatesPath);
      entityCodeGenerator.add( context, new CodeGenerator( template ));
    }

  //  let context = 'main';


  //  context = 'html';
  //  let htmlTemplate = await this.readTemplates(tecnology, context, task, templatesPath);
  //  entityCodeGenerator.add( context, new CodeGenerator( htmlTemplate ));

  //  context = 'css';
  //  let cssTemplate = await this.readTemplates( tecnology, context, task, templatesPath );
  //  entityCodeGenerator.add( context, new CodeGenerator(cssTemplate));

  //  context = 'script';
  //  let scriptTemplate = await this.readTemplates( tecnology, context, task, templatesPath );
  //  entityCodeGenerator.add( context, new CodeGenerator(scriptTemplate));

    //console.log( entityCodeGenerator );
    //console.log( entityCodeGenerator.codeGenerators['main'].templates)

    model.definitions.forEach( (definition) => {this.generateDefinition(definition, entityCodeGenerator,
       outputPath, manifesto.ext ); });
  }
};
