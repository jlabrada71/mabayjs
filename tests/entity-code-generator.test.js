
const fs   = require('fs');
const EntityDefinition = require('../lib/entity-definition');
const CodeGenerator = require('../lib/code-generator');
const EntityCodeGenerator = require('../lib/entity-code-generator');
const TemplateCompiler = require('../lib/template-compiler');

//jest.mock('../problem-repository');

describe('EntityCodeGenerator tests', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    //ProblemRepository.mockClear();

  });

  function FakeReader( key,type, source ) {
    this.key = key;
    this.source = source;
    this.type = type;
  }

  FakeReader.prototype.read = function() {
    return { key: this.key, type: this.type, source: this.source };
  }

  function mainHtml() {
    let main = '<html>{{html}}</html>';

    let mainTemplateCompiler = new TemplateCompiler();

    mainTemplateCompiler.compile( new FakeReader( 'main', 'main', main ) );

    return mainTemplateCompiler.getTemplates();
  }

  function mainHtmlCss() {
    let main = '<html>{{html}}</html><css>{{css}}</css>';

    let mainTemplateCompiler = new TemplateCompiler();

    mainTemplateCompiler.compile( new FakeReader( 'main', 'main', main ) );

    return mainTemplateCompiler.getTemplates();
  }

  function oneFieldEntityTemplateHtml() {
    let fieldSource =  '<li>{{fieldName}}</li>';
    let entitySource = '<body><h1>{{entityName}}</h1> <lu>{{fieldsCode}}</lu></body>';

    let templateCompiler = new TemplateCompiler();

    templateCompiler.compile( new FakeReader( 'string', 'field', fieldSource ) );
    templateCompiler.compile( new FakeReader( 'entity', 'entity', entitySource ) );

    return templateCompiler.getTemplates();
  }

  function oneFieldEntityTemplateCss() {
    let fieldSource =  '|{{fieldName}}|';
    let entitySource = '|{{entityName}}||{{fieldsCode}}|';

    let templateCompiler = new TemplateCompiler();

    templateCompiler.compile( new FakeReader( 'string', 'field', fieldSource ) );
    templateCompiler.compile( new FakeReader( 'entity', 'entity', entitySource ) );

    return templateCompiler.getTemplates();
  }


  function replace( string, what, by ) {
    return string.split( what ).join( by );
  }

  function unEscape( string ) {
    let temp = replace(replace( string, '&amp;lt;', '<' ), '&amp;gt;', '>');
    return replace( replace( temp, '&lt;', '<' ), '&gt;', '>');
  }

  it('should generate definition code', () => {

    let entityCodeGenerator = new EntityCodeGenerator();

    entityCodeGenerator.add( 'main', new CodeGenerator( mainHtmlCss() ));
    entityCodeGenerator.add( 'html', new CodeGenerator( oneFieldEntityTemplateHtml() ));
    entityCodeGenerator.add( 'css', new CodeGenerator( oneFieldEntityTemplateCss() ));

    //console.log('contexts');
    //console.log( entityCodeGenerator.contexts);
    //console.log('---------');

    let entity = new EntityDefinition({'Itinerary':{'name':{'type':'string'}}});


    let entityCode = entityCodeGenerator.generate( entity );
    entityCode = unEscape( entityCode );
    expect( entityCode ).toBe('<html><body><h1>Itinerary</h1> <lu><li>name</li></lu></body></html><css>|Itinerary|||name||</css>');
  });

  function twoFieldEntityTemplate() {
    let fieldSource =  '<li>{{fieldName}}</li>';
    let longFieldSource =  '<li>pp{{fieldName}}pp</li>';
    let entitySource = '<body><h1>{{entityName}}</h1> <lu>{{fieldsCode}}</lu></body>';

    let templateCompiler = new TemplateCompiler();

    templateCompiler.compile( new FakeReader( 'string', 'field', fieldSource ) );
    templateCompiler.compile( new FakeReader( 'long', 'field', longFieldSource ) );
    templateCompiler.compile( new FakeReader( 'entity', 'entity', entitySource ) );

    return templateCompiler.getTemplates();
  }

  it('should generate definition code for long and string', () => {
    let entityCodeGenerator = new EntityCodeGenerator();

    entityCodeGenerator.add( 'main', new CodeGenerator( mainHtml() ));
    entityCodeGenerator.add( 'html', new CodeGenerator( twoFieldEntityTemplate() ));

    let entity = new EntityDefinition({'Itinerary':{'name':{'type':'string'},'age':{'type':'long'}}});

    let entityCode = entityCodeGenerator.generate( entity );
    entityCode = unEscape( entityCode );

    expect( entityCode ).toBe('<html><body><h1>Itinerary</h1> <lu><li>name</li><li>ppagepp</li></lu></body></html>');
  });
});
