
//const GetPath from './get-path');
import {
  reduce,
  showMap,
  replace,
  unEscape } from './utils';

export class TaskCodeGenerator {
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
