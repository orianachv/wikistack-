var express = require('express');
var userRouter = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

userRouter.get('/', (req, res) => {
  User.findAll().then(users => res.render('users', { users }));
});

userRouter.get('/:id', function(req, res, next) {
  var user = User.findById(req.params.id);
  var pages = Page.findAll({
    where: {
      authorId: req.params.id,
    },
  });
  Promise.all([user, pages])
    .then(function(values) {
      var user = values[0];
      var pages = values[1];
      res.render('user', { user, pages });
    })
    .catch(next);
});
// userRouter.post('/', (req, res) => {
//   res.send('agrega un usuario');
// });
// userRouter.put('/:id', (req, res) => {
//   res.send('modifica un usuario especificop ');
// });

// userRouter.delete('/:id', (req, res) => {
//   res.send('elimina un usuario');
// });
module.exports = userRouter;
