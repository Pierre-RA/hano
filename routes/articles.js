'use strict';

var express = require('express');
var slug = require('slug');
var Article = require('../models/article.js');
var User = require('../models/user.js');
var router = express.Router();

/* GET arrticle listing. */
router.get('/', function(req, res, next) {
  var query = {};
  if (req.query.q) {
    query = { categories: { $in: [req.query.q] } };
  }
  Article.find(query).sort({updatedAt: 'desc'}).exec(function(err, articles) {
    if (err) { return res.status(500).json({ error: err }); }
    res.json(articles);
  });
});

/* GET article */
router.get('/:url', function(req, res, next) {
  Article.findOne({ url: slug(req.params.url) }, function(err, article) {
    if (!article) {
      return res.status(404).json({
        message: 'Article not found.',
      });
    }
    res.json(article);
  });
});

/* POST entry */
router.post('/', User.isEditor, function(req, res, next) {
  var cats = req.body.categories.map(function(item) {
    return item.text;
  });
  var article = new Article({
    url: slug(req.body.title),
    title: req.body.title,
    content: req.body.content,
    categories: cats,
    era: req.body.era,
    author: req.user._id,
  });
  article.save(function(err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
    res.json({
      message: 'article created',
    });
  });
});

/* PUT article */
router.put('/:id', User.isEditor, function(req, res, next) {
  req.body.categories = req.body.categories.map(function(item) {
    return item.text;
  });
  Article.findByIdAndUpdate(req.params.id, req.body,
    function(err, doc) {
      if (err) { return res.status(500).json({ error: err }); }
      res.json({
        message: 'article updated',
      });
    });
});

/* DELETE article */
router.delete('/:id', User.isEditor, function(req, res, next) {
  Article.remove({ _id: req.params.id }, function(err) {
    res.json({
      message: 'article #' + req.params.id + ' has been removed.',
    });
  });
});


module.exports = router;
