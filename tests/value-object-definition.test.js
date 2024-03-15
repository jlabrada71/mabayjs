
const fs   = require('fs');
const ValueObjectDefinition = require('../lib/value-object-definition');
const CodeGenerator = require('../lib/code-generator');
const TemplateCompiler = require('../lib/template-compiler');

//jest.mock('../problem-repository');

describe('ValueObjectDefinition tests', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    //ProblemRepository.mockClear();

  });


  it('should also return the models name', () => {
    let model =[new ValueObjectDefinition({'valueObjectName':{'name':'string'}})];

    let valueObject = model[0];

    let keys = Object.keys(valueObject.definition);
    expect( keys ).toStrictEqual(['valueObjectName']);
    expect( valueObject.definition[keys[0]]).toStrictEqual( {'name':'string'});

    expect( valueObject.name() ).toBe('valueObjectName');

  });

  it('should return the models details', () => {
    let model =[new ValueObjectDefinition({'itinerary':{'name':'string'}})];

    let value = model[0];

    let details = value.details();;
    expect( details ).toStrictEqual({'name':'string'});

  });

  it('should return the models deep details', () => {
    let model =[ new ValueObjectDefinition({'email':{'user':{'type':'string'},
                                                     'domain':{'type':'string'}
                                                     }
                                            })
                ];

    let value = model[0];

    let deepDetails = value.deepDetails();
    expect( deepDetails ).toStrictEqual({'type':'string'});

  });
});
