import * as authentication from '@feathersjs/authentication';
import populateUsers from '../../hooks/populate-users';
import setField from '../../hooks/set-field';
const search = require('feathers-mongodb-fuzzy-search');
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [],
    find: [
      search({
        fields: ['name']
      })
    ],
    get: [],
    create: [authenticate('jwt'), setField({ as: 'data.creator', from: 'params.user._id' })],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [
      populateUsers({ nameAs: 'creator', parentField: 'creator', asArray: false }),
      populateUsers({ nameAs: 'committee', parentField: 'committee', asArray: true })
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
