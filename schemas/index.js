const { SchemaComposer } = require('graphql-compose');

const schemaComposer = new SchemaComposer();
const { RegistrantQuery } = require('./registrants');

schemaComposer.Query.addFields({
  ...RegistrantQuery,
});

module.exports = schemaComposer.buildSchema();
