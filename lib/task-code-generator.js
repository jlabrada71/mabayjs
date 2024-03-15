
//const GetPath = require('./get-path');
const {
  reduce,
  showMap,
  replace,
  unEscape } = require('./utils');

module.exports = class TaskCodeGenerator {
  constructor( contexts, codeGenerator) {
    this.contexts = contexts;
    this.codeGenerator = codeGenerator;
  }

  generateCode() {
    let codes = {};
    this.contexts.forEach((context) => {
      Object.defineProperty(codes, context.name, {
        value: context.value,
        writable: false,
      });
    });
    return this.codeGenerator.generate( codes, {type: 'task', key: 'task' });
  }
}
