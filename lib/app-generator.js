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

  async readTemplates(context, task, templatesPath) {
    let templateCompiler = new TemplateCompiler();

    // alternatively `${templatePath}/${context}`
    await this.compileTemplate( context, 'string', 'field', templatesPath, `${context}.${task}.string.template`, templateCompiler);
    await this.compileTemplate( context, 'long', 'field', templatesPath, `${context}.${task}.long.template`, templateCompiler);
    await this.compileTemplate( context, 'entity', 'entity', templatesPath, `${context}.${task}.entity.template`, templateCompiler);

    //console.log('===== templateCompiler=======');
    //console.log( templateCompiler.getTemplates() );
    return templateCompiler.getTemplates();
  }

  async readMainTemplate(templatesPath) {
    let templateCompiler = new TemplateCompiler();
    // alternatively `${templatePath}/${context}`
    await this.compileTemplate( 'main', 'main', 'main', templatesPath, `main.show.template`, templateCompiler );

    return templateCompiler.getTemplates();
  }

  async generateDefinition( definition, entityCodeGenerator, outputPath, manifesto ) {
    //console.log('processing');
    //console.log(JSON.stringify(definition));
    var entity = new EntityDefinition( definition );

    var entityCode = entityCodeGenerator.generate( entity );
    entityCode = unEscape( entityCode );

    await fs.writeFile(`${outputPath}/${entity.name()}${manifesto.ext}` , entityCode);
    //console.log( entityCode );
  }

  async generate(file, templatesPath, outputPath) {
    // read manifesto file
    let manifesto = {
      ext: '.vue',
      tasks: ['show'],
      entity: 'entity.template',
      contexts:['main', 'html', 'css','script'],
      types: [{type:'string', definition:'string.template'},
              {type:'long',   definition:'long.template'},
              ]
    }
    //console.log('file: ' + file);
    //console.log('templates: ' + templatesPath );
    //console.log('output: ' + outputPath );
    let modelReader = new ModelReader();
    let model = modelReader.read(file);

    let entityCodeGenerator = new EntityCodeGenerator();

    let context = 'main'
    let mainTemplate = await this.readMainTemplate( templatesPath );
    entityCodeGenerator.add( context, new CodeGenerator( mainTemplate ));

    context = 'html';
    let htmlTemplate = await this.readTemplates( context, templatesPath );
    entityCodeGenerator.add( context, new CodeGenerator( htmlTemplate ));

    //console.log( entityCodeGenerator );
    //console.log( entityCodeGenerator.codeGenerators['main'].templates)

    context = 'css';
    let cssTemplate = await this.readTemplates( context, templatesPath );
    entityCodeGenerator.add( context, new CodeGenerator(cssTemplate));

    context = 'script';
    let scriptTemplate = await this.readTemplates( context, templatesPath );
    entityCodeGenerator.add( context, new CodeGenerator(scriptTemplate));

    model.definitions.forEach( (definition) => {this.generateDefinition(definition, entityCodeGenerator,
       outputPath, manifesto ); });
  }
};
