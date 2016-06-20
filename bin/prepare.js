'use strict';

var prompt = require('prompt');
var mongoose = require('mongoose');
var slug = require('slug');
var User = require('../models/user.js');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', function() {
  console.log(
    'MongoDB Connection Error. Please make sure that MongoDB is running.'
  );
  process.exit(1);
});

var schema = {
  properties: {
    name: {
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Name must be only letters, spaces, or dashes',
      required: true,
    },
    email: {
      required: true,
    },
    password: {
      hidden: true,
    },
  }
};
prompt.start();
prompt.get(schema, function(err, result) {
  var user = new User({
    name: result.name,
    email: result.email,
    password: result.password,
    url: slug(result.name),
    admin: true,
    editor: true,
    linguist: true,
  });
  user.save(function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log('admin user ' + result.name + ' has been created.');
      process.exit(0);
    }
  });
});
