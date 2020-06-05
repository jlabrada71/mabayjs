
const fs   = require('fs');
const ValueObjectDefinition = require('../lib/value-object-definition');
const CodeGenerator = require('../lib/code-generator');
const ValueObjectCodeGenerator = require('../lib/value-object-code-generator');
const TemplateCompiler = require('../lib/template-compiler');

//jest.mock('../problem-repository');

describe('ValueObjectCodeGenerator tests', () => {
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

  function onePrimitiveValueObjectTemplateHtml() {
    let stringPrimitiveSource =  '<li>{{primitive}}</li>';
    let valueObjectSource = '<body><h1>{{valueObjectName}}</h1> <lu>{{fieldsCode}}</lu></body>';

    let templateCompiler = new TemplateCompiler();

    templateCompiler.compile( new FakeReader( 'string', 'primitive', stringPrimitiveSource ) );
    templateCompiler.compile( new FakeReader( 'valueObject', 'valueObject', valueObjectSource ) );

    return templateCompiler.getTemplates();
  }

  function onePrimitiveValueObjectTemplateCss() {
    let primitiveSource =  '|{{primitive}}|';
    let valueObjectSource = '|{{valueObjectName}}||{{primitivesCode}}|';

    let templateCompiler = new TemplateCompiler();

    templateCompiler.compile( new FakeReader( 'string', 'primitive', primitiveSource ) );
    templateCompiler.compile( new FakeReader( 'valueObject', 'valueObject', valueObjectSource ) );

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

    let valueObjectCodeGenerator = new ValueObjectCodeGenerator('html',
              new CodeGenerator( onePrimitiveValueObjectTemplateHtml() ));
    //valueObjectCodeGenerator.add( 'css', new CodeGenerator( onePrimitiveValueObjectTemplateCss() ));

    //console.log('contexts');
    //console.log( valueObjectCodeGenerator.contexts);
    //console.log('---------');

    let valueObject = new ValueObjectDefinition({'Itinerary':{'name':{'type':'string'}}});


    let valueObjectCode = valueObjectCodeGenerator.generateCodeFor( valueObject );
    valueObjectCode = unEscape( valueObjectCode );
    expect( valueObjectCode ).toBe('<body><h1>Itinerary</h1> <lu><li>name</li></lu></body>');
  });

  function twoFieldValueObjectTemplate() {
    let fieldSource =  '<li>{{primitive}}</li>';
    let longFieldSource =  '<li>pp{{primitive}}pp</li>';
    let valueObjectSource = '<body><h1>{{valueObjectName}}</h1> <lu>{{fieldsCode}}</lu></body>';

    let templateCompiler = new TemplateCompiler();

    templateCompiler.compile( new FakeReader( 'string', 'primitive', fieldSource ) );
    templateCompiler.compile( new FakeReader( 'long', 'primitive', longFieldSource ) );
    templateCompiler.compile( new FakeReader( 'valueObject', 'valueObject', valueObjectSource ) );

    return templateCompiler.getTemplates();
  }

  it('should generate definition code for long and string', () => {
    let valueObjectCodeGenerator = new ValueObjectCodeGenerator('html',
              new CodeGenerator( twoFieldValueObjectTemplate() ));

    let valueObject = new ValueObjectDefinition({'Itinerary':{'name':{'type':'string'},'age':{'type':'long'}}});

    let valueObjectCode = valueObjectCodeGenerator.generateCodeFor( valueObject );
    valueObjectCode = unEscape( valueObjectCode );

    expect( valueObjectCode ).toBe('<body><h1>Itinerary</h1> <lu><li>name</li><li>ppagepp</li></lu></body>');
  });
});
