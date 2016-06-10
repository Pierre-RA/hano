'use strict';

var express = require('express');
var slug = require('slug');
var Article = require('../models/article.js');
var router = express.Router();

/* GET arrticle listing. */
router.get('/', function(req, res, next) {
  Article.find({}, function(err, articles) {
    if (err) { return res.status(500).json({ error: err }); }
    res.json(articles);
  });
});

/* GET article */
router.get('/:url', function(req, res, next) {
  Article.findOne({ url: req.params.url }, function(err, article) {
    if (!article) {
      return res.status(404).json({
        message: 'Article not found.',
      });
    }
    res.json(article);
  });
});

/* POST entry */
router.post('/', function(req, res, next) {
  var article = new Article({
    url: slug(req.body.title),
    title: req.body.title,
    content: req.body.content,
    categories: req.body.categories,
    era: req.body.era,
  });
  article.save(function(err) {
    if (err) { return res.status(500).json({ error: err }); }
    res.json({
      message: 'article created',
    });
  });
});

/* PUT article */
router.put('/:id', function(req, res, next) {
  Article.findByIdAndUpdate(req.params.id, req.body,
    function(err, doc) {
      if (err) { return res.status(500).json({ error: err }); }
      res.json({
        message: 'article updated',
      });
    });
});

/* DELETE article */
router.delete('/:id', function(req, res, next) {
  Article.remove({ _id: req.params.id }, function(err) {
    res.json({
      message: 'article #' + req.params.id + ' has been removed.',
    });
  });
});


module.exports = router;
