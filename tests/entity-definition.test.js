
const fs   = require('fs');
const EntityDefinition = require('../lib/entity-definition');
const CodeGenerator = require('../lib/code-generator');
const EntityCodeGenerator = require('../lib/entity-code-generator');
const TemplateCompiler = require('../lib/template-compiler');

//jest.mock('../problem-repository');

describe('EntityDefinition tests', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    //ProblemRepository.mockClear();

  });


  it('should also return the models name', () => {
    let model =[new EntityDefinition({'itinerary':{'name':'string'}})];

    let entity = model[0];

    let keys = Object.keys(entity.definition);
    expect( keys ).toStrictEqual(['itinerary']);
    expect( entity.definition[keys[0]]).toStrictEqual( {'name':'string'});

    expect( entity.name() ).toBe('itinerary');

  });

  it('should return the models details', () => {
    let model =[new EntityDefinition({'itinerary':{'itinerary':{'name':'string'}}})];

    let entity = model[0];

    let details = entity.details();;
    expect( details ).toStrictEqual({'itinerary':{'name':'string'}});

  });

  it('should return the models deep details', () => {
    let model =[ new EntityDefinition({'itinerary':{'itinerary':{'name':'string'}}})]

    let entity = model[0];

    let deepDetails = entity.deepDetails();
    expect( deepDetails ).toStrictEqual({'name':'string'});

  });
});
