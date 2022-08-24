

export default class Model {
  constructor(model) {
    this.aggregates = model.definitions.aggregates;
    this.entities = model.definitions.entities;
    this.valueObjects = model.definitions.value_objects;
    this.primitives = model.definitions.primitives;
  }

  show() {
    console.log('Aggregates');

    for( let aggregate in this.aggregates ) {
      console.log(JSON.stringify(aggregate) +":" + JSON.stringify(this.aggregates[aggregate]) );
    }

    console.log('Entities');
    for( let entity in this.entities ) {
      console.log(JSON.stringify(entity) + ":" + JSON.stringify(this.entities[entity]));
    }

    console.log('Value-objects');
    for( let value_object in this.valueObjects ) {
      console.log(JSON.stringify(value_object) + ":" + JSON.stringify(this.valueObjects[value_object]));
    }

    console.log('Primitives');
    for( let primitive in this.primitives ) {
      console.log(JSON.stringify(primitive) + ":" + JSON.stringify(this.primitives[primitive]));
    }
  }
};
