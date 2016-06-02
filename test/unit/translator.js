'use strict';

var chai = require('chai');
var should = chai.should();
var expect = chai.expect();
var translator = require('../../utils/translator.js');

describe('Translator', function() {
  describe('parseLinks', function() {
    it('should exist', function() {
      translator.should.have.property('parseLinks');
    });
    it('should recognize format', function() {
      translator.parseLinks('[art:something]')
        .should.be.equal('<a href="/articles/something">something</a>');
      translator.parseLinks('[dic:something]')
        .should.be.equal('<a href="/dictionary/something">something</a>');
    });
    it('should recognize format', function() {
      translator.parseLinks('[art:something]lop]')
        .should.be.equal('<a href="/articles/something">something</a>lop]');
      translator.parseLinks('[dic:something]lop]')
        .should.be.equal('<a href="/dictionary/something">something</a>lop]');
    });
    it('should pass', function() {
      translator.parseLinks('[something')
        .should.be.equal('[something');
      translator.parseLinks('something')
        .should.be.equal('something');
      translator.parseLinks('something [] dfd')
        .should.be.equal('something [] dfd');
    });
    it('should parse global', function() {
      translator.parseLinks('A red [art:fox] is called a [dic:varks].')
        .should.be.equal('A red <a href="/articles/fox">fox</a> is called a ' +
        '<a href="/dictionary/varks">varks</a>.');
    });
  });
  describe('parseWutopian', function() {
    it('should exist', function() {
      translator.should.have.property('parseWutopian');
    });
    it('should recognize format', function() {
      translator.parseLinks('[wut:something]')
        .should.be.equal('<span class="wutopian">something</a>');
    });
  });
  describe('parseNardanskh', function() {
    it('should exist', function() {
      translator.should.have.property('parseNardanskh');
    });
    it('should recognize format', function() {
      translator.parseLinks('[nar:something]')
        .should.be.equal('<span class="nardanskh">something</a>');
    });
  });
});
