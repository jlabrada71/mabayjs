
export default class CodeGenerator {
  constructor( templates ) {
    this.templates = templates;
  }

  generate( model, templateKey ) {
    console.log( 'templateKey: ' + JSON.stringify( templateKey ));
  //  console.log( 'model: ' + JSON.stringify( model ));
    console.log( this.templates );
    let template = this.templates[ templateKey.type ].get( templateKey.key );
    if( template === undefined ) {
      console.log('Undefined template for '+JSON.stringify(templateKey));

    }

    var result = template( model );

  //  console.log('result: ' + result);

    return result;
  }
};
