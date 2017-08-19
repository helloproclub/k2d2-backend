require('dotenv').config();

const mongoose = require('mongoose');

const app = require('./config/express');


mongoose.connect(process.env.DB);
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${process.env.DB}`);
});
mongoose.connection.on('connected', () => {
  console.log(`Connected to database: ${process.env.DB}`);
});

if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
};


app.listen(process.env.PORT, () => {
    console.log(`[${process.env.ENV}] Server started on port ${process.env.PORT}`);
});

module.exports = app;