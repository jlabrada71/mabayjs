const fs   = require('fs').promises;

module.exports = class ManifestoReader {
  constructor() {
  }

  async write( name, code, path, ext ) {
    await fs.writeFile(`${path}/${name}${ext}` , code);
  }
}
