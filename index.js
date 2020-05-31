const yaml = require('js-yaml');
const fs   = require('fs');
const Definition = require('./lib/definition')

const {
  reduce,
  showMap,
  TemplateReader,
  CodeGenerator,
  TemplateCompiler,
  EntityCodeGenerator,
  replace } = require('./utils');

let definitions = new Map();
let compiledDefinitions = new Map();
let pendingDefinitions = new Map();
let templateReader = new TemplateReader();

function isArray( type ) {
  return  type.indexOf( 'array of') == 0;
}

function getArrayType( type ) {
  return type.substring( 8 );
}

function areAllFieldTypesCompiled( definition ) {
  let defDetails = definition.details();
  for (var property in  Object.keys(defDetails) ) {
    if (Object.prototype.hasOwnProperty.call(defDetails, property)) {
      let type = defDetails[property]['type'];
      if( isArray( type )) {
        type = getArrayType( type );
      }
      if( compiledDefinitions.get( type ) == null ) return false;
    }
  }
  return true;
}

function canCompile( definition ) {
  let isCompiled = compiledDefinitions.get( definition.name() ) != null;
  if( isCompiled ) return false;
  return areAllFieldTypesCompiled( definition );
}

function compileDefinition( definition ) {
  compiledDefinitions.set( definition.name(), definition.name() ) );
}

function readTemplate( key, type, path ) {
  return templateReader.read(key, type, path);
}

function readTemplates( source ) {
  var templates = [];
  templates.push( readTemplate('string','field', source + '/string.vue.template' ));
  templates.push( readTemplate('long','field', source + '/long.vue.template' ));
  templates.push( readTemplate('showEntity','entity', source + '/showEntity.vue.template' ));
  return Promise.all(templates);
}

function getModel( model ) {
  return yaml.safeLoad( fs.readFileSync( model, 'utf8' ));
}

function processDefinition( definition, atLeastOneCompiled )  {
  definition.show( "Processing" );
  let oneCompiled = false;

  if( canCompile( definition ) ) {
    compileDefinition( definition );
    pendingDefinitions.delete( definition.name() );
    oneCompiled = true;
  }
  return oneCompiled;
}

function compileTemplates( templatesToCompile ) {
  return new Promise( ( resolve, reject ) => {
    let templateCompiler = new TemplateCompiler();

    try {
      for( var template in templatesToCompile ) {
        var t = templatesToCompile[template];
        templateCompiler.compile( t );
      }
      resolve( templateCompiler.getTemplates() );
    }
    catch( e ) {
      reject( e );
    }
  });
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

function store( map, definition ) {
  let defName = definition.name();
  map.set( defName, definition );
  return map;
}

function isReadyToGenerate( model, templates ) {
  let pendingDefinitions = reduce( model.definitions, store );

  showMap( pendingDefinitions, "PendingDefinitions" );

  do {
    atLeastOneCompiled = false;
    var compilingDefinitions = pendingDefinitions.entries();
    let definitionIndex = compilingDefinitions.next();

    while( ! definitionIndex.done ) {
      let definitionEntry = definitionIndex.value;
      atLeastOneCompiled = atLeastOneCompiled | processDefinition( definitionEntry[1] );
      definitionIndex = compilingDefinitions.next();
    }
  }
  while( atLeastOneCompiled );

  if( pendingDefinitions.length > 0 ) {
    console.log( "The following definitions couldn't be compiled" );
    for( let definition of pendingDefinitions ) {
      definition.show( 'pending definition' );
    }
    return false;
  }
  return true;
}

function generate( model, templates, outputDirectory ) {

  let entityCodeGenerator = new EntityCodeGenerator( new CodeGenerator( templates ));
  model.definitions.forEach( function( definition, index, map ) {
    var code = entityCodeGenerator.generate( definition );
    code = replace( code, '&lt;', '<' )
    code = replace( code, '&gt;', '>' )

    fs.writeFile( outputDirectory + '/' + definition.name()+'.vue', code, function(err) {
      if(err) {
          return console.log(err);
      }
    });
  })
}

function generateAll( data ) {
  generate( data[1], data[0], data[2]);
}

function generateFor( modelSource, templatesDirectory, outputDirectory ) {
  var readTemplatesPromise = readTemplates(templatesDirectory);
  var compiledTemplatesPromise = readTemplatesPromise.then( compileTemplates );
  var modelLoadedPromise = loadModel( modelSource );
  var outputDirectoryPromise = new Promise( function(resolve, reject ) {
    return resolve( outputDirectory )
  })
  var ready = Promise.all([compiledTemplatesPromise,modelLoadedPromise, outputDirectoryPromise ]);
  ready.then( generateAll );
}

try {
  //generateFor('./example1.yml', 'templates', 'generated');
  generateFor('./example1.yml', 'templates/restfull', 'generated/restfull');
  generateFor('./example1.yml', 'templates/mongodb', 'generated/mongodb');
  generateFor('./example1.yml', 'templates/vuejs', 'generated/vuejs');

} catch (e) {
  console.log(e);
}
