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
      },
      works: 'TaskWork[]',
      archive: {
        type: 'bool',
        default: false
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
      works: 'TaskWork[]',
      archive: {
        type: 'bool',
        default: false
      }
    },
    primaryKey: '_id',
  };
}

export class TaskWork extends Realm.Object {
  static schema = {
    name: 'TaskWork',
    properties: {
      _id: 'uuid',
      date: 'date',
      done: 'bool',
      periodical_task: {
        type: 'linkingObjects',
        objectType: 'PeriodicalTask',
        property: 'works'
      },
      current_task: {
        type: 'linkingObjects',
        objectType: 'CurrentTask',
        property: 'works'
      }
    },
    primaryKey: '_id',
  };
}
