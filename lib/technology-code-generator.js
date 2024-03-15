
//const GetPath = require('./get-path');
const {
  reduce,
  showMap,
  replace,
  unEscape } = require('./utils');

module.exports = class TechnologyCodeGenerator {
  constructor( tasks, codeGenerator) {
    this.tasks = tasks;
    this.codeGenerator = codeGenerator;
  }

  generate( model ) {
    let codes = {};
    this.tasks.forEach((task) => {
      Object.defineProperty(codes, task.name, {
        value: task.value,
        writable: false,
      });
    });
    return this.codeGenerator.generate( codes, {type: 'tecnology', key: 'tecnology' });
  }
}
