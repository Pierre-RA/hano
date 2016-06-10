'use strict';

var mongoose = require('mongoose');

var dictionarySchema = new mongoose.Schema({
  created: Date,
  lastModified: {
    type: Date,
    default: Date.now,
  },
  lang: String,
  val: String,
  type: String,
  ipa: String,
  definitions: [{
    def: String,
    note: String,
    comment: String,
  }],
  declension: String,
  conjugation: String,
  transcription: String,
  related: [],
});

var Dictionary = mongoose.model('Dictionary', dictionarySchema);

module.exports = Dictionary;
