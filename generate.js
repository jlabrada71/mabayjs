const AppGenerator  = require('./lib/app-generator');
const fs = require('fs');

if( process.argv.length < 5 ) {
  console.log('Usage: generate file templatesPath outputPath');
  return;
}

let file = process.argv[2];
let templatePath = process.argv[3];
let outputPath  = process.argv[4];

if( file !== undefined && templatePath !== undefined && outputPath != undefined ) {
  fs.exists(file, function(exists) {
    if (exists) {
      let appGenerator = new AppGenerator();
      appGenerator.generate( file, templatePath, outputPath );
    } else {
        console.log(`File not found: ${file}`);
    }
});
}
