
//const GetPath from './get-path';
import {
  reduce,
  showMap,
  replace,
  unEscape } from './utils';

export class EntityCodeGenerator {

  constructor( context, codeGenerator ) {
    this.context = context;
    this.codeGenerator = codeGenerator;
  }

  generateField( entity, field, fieldDefinition ) {
    // console.log('llego aqui');
    // console.log( field );
    // console.log( fieldDefinition );
    //console.log('field: ' + field +', type: ' + type);
    //console.log( '..........')
    const entityDotFieldName = `${entity}.${field}`;
    const expandedEntityDotFieldName = `{{${entity}.${field}}}`;
    const expandedFieldName = `{{${field}}}`;
    let code = this.codeGenerator.generate( {'fieldName':field, 'entityName': entity,
                                            'entityDotFieldName' : entityDotFieldName,
                                            'expandedFieldName': expandedFieldName,
                                            'expandedEntityDotFieldName': expandedEntityDotFieldName },
                                            {type: 'field', key: fieldDefinition['type']} );
    return code;

    // console.log('salio de aqui');
  }

  generateFieldsCode( model ) {
    //console.log( fieldsDefinition );
    let fieldsCode = '';
    //console.log( 'fieldsDefinition');
    //console.log( fieldsDefinition );
    let entity = model.name();
    let fieldsDefinition = model.details()
    Object.keys(fieldsDefinition).forEach( (fieldDefinitionKey) => {
      //console.log('field');
      //console.log(fieldDefinitionKey);
      //console.log(fieldsDefinition[fieldDefinitionKey]);
      let code = this.generateField( entity, fieldDefinitionKey, fieldsDefinition[fieldDefinitionKey] );
      code = unEscape( code );
      fieldsCode = fieldsCode + code;

    //  let fieldDefinition = fieldsDefinition[fieldDefinitionKey];
    //  Object.keys(fieldDefinition).forEach( (fieldDefinitionKey) => {
    //    for( let field in fieldDefinition ) {
    //      this.generateField( field, fieldDefinition );
    //    }
    //  });
    });
    return fieldsCode;
  }

  generateCodeFor( model ) {
    // console.log( 'model----');
    // console.log( model );
    //let defDetails = model.details();
    // console.log( 'details');
    // console.log( defDetails );
    let fieldsCode = this.generateFieldsCode( model);
    const expandedEntityName = `{{${model.name()}}}`;
    let code = this.codeGenerator.generate({ entityName: model.name(), fieldsCode:fieldsCode,
                                             expandedEntityName: expandedEntityName },
                                           { type: 'entity',key: 'entity' });
    code = unEscape( code );
    return code;
  }
}
