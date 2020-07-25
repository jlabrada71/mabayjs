
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

  generateCodeForList( aggregateList ) {
    let data = {};

    for( let context of this.contexts ) {
      let compoundCode = '';

      for( let aggregateName in aggregateList ) {
        let aggregateCode = unEscape( context.generator.generateCodeFor( aggregateName ));
        compoundCode += aggregateCode;
      }
      data[context.name] = compoundCode;
    }

    let code = unEscape( this.codeGenerator.generate( data, {type: 'composite', key: 'aggregate' } ));

    return code;
  }
}
