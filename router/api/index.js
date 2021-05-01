const express = require('express');
const app = express();

app.use('/user', require('./user'));
app.use('/auth', require('./auth'));
app.use('/contact-us', require('./contact-us'));

module.exports = app;
