
//const GetPath = require('./get-path');
const {
  reduce,
  showMap,
  replace,
  unEscape } = require('./utils');

module.exports = class ValueObjectCodeGenerator {
  constructor( context, codeGenerator ) {
    this.context = context;
    this.codeGenerator = codeGenerator;
  }


  generateField( property, propertyDefinition ) {
    //console.log('llego aqui');
    //console.log( property );
    //console.log( propertyDefinition );
    //console.log('property: ' + property +', type: ' + type);
    //console.log( '..........')
    let code = this.codeGenerator.generate( {'primitive':property}, propertyDefinition );
    return code;

    //console.log('salio de aqui');
  }

  generateFieldsCode( propertiesDefinition ) {
    //console.log( propertiesDefinition );
    let propertiesCode = '';
    //console.log( 'propertiesDefinition');
    //console.log( propertiesDefinition );

    Object.keys(propertiesDefinition).forEach( (propertyDefinitionKey) => {
      //console.log('property');
      //console.log(propertyDefinitionKey);
      //console.log(propertiesDefinition[propertyDefinitionKey]);
      let code = this.generateField( propertyDefinitionKey, { type: 'primitive',
           key: propertiesDefinition[propertyDefinitionKey].type });
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

  generateCodeFor( model ) {
    // console.log( 'model----');
    // console.log( model );
    let defDetails = model.details();
    // console.log( 'details');
    // console.log( defDetails );
    let fieldsCode = this.generateFieldsCode( defDetails );
    let code = this.codeGenerator.generate({valueObjectName: model.name(), fieldsCode:fieldsCode },
                                                     { key: 'valueObject', type: 'valueObject' });
    code = unEscape( code );
    return code;
  }
}
