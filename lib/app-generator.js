const ModelReader  = require('./model-reader');
const Model = require('./model');
const ManifestoReader = require('./manifesto-reader');
const TemplateReader = require('./template-reader');
const AggregateTemplateCompiler = require('./aggregate-template-compiler');
const SingleAggregateProcess = require('./single-aggregate-process');
const MultiAggregateProcess = require('./multi-aggregate-process');

const CodeWriter = require('./code-writer');

module.exports = class AppGenerator {
  constructor( ) {
    this.aggregateTemplateCompiler = new AggregateTemplateCompiler( new TemplateReader() );
    this.codeWriter = new CodeWriter();
    this.manifestoReader = new ManifestoReader();
    this.modelReader = new ModelReader();
  }

  getProcessFor( generationStrategy, model, manifesto,
                  technologyPath, useCase, aggregateTemplateCompiler,
                  codeWriter, outputPath ) {

      if( generationStrategy === "singleAggregate" ) {
        return new SingleAggregateProcess(  model,
                                            manifesto,
                                            technologyPath,
                                            useCase,
                                            aggregateTemplateCompiler,
                                            codeWriter,
                                            outputPath );
      }
      if( generationStrategy === "combinedAggregate" ) {
        return new MultiAggregateProcess(  model,
                                            manifesto,
                                            technologyPath,
                                            useCase,
                                            aggregateTemplateCompiler,
                                            codeWriter,
                                            outputPath );
      }
  }

  async generate( file, templatesPath, manifestoFile, outputPath) {

    //console.log('file: ' + file);
    //console.log('templates: ' + templatesPath );
    //console.log('output: ' + outputPath );

    let model = this.modelReader.read(file);
    let modelObject = new Model( model );
    //console.log( JSON.stringify(model));
    modelObject.show();

    let manifesto = this.manifestoReader.read( manifestoFile );
    console.log( JSON.stringify(manifesto));

    let technology = manifesto.technologies[0];
    console.log( technology )
    let technologyPath = `${templatesPath}/${technology}`;

    for( let useCase of manifesto.useCases ) {

      const aggregateProcess = this.getProcessFor( manifesto.generationStrategy,
                                              model,
                                              manifesto,
                                              technologyPath,
                                              useCase,
                                              this.aggregateTemplateCompiler,
                                              this.codeWriter,
                                              outputPath
                                );

      await aggregateProcess.generateCode();
    }
  }
};
