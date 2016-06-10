'use strict';

var express = require('express');
var database = null;
var router = express.Router();

/* GET categories */
router.get('/', function(req, res, next) {
  var query = req.query.query || '';
  database.categories.search(query, function(err, rows) {
    if (err) { return next(err);}
    res.json(rows);
  });
});

module.exports = router;
