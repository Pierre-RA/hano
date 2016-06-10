'use strict';

var express = require('express');
var database = null;
var router = express.Router();
var Article = require('../models/article.js');

/* GET categories */
router.get('/', function(req, res, next) {
  Article.distinct('categories', {}, function(err, entries) {
    if (!entries) {
      return res.status(404).json({
        message: 'Categories not found.',
      });
    }
    res.json(entries);
  });
});

module.exports = router;
