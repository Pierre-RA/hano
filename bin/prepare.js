'use strict';

var database = require('../utils/database.js');
database.clean(function(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  database.init(function(err) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log('done.');
    process.exit(0);
  });
});
