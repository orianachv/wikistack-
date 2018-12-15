const express = require('express');
const router = express.Router();
const { Page } = require('../models/index');
//requiero las rutas de usuario y wiki

router.use('/wiki', require('./wiki'));
router.use('/users', require('./user'));

router.get('/', function(req, res, next) {
  Page.findAll()
    // .then(page => console.log(page))
    .then(page => res.render('index', { pages: page }));
});
module.exports = router;
