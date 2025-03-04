
import fs   from 'fs';
import { CodeGenerator } from '../lib/code-generator';
import { DumbCodeGenerator } from '../lib/dumb-code-generator';
import { CompositeCodeGenerator } from '../lib/composite-code-generator';
import { TemplateCompiler } from '../lib/template-compiler';

//jest.mock('../problem-repository');

describe('CompositeCodeGenerator tests', () => {
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

  function compositeTemplate() {
    let compositeSource =  '<td>{{html}}</td><td>{{javascript}}</td>';
    let templateCompiler = new TemplateCompiler();

    templateCompiler.compile( new FakeReader( {type:'composite', key:'aggregate'}, compositeSource ) );

    return templateCompiler.getTemplates();
  }

  function replace( string, what, by ) {
    return string.split( what ).join( by );
  }

  function unEscape( string ) {
    let temp = replace(replace( string, '&amp;lt;', '<' ), '&amp;gt;', '>');
    return replace( replace( temp, '&lt;', '<' ), '&gt;', '>');
  }

  it('should generate a composite of two generators', () => {

    let codeGenerator = new CodeGenerator( compositeTemplate() );
    let compositeCodeGenerator = new CompositeCodeGenerator( codeGenerator );

    let dumbCodeGenerator1 = new DumbCodeGenerator("jajaja");
    let dumbCodeGenerator2 = new DumbCodeGenerator("jojojo");
    compositeCodeGenerator.add('html', dumbCodeGenerator1 );
    compositeCodeGenerator.add('javascript', dumbCodeGenerator2 );

    let code = compositeCodeGenerator.generateCodeFor( 'person' );
    code = unEscape( code );
    expect( code ).toBe('<td>jajaja</td><td>jojojo</td>');
  });
});
