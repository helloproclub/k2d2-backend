const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Token', tokenSchema);