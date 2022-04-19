const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log('Connection to the database has been established');
  })
  .catch(() => {
    console.log('Something went wrong with the database connection');
  });
