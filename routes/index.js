'use strict';

var express = require('express');
var showdown  = require('showdown');
var router = express.Router();
var database = require('../utils/database.js');
var i18n = require ('../utils/i18n.js');
var translator = require('../utils/translator.js');
var converter = new showdown.Converter();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    i18n: {
      hano: 'World of Hano',
      history: 'History',
      land: 'Land',
      people: 'People',
      lang: 'Lang',
    },
  });
});

/**
 * USERS
 */

/* GET list of users */
router.get('/users', function(req, res, next) {
  res.render('users', {
    i18n: i18n,
  });
});

/* GET single user */


/* GET add a new user */

/**
 * DICTIONARY
 */

/* GET list of entries */
router.get('/dictionary', function(req, res, next) {
  res.render('dictionary/list', {
    i18n: i18n,
  });
});

/* GET single entry */
router.get('/dictionary/:url', function(req, res, next) {
  res.render('dictionary/entry', {
    i18n: i18n,
    url: req.params.url,
    form: 'false',
    user: 'u',
  });
});

/* GET add a new entry */
router.get('/NewEntry', function(req, res, next) {
  res.render('dictionary/entry', {
    i18n: i18n,
    url: 'New Entry',
    form: 'true',
    user: 's',
  });
});

/**
 * ARTICLES
 */

/* GET list of articles */
router.get('/articles', function(req, res, next) {
  res.render('articles/list', {
    i18n: i18n,
  });
});

/* GET single article */
router.get('/articles/:url', function(req, res, next) {
  database.articles.findOne(req.params.url, function(err, row) {
    if (err) { return next(err); }
    database.categories.find('articleId', row.id, function(err, rows) {
      if (err) { return next(err); }
      row.categories = rows;
      res.render('articles/article', {
        i18n: i18n,
        url: req.params.url,
        article: row,
        converter: converter,
        translator: translator,
        user: 's',
      });
    });
  });
});

/* GET list of categories */
router.get('/categories', function(req, res, next) {
  res.render('articles/categories', {
    i18n: i18n,
  });
});

/* GET add a new article */
router.get('/NewArticle', function(req, res, next) {
  res.render('articles/edit', {
    i18n: i18n,
    method: 'POST',
  });
});

/* GET edit an article */
router.get('/EditArticle/:url', function(req, res, next) {
  res.render('articles/edit', {
    i18n: i18n,
    method: 'PUT',
    url: req.params.url,
  });
});

module.exports = router;
