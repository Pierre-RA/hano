'use strict';

var express = require('express');
var slug = require('slug');
var router = express.Router();
var User = require('../models/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) { return res.status(500).json({ error: err }); }
    res.json(users);
  });
});

/* GET user */
router.get('/:url', function(req, res, next) {
  User.findOne({ url: req.params.url }, function(err, user) {
    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }
    res.json(user);
  });
});

/* POST user */
router.post('/', User.isAdmin, function(req, res, next) {
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    url: slug(req.body.name),
  });
  user.save(function(err) {
    if (err) { return res.status(500).json({ error: err }); }
    res.json({
      message: 'user created',
    });
  });
});

/* PUT user */
router.put('/:id', User.isOwn, function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body,
    function(err, doc) {
      if (err) { return res.status(500).json({ error: err }); }
      res.json({
        message: 'user updated',
      });
    });
});

/* DELETE user */
router.delete('/:id', User.isOwn, function(req, res, next) {
  User.remove({ _id: req.params.id }, function(err) {
    res.json({
      message: 'user #' + req.params.id + ' has been removed.',
    });
  });
});

module.exports = router;
