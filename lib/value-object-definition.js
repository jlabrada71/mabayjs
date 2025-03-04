
//const GetPath = require('./get-path');

export class ValueObjectDefinition {
  constructor(definition) {
    this.definition = definition;
  }

  name() {
    let keys = Object.keys(this.definition);
    return keys[0];
  }

  details() {
    let propertyNames = Object.getOwnPropertyNames(this.definition);
    let definitionDetails = this.definition[propertyNames[0]];
    return definitionDetails;
  }

  deepDetails() {
    let defDetails = this.details();
    let propertyNames = Object.getOwnPropertyNames(defDetails);
    return defDetails[propertyNames[0]];
  }

  show( type ) {
    //console.log( "Show definition---" + type );
    //console.log( JSON.stringify( this.definition ) );
    //console.log( "--------" )
    //console.log( this.definition[ 0 ]);
    //console.log( "done Show definition---" )
  }
};
