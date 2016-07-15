'use strict';

var express = require('express');
var passport = require('passport');
var router = express.Router();
var i18n = require ('../utils/i18n.js');
var User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: i18n.hano,
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
    user: req.user,
    title: i18n.article,
  });
});

/* GET article */
router.get('/articles/:url', function(req, res, next) {
  res.render('articles/article', {
    url: req.params.url,
    user: req.user,
  });
});

/* GET list categories */
router.get('/categories/', function(req, res, next) {
  res.render('articles/list', {
    category: true,
    title: i18n.categories,
  });
});

/* GET category */
router.get('/categories/:url', function(req, res, next) {
  res.render('articles/list', {
    category: req.params.url,
    user: req.user,
    title: req.params.url,
  });
});

/* GET dictionary list of words */
router.get('/dictionary/', function(req, res, next) {
  res.render('dictionary/entry', {
    url: '*',
    user: req.user,
  });
});

/* GET entry */
router.get('/dictionary/:url', function(req, res, next) {
  res.render('dictionary/entry', {
    url: req.params.url,
    user: req.user,
  });
});

/* GET list users */
router.get('/users/', function(req, res, next) {
  res.render('users/list', {
    user: req.user,
  });
});

/* GET user */
router.get('/users/:url', function(req, res, next) {
  res.render('users/user', {
    url: req.params.url,
    user: req.user,
  });
});

/* GET new-user */
router.get('/new-user', User.isAdmin, function(req, res, next) {
  res.render('users/edit', {
    method: 'post',
    user: req.user,
  });
});

/* GET new-article */
router.get('/new-article', User.isEditor, function(req, res, next) {
  res.render('articles/edit', {
    method: 'post',
    user: req.user,
  });
});

/* GET new-entry */
router.get('/new-entry', User.isLinguist, function(req, res, next) {
  res.render('dictionary/edit', {
    method: 'post',
    user: req.user,
  });
});

/* GET signin */
router.get('/sign-in', function(req, res, next) {
  res.render('signin', {
    method: 'post',
    message: req.flash('signInMessage'),
    user: req.user,
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
