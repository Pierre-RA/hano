'use strict';

var express = require('express');
var router = express.Router();
var Article = require('../models/article.js');

/* GET categories */
router.get('/', function(req, res, next) {
  var regex = req.query.q ? new RegExp(req.query.q, 'i') : null;
  Article.distinct('categories', {}, function(err, entries) {
    var result = [];
    if (regex) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].match(regex)) {
          result.push(entries[i]);
        }
      }
    } else {
      result = entries;
    }
    res.json(result);
  });
});

module.exports = router;
