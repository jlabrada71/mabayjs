
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

  function FakeReader( key, source ) {
    this.key = key.key;
    this.source = source;
    this.type = key.type;
  }

  FakeReader.prototype.read = function() {
    return { key: this.key, type: this.type, source: this.source };
  }

  function mainHtml() {
    let main = '<html>{{html}}</html>';

    let mainTemplateCompiler = new TemplateCompiler();

    mainTemplateCompiler.compile( new FakeReader( {type:'main', key:'main'}, main ) );

    return mainTemplateCompiler.getTemplates();
  }

  function mainHtmlCss() {
    let main = '<html>{{html}}</html><css>{{css}}</css>';

    let mainTemplateCompiler = new TemplateCompiler();

    mainTemplateCompiler.compile( new FakeReader( {type:'main', key:'main'}, main ) );

    return mainTemplateCompiler.getTemplates();
  }

  function oneFieldEntityTemplateHtml() {
    let fieldSource =  '<li>{{fieldName}}</li>';
    let entitySource = '<body><h1>{{entityName}}</h1><lu>{{fieldsCode}}</lu></body>';

    let templateCompiler = new TemplateCompiler();

    templateCompiler.compile( new FakeReader( {type:'field', key:'name'}, fieldSource ) );
    templateCompiler.compile( new FakeReader( {type:'entity', key:'entity'}, entitySource ) );

    return templateCompiler.getTemplates();
  }


  function oneFieldEntityTemplateCss() {
    let fieldSource =  '|{{fieldName}}|';
    let entitySource = '|{{entityName}}||{{fieldsCode}}|';

    let templateCompiler = new TemplateCompiler();

    templateCompiler.compile( new FakeReader( {type:'field', key:'name'}, fieldSource ) );
    templateCompiler.compile( new FakeReader( {type:'entity', key:'entity'}, entitySource ) );

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

    let entityCodeGenerator = new EntityCodeGenerator( 'html',
                                      new CodeGenerator( oneFieldEntityTemplateHtml() ));

    let entity = new EntityDefinition({'Itinerary':{'name':{'type':'name'}}});

    let entityCode = entityCodeGenerator.generateCodeFor( entity );
    entityCode = unEscape( entityCode );
    expect( entityCode ).toBe('<body><h1>Itinerary</h1><lu><li>name</li></lu></body>');
  });

  function oneFieldEntityTemplateHtmlComplex() {
    let fieldSource =  '<v-text-field label="{{fieldName}}" v-model="{{entityDotFieldName}}">{{fieldName}}</v-text-field><a>{{expandedFieldName}}</a><span>{{expandedEntityDotFieldName}}</span>';
    let entitySource = '<v-form><h1>{{entityName}}</h1><a>{{expandedEntityName}}</a>{{fieldsCode}}</v-form>';

    let templateCompiler = new TemplateCompiler();

    templateCompiler.compile( new FakeReader( {type:'field', key:'name'}, fieldSource ) );
    templateCompiler.compile( new FakeReader( {type:'entity', key:'entity'}, entitySource ) );

    return templateCompiler.getTemplates();
  }

  it('should generate complex definition code', () => {

    let entityCodeGenerator = new EntityCodeGenerator( 'html',
                                      new CodeGenerator( oneFieldEntityTemplateHtmlComplex() ));

    let entity = new EntityDefinition({'itinerary':{'name':{'type':'name'}}});

    let entityCode = entityCodeGenerator.generateCodeFor( entity );
    entityCode = unEscape( entityCode );
    expect( entityCode ).toBe('<v-form><h1>itinerary</h1><a>{{itinerary}}</a><v-text-field label="name" v-model="itinerary.name">name</v-text-field><a>{{name}}</a><span>{{itinerary.name}}</span></v-form>');
  });


  it('should generate definition code', () => {

    let entityCodeGenerator = new EntityCodeGenerator( 'css', new CodeGenerator( oneFieldEntityTemplateCss() ));
    let entity = new EntityDefinition({'Itinerary':{'name':{'type':'name'}}});


    let entityCode = entityCodeGenerator.generateCodeFor( entity );
    entityCode = unEscape( entityCode );
    expect( entityCode ).toBe('|Itinerary|||name||');
  });


  function twoFieldEntityTemplate() {
    let nameFieldSource =  '<li>{{fieldName}}';
    let domainFieldSource =  '@{{fieldName}}</li>';
    let entitySource = '<body><h1>{{entityName}}</h1> <lu>{{fieldsCode}}</lu></body>';

    let templateCompiler = new TemplateCompiler();

    templateCompiler.compile( new FakeReader( {type:'field', key:'name'}, nameFieldSource ) );
    templateCompiler.compile( new FakeReader( {type:'field', key:'domain'}, domainFieldSource ) );
    templateCompiler.compile( new FakeReader( {type:'entity', key:'entity'}, entitySource ) );

    return templateCompiler.getTemplates();
  }

  it('should generate definition code for long and string', () => {
    let entityCodeGenerator = new EntityCodeGenerator('html', new CodeGenerator( twoFieldEntityTemplate() ));

    let entity = new EntityDefinition({'email':{'name':{'type':'name'},'domain':{'type':'domain'}}});

    let entityCode = entityCodeGenerator.generateCodeFor( entity );
    entityCode = unEscape( entityCode );

    expect( entityCode ).toBe('<body><h1>email</h1> <lu><li>name@domain</li></lu></body>');
  });
});
