'use strict';

module.exports = {
  parseLinks: function(text) {
    var result = '';
    result = text.replace(/\[art:([^\]]+)\]/, '<a href="/articles/$1">$1</a>');
    result =
      result.replace(/\[dic:([^\]]+)\]/, '<a href="/dictionary/$1">$1</a>');
    return result;
  },

  parseWutopian: function(text) {
    return '<span class="wutopian">' + text + '</span>';
  },

  parseNardanskh: function(text) {
    return '<span class="nardanskh">' + text + '</span>';
  },
};
