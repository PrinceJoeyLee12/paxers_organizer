const {
  filterHelperArgs,
  getFilterHelperArgOptsMap,
} = require('graphql-compose-mongoose/lib/resolvers/helpers');
const { RegistrantCompose } = require('../models/Registrant');
const { EventCompose } = require('../models/Event');

//Populate Event in Registrant Schema
RegistrantCompose.addFields({
  eventInfo: EventCompose.getResolver('findOne', {
    filterHelperArgs: source => ({
      _id: source.event,
    }),
  }),
});

const RegistrantQuery = {
  registrant: RegistrantCompose.getResolver('findOne', filterHelperArgs),
  registrantFindAll: RegistrantCompose.getResolver('findMany'),
};

module.exports = { RegistrantQuery };
