'use strict';

var express = require('express');
var showdown  = require('showdown');
var router = express.Router();
var i18n = require ('../utils/i18n.js');
var translator = require('../utils/translator.js');
var converter = new showdown.Converter();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    i18n: i18n,
  });
});

/* GET list articles */
router.get('/articles/', function(req, res, next) {
  res.render('articles/list', {
    i18n: i18n,
  });
});

/* GET article */
router.get('/articles/:url', function(req, res, next) {
  res.render('articles/article', {
    i18n: i18n,
    url: req.params.url,
  });
});

/* GET list categories */
router.get('/categories/', function(req, res, next) {
  res.render('articles/list', {
    i18n: i18n,
    categories: true,
  });
});

/* GET catgeory */
router.get('/categories/:url', function(req, res, next) {
  res.render('articles/list', {
    i18n: i18n,
    categories: true,
    url: req.params.url,
  });
});

/* GET list dictionary */
router.get('/dictionary/', function(req, res, next) {
  res.render('dictionary/list', {
    i18n: i18n,
  });
});

/* GET entry */
router.get('/dictionary/:url', function(req, res, next) {
  res.render('dictionary/entry', {
    i18n: i18n,
    url: req.params.url,
  });
});

/* GET list users */
router.get('/users/', function(req, res, next) {
  res.render('users/list', {
    i18n: i18n,
  });
});

/* GET user */
router.get('/users/:url', function(req, res, next) {
  res.render('users/user', {
    i18n: i18n,
    url: req.params.url,
  });
});

module.exports = router;
