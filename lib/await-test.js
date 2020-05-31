const fs = require('fs').promises;

module.exports = class AwaitTest {
  constructor( ) {
  }

  async read( path ) {
    const data = await fs.readFile(path, 'binary');
    return data;
  }


  async write( path, data ) {
    await fs.writeFile( path , data);
  }

  async test() {
    let text = await this.read('./example0.yml');

    console.log( text );
  }
};
