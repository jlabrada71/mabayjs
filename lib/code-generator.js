
//const GetPath = require('./get-path');

module.exports = class CodeGenerator {
  constructor( templates ) {
    this.templates = templates;
  }

  generate( model, type, key ) {
    //console.log( this.templates )
    //console.log( 'type: '+type)
    //console.log( 'key: ' + key )
    //console.log( model )
    let template = this.templates[ type ].get( key );
    var result = template( model );

    return result;
  }
};
