'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var dictionary = require('./routes/dictionary');
var articles = require('./routes/articles');
var categories = require('./routes/categories');

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
app.set('view engine', 'jade');

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

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'dev') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      error: JSON.stringify(err, null, 2),
      message: err.message,
    });
  });
}

// Production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
