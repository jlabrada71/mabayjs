const fs   = require('fs');

module.exports = class ManifestoReader {
  constructor() {
  }

  read( manifestoFile ) {
    return JSON.parse(fs.readFileSync( manifestoFile, 'utf8' ));
  }
}
