
import fs   from 'fs';
import { EntityDefinition } from '../lib/entity-definition';
import { CodeGenerator } from '../lib/code-generator';
import { TaskCodeGenerator } from '../lib/task-code-generator';
import { TemplateCompiler } from '../lib/template-compiler';

//jest.mock('../problem-repository');

describe('TaskCodeGenerator tests', () => {
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

  function taskVue() {
    let taskSource = '<html>{{html}}</html><css>{{css}}</css><script>{{script}}</script>';

    let taskTemplateCompiler = new TemplateCompiler();

    taskTemplateCompiler.compile( new FakeReader( {type:'task', key:'task'}, taskSource ) );

    return taskTemplateCompiler.getTemplates();
  }

  function replace( string, what, by ) {
    return string.split( what ).join( by );
  }

  function unEscape( string ) {
    let temp = replace(replace( string, '&amp;lt;', '<' ), '&amp;gt;', '>');
    return replace( replace( temp, '&lt;', '<' ), '&gt;', '>');
  }

  it('should generate task code', () => {
    let taskCodeGenerator = new TaskCodeGenerator( [{name:'html', value: 'juan'},
                                                    {name:'css', value: 'pedro'},
                                                    {name:'script', value: 'de la mar'}],
              new CodeGenerator( taskVue() ));


    let taskCode = taskCodeGenerator.generateCode();
    taskCode = unEscape( taskCode );
    expect( taskCode ).toBe('<html>juan</html><css>pedro</css><script>de la mar</script>');
  });
});
