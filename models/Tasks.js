import Realm from "realm";


export class CurrentTask extends Realm.Object {
  static schema = {
    name: 'CurrentTask',
    properties: {
      _id: 'uuid',
      name: 'string',
      description: {
        type: 'string',
        optional: true,
      }
    },
    primaryKey: '_id',
  };
}

export class PeriodicalTask extends Realm.Object {
  static schema = {
    name: 'PeriodicalTask',
    properties: {
      _id: 'uuid',
      name: 'string',
      description: {
        type: 'string',
        optional: true,
      },
      type: 'string',
      number: 'int',
      days: {
        type: 'set',
        objectType: 'int',
        optional: true
      },
    },
    primaryKey: '_id',
  };
}
