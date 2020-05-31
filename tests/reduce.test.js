
const { reduce } = require('../lib/utils');

describe('Story Details API Testing', () => {
  beforeEach(() => {
  });

  it('should return a map', () => {
    let list =['a', 'b'];
    let map = reduce( list, function(map, item) {
      map.set( item, item );
      return map;
    });
    let entriesIterator = map.entries();

    let item = entriesIterator.next();
    expect( item.done ).toBe( false );
    expect( item.value[0] ).toBe( 'a' );
    expect( item.value[1] ).toBe( 'a' );

    let itemb = entriesIterator.next();
    expect( itemb.done ).toBe( false );
    expect( itemb.value[0] ).toBe( 'b' );
    expect( itemb.value[1] ).toBe( 'b' );

    let itemc = entriesIterator.next();
    expect( itemc.done ).toBe( true );

  });

});
