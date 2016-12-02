'use strict';

var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var promise = require('bluebird');
mongoose.promise = promise;

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
};

var userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  admin: { type: Boolean, default: false },
  editor: { type: Boolean, default: false },
  linguist: { type: Boolean, default: false },
  passwordResetToken: String,
  passwordResetExpires: Date,
}, schemaOptions);

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.statics.isLogged = function isLogged(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/sign-in');
};

userSchema.statics.isAdmin = function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
    return next();
  }

  res.redirect('/sign-in');
};

userSchema.statics.isEditor = function isEditor(req, res, next) {
  if (req.isAuthenticated() && (req.user.admin || req.user.editor)) {
    return next();
  }

  res.redirect('/sign-in');
};

userSchema.statics.isLinguist = function isLinguist(req, res, next) {
  if (req.isAuthenticated() && (req.user.admin || req.user.linguist)) {
    return next();
  }

  res.redirect('/sign-in');
};

userSchema.statics.isOwn = function isLinguist(req, res, next) {
  if (req.isAuthenticated() &&
    (req.user.admin || req.user._id === req.params.id)) {
    return next();
  }

  res.redirect('/sign-in');
};

userSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    cb(err, isMatch);
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
