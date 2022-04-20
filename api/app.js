const express = require('express');
const morgan = require('morgan');
const userRoute = require('./routes/userRoute');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/users', userRoute);

module.exports = app;
