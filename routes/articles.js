'use strict';

var express = require('express');
var showdown  = require('showdown');
var slug = require('slug');
var i18n = require ('../utils/i18n.js');
var database = require('../utils/database.js');
var router = express.Router();
var converter = new showdown.Converter();

/* GET articles home page */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET articles new page */
router.get('/new', function(req, res, next) {
  res.render('new_article', {
    converter: converter,
    i18n: i18n,
    method: 'POST',
    article: {
      id: '',
    },
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
    req.body.url = slug(req.body.title);
    database.articles.create(req.body, function(err) {
      if (err) {
        next(err);
      } else {
        res.send('sent');
      }
    });
  });
});

/* PUT /articles/:id update an article */
router.put('/:id', function(req, res, next) {
  req.body.id = req.params.id;
  req.body.url = slug(req.body.title);
  database.articles.update(req.body, function(err) {
    if (err) {
      next(err);
    } else {
      res.send('sent');
    }
  });
});

/* DELETE /articles/:id delete an article */
router.delete('/:id', function(req, res, next) {
  database.articles.delete(req.params.id, function(err) {
    if (err) {
      return next(err);
    }
  });
});

/* GET /articles/:url get an article */
router.get('/:url', function(req, res, next) {
  database.articles.findOne(req.params.url, function(err, row) {
    if (err) {
      return next(err);
    }
    res.render('article', {
      converter: converter,
      i18n: i18n,
      method: 'PUT',
      user: true,
      article: {
        id: row.id,
        title: row.title,
        content: row.content,
      },
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
