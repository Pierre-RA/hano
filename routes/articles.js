'use strict';

var express = require('express');
var slug = require('slug');
var i18n = require ('../utils/i18n.js');
var database = null;
var router = express.Router();

/* GET articles home page */
router.get('/', function(req, res, next) {
  var array = {};
  if (req.params.page) {
    array.offset = ((req.params.page - 1) * 50);
    array.limit = 50; // TODO: put it as a config value.
  }
  database.articles.list(array, function(err, rows) {
    if (err) {
      return res.json({
        articles: [{
          title: 'error',
        }],
      });
    }
    res.json({
      articles: rows,
    });
  });
});

/* GET /articles/search */
router.get('/search', function(req, res, next) {
  res.send('something');
});

/* POST /articles add an article */
router.post('/', function(req, res, next) {
  database.uuid(function(err, rows) {
    req.body.id = rows[0].uuid;
    req.body.timestamp = new Date().getTime();
    req.body.url = slug(req.body.title);
    var categories = [];
    for (var i = 0; i < req.body.categories.length; i++) {
      categories.push({
        articleId: req.body.id,
        text: req.body.categories[i].text,
      });
    }
    delete req.body.categories;
    database.articles.create(req.body, function(err) {
      if (err) { return next(err); }
      database.categories.update(categories, req.body.id, function(err) {
        if (err) { return next(err); }
        res.send('success');
      });
    });
  });
});

/* PUT /articles/:id update an article */
router.put('/:id', function(req, res, next) {
  req.body.id = req.params.id;
  req.body.url = slug(req.body.title);
  var categories = [];
  for (var i = 0; i < req.body.categories.length; i++) {
    categories.push({
      articleId: req.body.id,
      text: req.body.categories[i].text,
    });
  }
  delete req.body.categories;
  database.articles.update(req.body, function(err) {
    if (err) { return next(err); }
    database.categories.update(categories, req.body.id, function(err) {
      if (err) { return next(err); }
      res.send('success');
    });
  });
});

/* DELETE /articles/:id delete an article */
router.delete('/:id', function(req, res, next) {
  database.articles.delete(req.params.id, function(err) {
    if (err) { return next(err); }
  });
});

/* GET /articles/:url get an article */
router.get('/:url', function(req, res, next) {
  database.articles.findOne(req.params.url, function(err, row) {
    if (err) { return next(err); }
    database.categories.find('articleId', row.id, function(err, rows) {
      row.categories = rows;
      res.json({
        article: row,
      });
    });
  });
});

/* GET /articles/exists/:url tells if url already exists */
router.get('/exists/:url', function(req, res, next) {
  database.articles.findOne(req.params.url, function(err, row) {
    if (err) {
      return res.json({
        exists: false,
      });
    }
    res.json({
      exists: true,
    });
  });
});

module.exports = router;
