
const fs   = require('fs');
const CodeGenerator = require('../lib/code-generator');
const AggregateCodeGenerator = require('../lib/aggregate-code-generator');
const TemplateCompiler = require('../lib/template-compiler');

//jest.mock('../problem-repository');

describe('AggregateCodeGenerator tests', () => {
  beforeEach(() => {
  });

  function FakeReader( key, source ) {
    this.key = key.key;
    this.source = source;
    this.type = key.type;
  }

  FakeReader.prototype.read = function() {
    return { key: this.key, type: this.type, source: this.source };
  }

  function oneFieldEntityTemplateHtml() {
    let propertySource =  '<td>{{propertyName}}</td><td>{{expandedEntityDotPropertyName}}</td>';
    let entitySource = '<body><h1>{{entityName}}</h1>{{propertiesCode}}</body>';

    let templateCompiler = new TemplateCompiler();

    templateCompiler.compile( new FakeReader( {type:'property', key:'name'}, propertySource ) );
    templateCompiler.compile( new FakeReader( {type:'property', key:'age'}, propertySource ) );
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

  it('should generate simple entity aggregate', () => {

    let model = {};
    model.definitions = {};

    model.definitions.primitives = {};
    model.definitions.primitives.name = {
      type: 'string'
    }
    model.definitions.entities = {};
    model.definitions.entities.person = {
      name: 'name',
      nick: 'name'
    }
    model.definitions.aggregates = {};
    model.definitions.aggregates.person = 'person';

    let htmlCodeGenerator = new CodeGenerator( oneFieldEntityTemplateHtml() );
    let aggregateCodeGenerator = new AggregateCodeGenerator( model,
                                      htmlCodeGenerator );

    let aggregateCode = aggregateCodeGenerator.generateCodeFor( 'person' );
    aggregateCode = unEscape( aggregateCode );
    expect( aggregateCode ).toBe('<body><h1>person</h1>'+
                                 '<td>name</td><td>{{person.name}}</td>'+
                                 '<td>nick</td><td>{{person.nick}}</td>'+
                                 '</body>');
  });

  it('should generate definition code', () => {

    let model = {};
    model.definitions = {};

    model.definitions.primitives = {};
    model.definitions.primitives.name = {
      type: 'string'
    }

    model.definitions.primitives.age = {
      type: 'string'
    }

    model.definitions.value_objects = {};
    model.definitions.value_objects.email = {
        user: 'name',
        domain: 'name'
    }
    model.definitions.entities = {};
    model.definitions.entities.person = {
      name: 'name',
      age: 'age' // ,
    //  workemail: 'email',
    //  personalemail: 'email',
    }
    model.definitions.aggregates = {};
    model.definitions.aggregates.person = 'person';

    let htmlCodeGenerator = new CodeGenerator( oneFieldEntityTemplateHtml() );
    let aggregateCodeGenerator = new AggregateCodeGenerator( model,
                                      htmlCodeGenerator );

    let aggregateCode = aggregateCodeGenerator.generateCodeFor( 'person' );
    aggregateCode = unEscape( aggregateCode );
    expect( aggregateCode ).toBe('<body><h1>person</h1>'+
                                 '<td>name</td>'+
                                 '<td>{{person.name}}</td>'+
                                 '<td>age</td><td>{{person.age}}</td>'+
                                 '</body>');
  });
});
