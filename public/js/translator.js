'use strict';

angular.module('hano.translator', [])
  .factory('parseLinks', function(text) {
    var result = '';
    result = text.replace(/\[art:([^\]]+)\]/, '<a href="/articles/$1">$1</a>');
    result =
      result.replace(/\[dic:([^\]]+)\]/, '<a href="/dictionary/$1">$1</a>');
    return result;
  })
  .factory('parseWutopian', function(text) {
    return text.replace(/\[wut:([^\]]+)\]/, function(str, p1) {
      if (p1) {
        p1 = p1.replace(/rr\b/g, '-');
        return '<span class="wutopian">' + p1 + '</span>';
      }
    });
  })
  .factory('parseNardanskh', function(text) {
    return text.replace(/\[nar:([^\]]+)\]/,
      '<span class="nardanskh">$1</span>');
  })
  .factory('parseCalendar', function(text) {
    return text.replace(/\[ic:([^\]]+)\]/,
      '<a href="/calendar/$1">IC $1</a>');
  })
  .factory('parse', function(text) {
    // TODO: deal
    // var result = module.exports.parseLinks(text);
    // result = module.exports.parseWutopian(result);
    // result = module.exports.parseNardanskh(result);
    // result = module.exports.parseCalendar(result);
    // return result;
    return text;
  });
