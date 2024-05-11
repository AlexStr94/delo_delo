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

