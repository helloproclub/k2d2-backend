const express = require('express');
const router = express.Router();

var normalizedPath = require("path").join(__dirname, "routes");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
    router.use('/v1', require("./routes/" + file));
});

module.exports = router;