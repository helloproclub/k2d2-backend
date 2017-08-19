const express = require('express');
const router = express.Router();

const resource = require('../resources/doctor');

router.get('/doctor', resource.list)
router.get('/doctor/:id', resource.get)

module.exports = router;