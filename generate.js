import AppGenerator  from './lib/app-generator.js'
import Handlebars from 'handlebars'
import _  from 'lodash'
import fs from 'fs'

if( process.argv.length < 6 ) {
  console.log('Usage: generate modelFile templatesPath manifestoFile outputPath');
  process.exit(1);
}

let file = process.argv[2];
let templatePath = process.argv[3];
let manifestoFile = process.argv[4];
let outputPath  = process.argv[5];

Handlebars.registerHelper('camel', function (aString) {
    return _.camelCase( aString );
})

Handlebars.registerHelper('pascal', function (aString) {
    return _.upperFirst( aString );
})

Handlebars.registerHelper('kebab', function (aString) {
  return _.kebabCase( aString );
})

Handlebars.registerHelper('text', function (aString) {
  return '{{' + aString + '}}';
})

if( file !== undefined && templatePath !== undefined && outputPath != undefined ) {
  fs.exists(file, function(exists) {

    if (exists) {


      let appGenerator = new AppGenerator();

      appGenerator.generate( file, templatePath, manifestoFile, outputPath );

    } else {
        console.log(`File not found: ${file}`);
    }
});
}
