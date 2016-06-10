'use strict';

var mongoose = require('mongoose');
var slug = require('slug');

var articleSchema = new mongoose.Schema({
  created: Date,
  lastModified: {
    type: Date,
    default: Date.now,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  title: String,
  content: String,
  categories: [],
  era: {
    start: String,
    end: String,
  },
});

articleSchema.pre('save', function(next) {
  var article = this;
  if (!article.isModified('url')) { return next(); }
  article.url = slug(article.title);
  next();
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
