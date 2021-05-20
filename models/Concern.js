const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { composeWithMongoose } = require('graphql-compose-mongoose');

const ConcernSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: true,
    minLength: 20,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Concern = mongoose.model('concerns', ConcernSchema);
const ConcernCompose = composeWithMongoose(
  mongoose.model('concerns', ConcernSchema),
);

module.exports = { Concern, ConcernCompose };
