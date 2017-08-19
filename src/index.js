require('dotenv').config();

const app = require('./config/express');

app.listen(process.env.PORT, () => {
    console.log(`[${process.env.ENV}] Server started on port ${process.env.PORT}`);
});

module.exports = app;