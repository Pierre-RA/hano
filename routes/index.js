'use strict';

var express = require('express');
var showdown  = require('showdown');
var router = express.Router();
var database = require('../utils/database.js');
var i18n = require ('../utils/i18n.js');
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
  res.render('entries', {
    i18n: i18n,
  });
});

/* GET single entry */

/* GET add a new entry */

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
  database.articles.findOne(req.params.url, function(err, rows) {
    res.render('articles/article', {
      i18n: i18n,
      url: req.params.url,
      article: rows,
      converter: converter,
      user: 's',
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
