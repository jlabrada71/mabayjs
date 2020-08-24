const { replace } = require('../lib/utils');

const FileModifier = require('../lib/helpers/file-modifier');

describe('Add a variable to the vuex store', () => {
  beforeEach(() => {
  });

  function generate( variableName, templateMark, template, fileMark, file ) {
    const instance = replace(template, templateMark, variableName);
    return replace(file, fileMark, instance);
  }

  it('simple add state', () => {

    const template = 'state: { \n    ${variableName}: null,\n';
    const templateMark = '${variableName}';
    const file = 'state: { \n  },\n';
    const fileMark = 'state: { \n'

    const result = generate('prueba', templateMark, template, fileMark, file);
    expect(result).toMatch( 'state: { \n    prueba: null,\n  },');

    const result1 = generate('shoppingCart', templateMark, template, fileMark, result);
    expect(result1).toMatch( 'state: { \n    shoppingCart: null,\n    prueba: null,\n  },');

  });

  it('complex add state', () => {
    const config = {
      fileName: '/Users/jlabrada/Documents/source/yaml/templates/vuex/sample.js',
      templatePath: '/Users/jlabrada/Documents/source/yaml/templates/vuex',
      configFile: 'config.json'
    };
    
    const fileModifier = new FileModifier(config);

    fileModifier.generate( 'prueba', '/Users/jlabrada/Documents/source/yaml/templates/vuex/sampleoutput.js' )
      .then(() => { }).catch((error) => {
        console.log('error');
      });
  });
});
