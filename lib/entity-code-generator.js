
//const GetPath = require('./get-path');
const {
  reduce,
  showMap,
  replace,
  unEscape } = require('./utils');

module.exports = class EntityCodeGenerator {
  constructor() {
    this.contexts = [];
    this.codeGenerators = [];
  }

  add( context, codeGenerator ) {
    this.contexts.push( context );
    this.codeGenerators[context] = codeGenerator;
  }

  generateField( context, property, propertyDefinition ) {
    //console.log('llego aqui');
    //console.log( property );
    //console.log( propertyDefinition );
    let type = propertyDefinition['type'];
    //console.log('property: ' + property +', type: ' + type);
    //console.log( '..........')
    let code = this.codeGenerators[context].generate( {'fieldName':property}, 'field', type );
    return code;

    //console.log('salio de aqui');
  }

  generateFieldsCode( context, propertiesDefinition ) {
    //console.log( propertiesDefinition );
    let propertiesCode = '';
    //console.log( 'propertiesDefinition');
    //console.log( propertiesDefinition );

    Object.keys(propertiesDefinition).forEach( (propertyDefinitionKey) => {
      //console.log('property');
      //console.log(propertyDefinitionKey);
      //console.log(propertiesDefinition[propertyDefinitionKey]);
      let code = this.generateField( context, propertyDefinitionKey, propertiesDefinition[propertyDefinitionKey] );
      code = unEscape( code );
      propertiesCode = propertiesCode + code;

    //  let propertyDefinition = propertiesDefinition[propertyDefinitionKey];
    //  Object.keys(propertyDefinition).forEach( (propertyDefinitionKey) => {
    //    for( let property in propertyDefinition ) {
    //      this.generateField( property, propertyDefinition );
    //    }
    //  });
    });
    return propertiesCode;
  }

  generateCodeForContext( context, model ) {
    // console.log( 'model----');
    // console.log( model );
    let defDetails = model.details();
    // console.log( 'details');
    // console.log( defDetails );
    let fieldsCode = this.generateFieldsCode( context, defDetails );
    let code = this.codeGenerators[context].generate({entityName: model.name(), fieldsCode:fieldsCode }, 'entity', 'entity' );
    code = unEscape( code );
    return code;

  }

  generateCodeForMain( codes ) {
    return this.codeGenerators['main'].generate( codes, 'main', 'main');
  }

  generate( model ) {
    let codes = {};
    this.contexts.forEach((context) => {
      if( context !== 'main') {
        let value = this.generateCodeForContext( context, model );
        Object.defineProperty(codes, context, {
          value: value,
          writable: false,
        });
      }
    });
    return this.generateCodeForMain( codes );
  }
}
