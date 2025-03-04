
import Handlebars from 'handlebars';


//jest.mock('../problem-repository');
describe('Using handlebars tests', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    //ProblemRepository.mockClear();

  });

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    //ProblemRepository.mockClear();

  });

  it('Handlebars rock', () => {
    let template = Handlebars.compile('Handlebars <b>{{doesWhat}}</b>');

    expect( template({ doesWhat: 'rocks!' }) ).toStrictEqual('Handlebars <b>rocks!</b>');

  });

  it('Handlebars rock twice ', () => {
    let template = Handlebars.compile('Handlebars <b>{{doesWhat}} {{how}}</b>');
    let tempResult = template({ doesWhat: 'rocks!', how:'great' });

    expect( tempResult ).toStrictEqual('Handlebars <b>rocks! great</b>');
  });
});
