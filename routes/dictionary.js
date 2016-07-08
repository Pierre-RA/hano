'use strict';

var express = require('express');
var router = express.Router();
var Dictionary = require('../models/dictionary.js');
var User = require('../models/user.js');

/* GET dictionary listing. */
router.get('/', function(req, res, next) {
  Dictionary.find({}, function(err, entries) {
    if (err) { return res.status(500).json({ error: err }); }
    res.json(entries);
  });
});

/* GET entry */
router.get('/:trans', function(req, res, next) {
  console.log(req.params.trans);
  Dictionary.find({ transcription: decodeURI(req.params.trans) },
    function(err, entries) {
    if (!entries) {
      return res.status(404).json({
        message: 'Entries not found.',
      });
    }
    res.json(entries);
  });
});

/* POST entry */
router.post('/', User.isLinguist, function(req, res, next) {
  var entry = new Dictionary({
    lang: req.body.lang,
    val: req.body.val,
    type: req.body.type,
    ipa: req.body.ipa,
    definitions: req.body.definitions,
    declension: req.body.declension,
    conjugation: req.body.conjugation,
    transcription: req.body.transcription,
    related: req.body.related,
    author: req.user._id,
  });
  entry.save(function(err) {
    if (err) { return res.status(500).json({ error: err }); }
    res.json({
      message: 'entry created',
    });
  });
});

/* PUT entry */
router.put('/:id', User.isLinguist, function(req, res, next) {
  Dictionary.findByIdAndUpdate(req.params.id, req.body,
    function(err, doc) {
      if (err) { return res.status(500).json({ error: err }); }
      res.json({
        message: 'entry updated',
      });
    });
});

/* DELETE entry */
router.delete('/:id', User.isAdmin, function(req, res, next) {
  Dictionary.remove({ _id: req.params.id }, function(err) {
    res.json({
      message: 'entry #' + req.params.id + ' has been removed.',
    });
  });
});

module.exports = router;
