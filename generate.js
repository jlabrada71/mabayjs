const AppGenerator  = require('./lib/app-generator');
const fs = require('fs');

if( process.argv.length < 6 ) {
  console.log('Usage: generate modelFile templatesPath manifestoFile outputPath');
  return;
}

let file = process.argv[2];
let templatePath = process.argv[3];
let manifestoFile = process.argv[4];
let outputPath  = process.argv[5];

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
