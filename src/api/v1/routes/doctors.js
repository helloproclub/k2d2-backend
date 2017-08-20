const express = require('express');
const router = express.Router();

const resource = require('../resources/doctors');

router.get('/doctors', resource.list)
router.get('/doctors/:id', resource.get)

module.exports = router;