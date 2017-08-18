const express = require('express');
const router = express.Router();

const resource = require('../resources/contact');

router.get('/contact', resource.list)

module.exports = router;