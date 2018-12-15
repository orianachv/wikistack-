var express = require('express');
var wikiRouter = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

wikiRouter.get('/', (req, res) => {
  Page.findAll()
    .then(page => console.log(page))
    .then(page => res.render('index', { pages: page }));
});

wikiRouter.get('/add', (req, res) => {
  res.render('addpage');
});

wikiRouter.get('/:urlTitle', (req, res, next) => {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle,
    },
  })
    .then(data => {
      res.render('wikipage', { page: data });
    })
    .catch(next);
});

wikiRouter.post('/', (req, res, next) => {
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
  });
  page
    .save()
    .then(data => {
      res.redirect(data.route);
    })
    .catch(next);
});

module.exports = wikiRouter;
