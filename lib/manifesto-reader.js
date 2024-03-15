import fs from 'fs';

export default class ManifestoReader {
  read( manifestoFile ) {
    return JSON.parse(fs.readFileSync( manifestoFile, 'utf8' ));
  }
}
