'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var slug = require('slug');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
};

var articleSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  title: String,
  content: String,
  categories: [ String ],
  era: {
    start: String,
    end: String,
  },
  author: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, schemaOptions);

articleSchema.pre('save', function(next) {
  var article = this;
  if (!article.isModified('url')) { return next(); }
  article.url = slug(article.title);
  next();
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
