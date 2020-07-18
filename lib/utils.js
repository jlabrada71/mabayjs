
function replace( string, what, newValue ) {
  return string.split( what ).join( newValue );
}

function reduce( array, reduceFunction ) {
  let result = new Map();
  for( let item of array ) {
    reduceFunction( result, item );
  }
  return result;
}

function showMap( map, label ) {
  let entries = map.entries();
  let entry = entries.next();

  while( ! entry.done ) {
    entry = entries.next();
  }
}

function unEscape( string ) {
  let temp = replace(replace( string, '&amp;lt;', '<' ), '&amp;gt;', '>');
  temp = replace( temp, '&#x27;', '\'');
  temp = replace( temp, '&#x3D;', '=');
  temp = replace( temp, '&quot;', '"');
  temp = replace( temp, '&#x60;', '`');
  return replace( replace( temp, '&lt;', '<' ), '&gt;', '>');
}

module.exports = {  reduce, showMap, replace, unEscape };
