const express = require('express');
const router = express.Router();

const resource = require('../resources/user');

router.get('/user', resource.list)
router.get('/user/:id', resource.get)


module.exports = router;