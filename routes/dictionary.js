'use strict';

var express = require('express');
var router = express.Router();
var database = null;

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
        definitions: [{
          def: 'totalité',
          note: 'vieille notion',
        }, {
          def: 'totalitaire',
        },],
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
  database.uuid(function(err, rows) {
    req.body.id = rows[0].uuid;
    req.body.timestamp = new Date().getTime();
    for (var i = 0; i < req.body.definitions.length; i++) {
      database.definitions.create(req.body.definitions[i]);
    }
    database.dictionary.create(req.body, function(err) {
      if (err) {
        return res.json({
          error: err,
        });
      }
      res.json({
        message: 'entry created.',
      });
    });
  });
});

/* GET dictionary entry */
router.get('/:entry', function(req, res, next) {
  res.json([
    {
      id: 'abc-123',
      lang: 'wu',
      trans: 'valár',
      type: 'nom',
      ipa: 'valaː',
      val: 'valár',
      definitions: [{
        def: 'totalité',
        note: 'vieille notion',
      }, {
        def: 'totalitaire',
      },],
    },
    {
      id: 'a12-ac2',
      lang: 'na',
      trans: 'valár',
      type: 'verbe',
      ipa: 'valaː',
      val: 'valár',
      definitions: [{
        def: 'totaliser',
      }],
    },
  ]);
});

/* DELETE dictionary entry */
router.delete('/:id', function(req, res, next) {
  database.definitions.delete(req.params.id, function(err) {
    if (err) {
      return res.json({
        error: err,
      });
    }
    database.dictionary.delete(req.params.id, function(err) {
      res.json({
        message: 'entry deleted.',
      });
    });
  });
});

/* PUT dictionary entry */
router.put('/:id', function(req, res, next) {
  req.body.id = req.params.id;
  database.definitions.delete(req.params.id, function(err) {
    if (err) {
      return res.json({
        error: err,
      });
    }
    for (var i = 0; i < req.body.definitions.length; i++) {
      database.definitions.create(req.body.definitions[i]);
    }
    database.dictionary.update(req.body, function(err) {
      if (err) {
        return res.json({
          error: err,
        });
      }
      res.json({
        message: 'entry updated.',
      });
    });
  });
});

module.exports = router;
