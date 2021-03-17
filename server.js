const express = require('express');
const graphqlHTTPS = require('graphql-express');
const cors = require('cors');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
