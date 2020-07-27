const _ = require('lodash');
const fs = require('fs');
const TemplateGenerator = require('./lib/templates/template-generator');

if( process.argv.length < 9 ) {
  console.log('Usage: generate_template sampleFile entity templatesPath technology usecase context outputPath');
  return;
}

let file = process.argv[2];
let entity = process.argv[3];
let templatePath = process.argv[4];
let technology = process.argv[5];
let useCase = process.argv[6];
let context = process.argv[7];
let outputPath = process.argv[8];

if( file !== undefined && templatePath !== undefined && outputPath != undefined ) {
  const filePath = __dirname + "/" + file;

  fs.exists(filePath, function(exists) {
    if( ! exists ) {
      console.log(' file not found: ' + filePath );
      return;
    }
    const templateGenerator = new TemplateGenerator(
      file, entity, templatePath, technology, useCase, context, outputPath );
    templateGenerator.generate();
});
}
