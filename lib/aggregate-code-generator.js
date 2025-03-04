import { unEscape } from './utils.js';

export class AggregateCodeGenerator {

  constructor( model, codeGenerator, shouldGenerateProperties ) {
    this.model = model;
    this.codeGenerator = codeGenerator;
    this.shouldGenerateProperties = shouldGenerateProperties;
  }

  generateProperty( entity, property, propertyDefinition ) {
    // console.log('---- primitives --- ');
    // console.log(JSON.stringify(this.model.definitions['primitives']));
    const definition = this.model.definitions['primitives'][propertyDefinition];
    if( definition === undefined ) {
      console.log('property definition');
      console.log(propertyDefinition);
      console.log(definition);
    }
    const primitive = definition['type'];
    // console.log(`property : ${entity}:${property}:${propertyDefinition}:${primitive}` );
    const entityDotPropertyName = `${entity}.${property}`;
    const expandedEntityDotPropertyName = `{{${entity}.${property}}}`;
    const expandedPropertyName = `{{${property}}}`;
    let code = this.codeGenerator.generate( {'propertyName':property, 'entityName': entity,
                                            'entityDotPropertyName' : entityDotPropertyName,
                                            'expandedPropertyName': expandedPropertyName,
                                            'expandedEntityDotPropertyName': expandedEntityDotPropertyName },
                                            {type: 'property', key: propertyDefinition } );
    return code;

    // console.log('salio de aqui');
  }

  generatePropertiesCode( entityName, properties ) {
    let propertiesCode = '';
    if( ! this.shouldGenerateProperties ) return propertiesCode;

    Object.keys(properties).forEach( (propertyKey) => {
      let code = this.generateProperty( entityName, propertyKey, properties[propertyKey] );
      code = unEscape( code );
      propertiesCode = propertiesCode + code;
    });
    return propertiesCode;
  }

  generateCodeFor( aggregateName ) {
    // console.log( "aggregate: " + aggregateName );

    let entityName = this.model.definitions.aggregates[aggregateName];
    // console.log( "entity name: " + entityName );

    let properties = this.model.definitions.entities[entityName];
    // console.log( JSON.stringify(properties) );

    let propertiesCode = this.generatePropertiesCode( entityName, properties );
    // console.log('propertiesCode:"' + propertiesCode + '"');
    const expandedEntityName = `{{${entityName}}}`;
    let code = this.codeGenerator.generate({ entityName: entityName, propertiesCode:propertiesCode,
                                             expandedEntityName: expandedEntityName },
                                            { type: 'entity',key: 'entity' });
    code = unEscape( code );
    return code;
  }
}
