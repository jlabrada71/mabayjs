const fs   = require('fs').promises;
const {replace} = require('./../utils');
const CodeWriter = require('./../code-writer');
const _ = require('lodash');

module.exports = class TemplateGenerator {
  constructor( file, entity, templatesPath, technology, useCase, context, outputPath) {
    this.file = file
    this.entity = entity;
    this.templatesPath = templatesPath;
    this.technology = technology;
    this.useCase = useCase;
    this.context = context;
    this.outputPath = outputPath;
  }

  async read( key, type, templatePath ) {
    //console.log('reading template: ' + templatePath );

    //console.log( source );
    return { key: key, type: type, source: source }
  }

  getFileNameTemplate() {
    const fileNameWithExt = this.file.substring( this.file.lastIndexOf('/'));
    const fileName = fileNameWithExt.substring(0, fileNameWithExt.lastIndexOf('.') - 1);
    const fileNameTemplate1 = replace( fileName, this.entity, '{{entityName}}');
    return replace( fileNameTemplate1, _.upperFirst( this.entity ), '{{pascal entityName}}' );
  }

  async generateManifesto() {
    const ext = this.file.substring( this.file.lastIndexOf('.'));
    const fileNameTemplate = this.getFileNameTemplate();
    const entityFolder = this.file.substring( 0, this.file.lastIndexOf('/') );
    const manifesto = {
       ext: ext,
       fileNameTemplate : fileNameTemplate,
       technologies:[
          this.technology
       ],
       useCases:[
           {"name":this.useCase, "folder": entityFolder }
       ],
       entity:"entity.template",
       contextComposite:"composite.template",
       contexts:[ this.context ],
       generationStrategy :"singleAggregate",
       primitives:[{
          key:"entity",
          type:"entity",
          definition:"entity.template"
       }]
    }
    const manifestoText = JSON.stringify(manifesto, null, 4);
    const manifestoFolder = `${this.technology}/${this.useCase}`;
    const codeWriter = new CodeWriter();
    await codeWriter.write( 'manifesto', manifestoText, this.templatesPath, manifestoFolder, '.json' );

  }

  async generateTemplate() {
    const source = await fs.readFile(this.file, 'utf-8');
    const source1 = replace( source, this.entity, '{{entityName}}');
    const source2 = replace( source1, _.upperFirst( this.entity ), '{{pascal entityName}}');
    const codeWriter = new CodeWriter();
    const folder = `${this.technology}/${this.useCase}/${this.context}`;
    await codeWriter.write( 'entity', source2, this.templatesPath, folder, '.template' );
  }

  async generate() {
    await this.generateTemplate();
    await this.generateManifesto();
  }
};
