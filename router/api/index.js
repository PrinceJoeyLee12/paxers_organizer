const express = require('express');
const app = express();

app.use('/user', require('./user'));
app.use('/auth', require('./auth'));

module.exports = app;
