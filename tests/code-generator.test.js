
const fs   = require('fs');
const EntityDefinition = require('../lib/entity-definition');
const CodeGenerator = require('../lib/code-generator');
const TemplateCompiler = require('../lib/template-compiler');

//jest.mock('../problem-repository');

describe('CodeGenerator tests', () => {
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

  it('should generate code', () => {
    let source =  '<h1>{{title}}</h1>{{body}}';
    let templateCompiler = new TemplateCompiler();
    templateCompiler.compile( new FakeReader( 'string', 'field', source ) );
    let codeGenerator = new CodeGenerator( templateCompiler.getTemplates());

    var data = {title: "My New Post", body: "This is my first post!"};
    var result    = codeGenerator.generate( data, 'field', 'string');
    expect( result ).toBe('<h1>My New Post</h1>This is my first post!');
  });
});
