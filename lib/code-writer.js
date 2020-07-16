const fs   = require('fs').promises;

module.exports = class ManifestoReader {
  constructor() {
  }

  async createPath( path, folder ) {
    const folderParts = folder.split("/");
    let newPath = path;
    for( let folderPart of folderParts ) {
      newPath = `${newPath}/${folderPart}`;
      try {
          await fs.access( newPath );
          // The check succeeded
      } catch (error) {
          await fs.mkdir( newPath );
      }
    }
    return newPath;
  }

  async write( name, code, path, folder, ext ) {
    let outputPath = await this.createPath( path, folder );
    await fs.writeFile(`${outputPath}/${name}${ext}` , code);
  }
}
