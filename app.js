'use strict';

require('dotenv').config({silent: true});
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var promise = require('bluebird');
mongoose.promise = promise;
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var dictionary = require('./routes/dictionary');
var articles = require('./routes/articles');
var categories = require('./routes/categories');

var i18n = require ('./utils/i18n.js');

var app = express();

var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user.js');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, function(req, email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false);
      }
      user.comparePassword(password, function(err, isMatch) {
        if (!isMatch) { return done(null, false); }
        return done(null, user);
      });
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findOne({ _id: id}, function(err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', function() {
  console.log(
    'MongoDB Connection Error. Please make sure that MongoDB is running.'
  );
  process.exit(1);
});

// View engine setup
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/articles'),
  path.join(__dirname, 'views/dictionary'),
  path.join(__dirname, 'views/users'),
]);
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', routes);
app.use('/api/users', users);
app.use('/api/dictionary', dictionary);
app.use('/api/articles', articles);
app.use('/api/categories', categories);

app.locals.i18n = i18n;
app.locals.version = require('./package.json').version;

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  var error = app.get('env') === 'development' ? err : {};
  console.log(error);
  res.render('error', {
    status: res.status,
    message: err.message,
    error: error,
    user: req.user,
  });
});

module.exports = app;
