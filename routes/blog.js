'use strict';

var express = require('express');
var router = express.Router();

/* GET blog home page */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET blog search */
router.get('/search', function(req, res, next) {
  res.send('something');
});

/* POST blog entry add an entry */
router.post('/', function(req, res, next) {
  res.send('something.');
});

/* PUT blog entry */
router.get('/:entry', function(req, res, next) {
  res.send('something');
});

/* DELETE blog entry */
router.get('/:entry', function(req, res, next) {
  res.send('something');
});

/* GET blog entry */
router.get('/:entry', function(req, res, next) {
  res.send('something');
});

module.exports = router;
