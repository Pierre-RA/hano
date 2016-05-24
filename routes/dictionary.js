'use strict';

var express = require('express');
var router = express.Router();

/* GET dictionary home page */
router.get('/', function(req, res, next) {
  res.render('entry', {
    results: [
      {
        lang: 'wu',
        trans: 'valár',
        type: 'nom',
        api: 'valaː',
        val: 'valár',
        definitions: [
          'totalité',
          'totalitaire',
        ],
      },
      {
        lang: 'wu',
        trans: 'valár',
        type: 'verbe',
        api: 'valaː',
        val: 'valár',
        definitions: [
          'totaliser',
        ],
      },
    ],
  });
});

/* GET dictionary search */
router.get('/search', function(req, res, next) {
  res.send('something');
});

/* POST dictionary add an entry */
router.post('/', function(req, res, next) {
  res.send('something.');
});

/* PUT dictionary entry */
router.get('/:entry', function(req, res, next) {
  res.send('something');
});

/* DELETE dictionary entry */
router.get('/:entry', function(req, res, next) {
  res.send('something');
});

/* GET dictionary entry */
router.get('/:entry', function(req, res, next) {
  res.send('something');
});

module.exports = router;
