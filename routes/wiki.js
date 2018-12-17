var express = require('express');
var wikiRouter = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

wikiRouter.get('/', (req, res) => {
  Page.findAll().then(pages => res.render('index', { pages }));
});

wikiRouter.get('/add', (req, res) => {
  res.render('addpage');
});

// wikiRouter.get('/search', (req, res) => {
//   var search = req.query.search.split(' ');
//   Page.findByTag(search).then(page => {
//     res.render('wikipage', { page });
//   });
// });

wikiRouter.get('/:urlTitle', (req, res, next) => {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle,
    },
  })
    .then(page => {
      res.render('wikipage', { page });
    })
    .catch(next);
});

wikiRouter.post('/', (req, res, next) => {
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email,
    },
  })
    .then(function(values) {
      var user = values[0];
      console.log(req.body);
      var page = Page.build({
        title: req.body.title,
        content: req.body.content,
        tag: req.body.tags.split(' '),
      });
      return page.save().then(function(page) {
        return page.setAuthor(user);
      });
    })
    .then(function(page) {
      res.redirect(page.urlTitle);
    })
    .catch(next);
});

module.exports = wikiRouter;
