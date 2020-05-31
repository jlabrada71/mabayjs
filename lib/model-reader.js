const yaml = require('js-yaml');
const fs   = require('fs');

module.exports = class ModelReader {
  constructor() {
  }

  read( model ) {
    return yaml.safeLoad( fs.readFileSync( model, 'utf8' ));
  }
}
