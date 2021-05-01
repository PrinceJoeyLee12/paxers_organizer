const {
  filterHelperArgs,
} = require('graphql-compose-mongoose/lib/resolvers/helpers');
const { ConcernCompose } = require('../models/Concern');

const ConcernMutation = {
  addConcern: ConcernCompose.getResolver('createOne'),
};

const ConcernQuery = {
  concerns: ConcernCompose.getResolver('findMany'),
  concernsCount: ConcernCompose.getResolver('count'),
};

module.exports = { ConcernQuery, ConcernMutation };
