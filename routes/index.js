'use strict';

var express = require('express');
var router = express.Router();

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

module.exports = router;
