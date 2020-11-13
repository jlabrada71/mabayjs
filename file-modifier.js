const FileModifier  = require('./lib/helpers/file-modifier');
const Handlebars = require('handlebars');
const _ = require('lodash');
const fs = require('fs');

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

if( process.argv.length < 6 ) {
  console.log('Usage: file-modifier variableName storeFile templatesPath configFileName');
  console.log('ex: node file-modifier.js pruebita ./templates/modify/vuex/store/index.js ./templates/modify/vuex config.json');
  return;
}

let variableName = process.argv[2];
let storeFile = process.argv[3];
let templatePath = process.argv[4];
let configFile = process.argv[5];

if( storeFile !== undefined && templatePath !== undefined && configFile != undefined ) {
  fs.exists(storeFile, function(exists) {

    if (exists) {
      {
        const config = {
          fileName: storeFile,        // '/Users/jlabrada/Documents/source/yaml/templates/vuex/sample.js'
          templatePath: templatePath, // '/Users/jlabrada/Documents/source/yaml/templates/vuex',
          configFile: configFile      // 'config.json'
        };

        const fileModifier = new FileModifier(config);

        fileModifier.generate( variableName, storeFile )
          .then(() => { }).catch((error) => {
            console.log('error');
          });
      }
    } else {
        console.log(`File not found: ${file}`);
    }
});
}
