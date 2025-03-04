
import fs   from 'fs';
import { ValueObjectDefinition } from '../lib/value-object-definition';
import { CodeGenerator } from '../lib/code-generator';
import { TemplateCompiler } from '../lib/template-compiler';

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

    let entity = model[0];

    let details = entity.details();;
    expect( details ).toStrictEqual({'name':'string'});

  });

  it('should return the models deep details', () => {
    let model =[ new ValueObjectDefinition({'email':{'user':{'type':'string'},
                                                     'domain':{'type':'string'}
                                                     }
                                            })
                ];

    let entity = model[0];

    let deepDetails = entity.deepDetails();
    expect( deepDetails ).toStrictEqual({'type':'string'});

  });
});
