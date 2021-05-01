const { SchemaComposer } = require('graphql-compose');

const schemaComposer = new SchemaComposer();
const { RegistrantQuery } = require('./registrants');
const { ConcernQuery, ConcernMutation } = require('./concerns');

schemaComposer.Query.addFields({
  ...RegistrantQuery,
  ...ConcernQuery,
});

schemaComposer.Mutation.addFields({
  ...ConcernMutation,
});

module.exports = schemaComposer.buildSchema();
