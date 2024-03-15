const yaml = require('js-yaml');
const fs   = require('fs');
const Definition = require('./lib/model-reader')


function getModel( model ) {
  return yaml.safeLoad( fs.readFileSync( model, 'utf8' ));
}


function loadModel( path ) {
  return new Promise( ( resolve, reject ) => {
    try {
      let model = getModel( path );
      resolve( model );
    }
    catch( e ) {
      reject( e );
    }
  })
}

let model = getModel('ideal_model.yml');

console.log('-----PRIMITIVES-------');
console.log( JSON.stringify( model.definitions.primitives, null, 2));
console.log('-----VALUE OBJECTS-------');
console.log( JSON.stringify( model.definitions['value-objects'], null, 2));


// console.log('000000000 value objects definitions 000000000');
// console.log(model.definitions['value-objects']['email']['user'])
let primitives = new Map();
for( let primitive in model.definitions.primitives ) {
  primitives.set( primitive, model.definitions.primitives[primitive]);
}
let valueObjects = new Map();
for( let valueObject in model.definitions['value-objects'] ) {
  console.log( valueObject  );
  valueObjects.set( valueObject, model.definitions['value-objects'][valueObject]);
  let propertyNames = Object.getOwnPropertyNames(model.definitions['value-objects'][valueObject]);
  for( let property of propertyNames ) {
    console.log( "  " + property + ":" + model.definitions['value-objects'][valueObject][property] );
  }
}

let entities = new Map();
for( let entity in model.definitions['entities']) {
  entities.set( entity, model.definitions['entities'][entity]);
}

let aggregates = new Map();
for( let aggregate in model.definitions['aggregates']) {
  aggregates.set( aggregate, model.definitions['aggregates'][aggregate]);
}
console.log('-----VALUE OBJECTS------------');
//console.log( JSON.stringify( model.definitions['entities'], null, 2));
console.log( valueObjects );
console.log('-----ENTITIES------------');
//console.log( JSON.stringify( model.definitions['entities'], null, 2));
console.log( entities );
console.log('-----AGGREGATES------------');
//console.log( JSON.stringify( model.definitions['aggregates'], null, 2));
console.log( aggregates )
