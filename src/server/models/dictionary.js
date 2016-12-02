'use strict';

var mongoose = require('mongoose');
var promise = require('bluebird');
mongoose.promise = promise;
var Schema = mongoose.Schema;

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
};

var dictionarySchema = new mongoose.Schema({
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
  related: [ String ],
  author: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, schemaOptions);

var Dictionary = mongoose.model('Dictionary', dictionarySchema);

module.exports = Dictionary;
