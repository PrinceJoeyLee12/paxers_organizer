const mongoose = require('mongoose');

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  poolSize: 4,
};

exports.connectDB = async () => {
  try {
    const connectDB = await mongoose.connect(
      process.env.MONGO_URI_FOR_USERS,
      options,
    );
    console.log(`Connected to host ${connectDB.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};
