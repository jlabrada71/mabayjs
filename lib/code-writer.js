const fs   = require('fs').promises;

module.exports = class CodeWriter {
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
    let newFileName = `${outputPath}/${name}${ext}`;
    try {
      const stats = await fs.stat(newFileName);
      await fs.unlink( newFileName );  // delete file name
    } catch (err) {
      // file does not exists do nothing (ugly implementation)
    }



    let codeNoTrailingSpace = code.replace(/ *\n/g, "\n");

    // remove empty lines at the end
    let i = codeNoTrailingSpace.lastIndexOf("\n\n");
    while( i === codeNoTrailingSpace.length - 2) {
      codeNoTrailingSpace = codeNoTrailingSpace.substring(0, i + 1 );
      i = codeNoTrailingSpace.lastIndexOf("\n\n");
    }

    await fs.writeFile( newFileName, codeNoTrailingSpace);
  }
}
