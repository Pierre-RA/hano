'use strict';

var express = require('express');
var passport = require('passport');
var router = express.Router();
var i18n = require ('../utils/i18n.js');
var translator = require('../utils/translator.js');
var User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    i18n: i18n,
    navigation: [{
      url: '/categories/History',
      title: i18n.history,
    }, {
      url: '/categories/Land',
      title: i18n.land,
    }, {
      url: '/categories/People',
      title: i18n.people,
    }, {
      url: '/categories/Lang',
      title: i18n.lang,
    },],
    user: req.user,
  });
});

/* GET list articles */
router.get('/articles/', function(req, res, next) {
  res.render('articles/list', {
    i18n: i18n,
    user: req.user,
  });
});

/* GET article */
router.get('/articles/:url', function(req, res, next) {
  res.render('articles/article', {
    i18n: i18n,
    url: req.params.url,
    user: req.user,
  });
});

/* GET list categories */
router.get('/categories/', function(req, res, next) {
  res.render('articles/list', {
    i18n: i18n,
    categories: true,
  });
});

/* GET category */
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

/* GET new-user */
router.get('/new-user', User.isAdmin, function(req, res, next) {
  res.render('users/edit', {
    i18n: i18n,
    method: 'post',
  });
});

/* GET new-article */
router.get('/new-article', User.isEditor, function(req, res, next) {
  res.render('articles/edit', {
    i18n: i18n,
    method: 'post',
  });
});

/* GET new-entry */
router.get('/new-entry', User.isLinguist, function(req, res, next) {
  res.render('dictionary/edit', {
    i18n: i18n,
    method: 'post',
  });
});

/* GET signin */
router.get('/sign-in', function(req, res, next) {
  res.render('signin', {
    i18n: i18n,
    method: 'post',
    message: req.flash('signInMessage'),
  });
});

/* POST signin */
router.post('/sign-in',
  passport.authenticate('local', { failureRedirect: '/sign-in' }),
  function(req, res) {
    res.redirect('/');
  });

/* GET signout */
router.get('/sign-out', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
