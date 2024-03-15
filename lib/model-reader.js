import yaml from 'js-yaml';
import fs   from 'fs';

export default class ModelReader {
  read( model ) {
    return yaml.safeLoad( fs.readFileSync( model, 'utf8' ));
  }
}
