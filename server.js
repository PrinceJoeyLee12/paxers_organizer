const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const { connectDB } = require('./config/db.js');
const schema = require('./schemas');

//configure global variables
if (process.env.NODE_ENV === 'development')
  dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

//Initialize Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//allow cross origin
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: 'http://localhost:5000' }));
  app.use(morgan('dev'));
}

//landing to the server
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.use('/api', require('./router/api'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
