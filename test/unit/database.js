'use strict';

var chai = require('chai');
var should = chai.should();
var expect = chai.expect();
var database = require('../../utils/database.js');

describe('Database', function() {
  describe('main functions', function() {
    describe('strip', function() {
      it('should have property', function() {
        database.should.have.property('strip');
      });
      it('should strip nothing', function() {
        database.strip('user', {}).should.be.deep.equal({});
        database.strip('user', {id: 'idol'}).should.be.deep.equal({id: 'idol'});
      });
      it('should strip', function() {
        database.strip('user', {xhul: 'xhul'}).should.be.deep.equal({});
        database.strip('user', {xhul: 'xhul', id: 'idol'})
          .should.be.deep.equal({id: 'idol'});
        database.strip('user', {xhul: 'xhul', id: 'idol', username: 's'})
          .should.be.deep.equal({id: 'idol', username: 's'});
      });
    });
  });
});
