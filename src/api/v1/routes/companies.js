const express = require('express');
const router = express.Router();

const resource = require('../resources/companies');

router.get('/companies', resource.list)
router.get('/companies/:id', resource.get)

module.exports = router;