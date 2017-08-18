const mongoose = require('mongoose');

const app = require('./config/express');
const config = require('./config/env');


mongoose.connect(config.db);
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});
mongoose.connection.on('connected', () => {
  console.log(`Connected to database: ${config.db}`);
});

if (config.env === 'development') {
  mongoose.set('debug', true);
};


app.listen(config.port, () => {
    console.log(`[${config.env}] Server started on port ${config.port}`);
});

module.exports = app;