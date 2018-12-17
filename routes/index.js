const express = require('express');
const router = express.Router();
const { Page } = require('../models/index');
//requiero las rutas de usuario y wiki

router.use('/wiki', require('./wiki'));
router.use('/users', require('./user'));

module.exports = router;
