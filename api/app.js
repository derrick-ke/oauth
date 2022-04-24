const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const userRoute = require('./routes/userRoute');

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// HTTP header security
app.use(helmet());

// Data sanitization against NoSql injections
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/users', userRoute);

module.exports = app;
