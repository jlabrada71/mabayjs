
//const GetPath = require('./get-path');
const {
  reduce,
  showMap,
  replace,
  unEscape } = require('./utils');

module.exports = class CompositeCodeGenerator {

  constructor( codeGenerator ) {
    this.codeGenerator = codeGenerator;
    this.contexts = [];
  }

  add( name, generator ) {
    let pair = { name, generator };
    this.contexts.push( pair );
  }

  generateCodeFor( aggregateName ) {
    let data = {};

    for( let context of this.contexts ) {
      let contextCode = context.generator.generateCodeFor( aggregateName );
      data[context.name] = contextCode;
    }

    let code = this.codeGenerator.generate( data, {type: 'composite', key: 'aggregate' } );
    code = unEscape( code );
    return code;
  }
}
