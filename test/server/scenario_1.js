'use strict';

var chai = require('chai');
var slug = require('slug');
var should = chai.should();
var http = require('chai-http');
chai.use(http);
var app = require('../../app.js');

var name = 'Test McTest';
var slugged = slug(name);
describe('Test server', function() {
  describe('users', function() {
    it('should create', function(done) {
      chai.request(app)
        .post('/api/users')
        .send({
          name: name,
          email: 'pierre@anthillsolutions.ch',
          password: 'some-password',
        })
        .end(function(err, res) {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.have.property('message');
          done();
        });
    });
    it('should find, update, delete', function(done) {
      chai.request(app)
        .get('/api/users/' + slugged)
        .end(function(err, res) {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.have.property('_id');
          chai.request(app)
            .put('/api/users/' + res.body._id)
            .send({
              name: name + 's',
            })
            .end(function(errIn, resIn) {
              should.not.exist(errIn);
              resIn.should.have.status(200);
              resIn.body.should.have.property('message');
              chai.request(app)
                .delete('/api/users/' + res.body._id)
                .end(function(errIn2, resIn2) {
                  should.not.exist(errIn2);
                  resIn2.should.have.status(200);
                  resIn2.body.should.have.property('message');
                  done();
                });
            });
        });
    });
  });
});
