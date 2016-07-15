'use strict';

var chai = require('chai');
var slug = require('slug');
var should = chai.should();
var http = require('chai-http');
chai.use(http);
// TODO: rehabilitate
// var app = require('../../app.js');
// TODO: white line
// describe('Test server', function() {
//   describe('users', function() {
//     var name = 'Test McTest';
//     var slugged = slug(name);
//     it('should create', function(done) {
//       chai.request(app)
//         .post('/api/users')
//         .send({
//           name: name,
//           email: 'pierre@anthillsolutions.ch',
//           password: 'some-password',
//         })
//         .end(function(err, res) {
//           should.not.exist(err);
//           res.should.have.status(200);
//           res.body.should.have.property('message');
//           done();
//         });
//     });
//     it('should find, update, delete', function(done) {
//       chai.request(app)
//         .get('/api/users/' + slugged)
//         .end(function(err, res) {
//           should.not.exist(err);
//           res.should.have.status(200);
//           res.body.should.have.property('_id');
//           chai.request(app)
//             .put('/api/users/' + res.body._id)
//             .send({
//               name: name + 's',
//             })
//             .end(function(errIn, resIn) {
//               should.not.exist(errIn);
//               resIn.should.have.status(200);
//               resIn.body.should.have.property('message');
//               chai.request(app)
//                 .delete('/api/users/' + res.body._id)
//                 .end(function(errIn2, resIn2) {
//                   should.not.exist(errIn2);
//                   resIn2.should.have.status(200);
//                   resIn2.body.should.have.property('message');
//                   done();
//                 });
//             });
//         });
//     });
//   });
// TODO: white line
//   describe('articles', function() {
//     var name = 'Article McTest';
//     var slugged = slug(name);
//     it('should create', function(done) {
//       chai.request(app)
//         .post('/api/articles')
//         .send({
//           title: name,
//           content: '##mirkwanurr',
//           categories: ['alma', 'mohn', 'asael'],
//         })
//         .end(function(err, res) {
//           should.not.exist(err);
//           res.should.have.status(200);
//           res.body.should.have.property('message');
//           done();
//         });
//     });
//     it('should find, update, delete', function(done) {
//       chai.request(app)
//         .get('/api/articles/' + slugged)
//         .end(function(err, res) {
//           should.not.exist(err);
//           res.should.have.status(200);
//           res.body.should.have.property('_id');
//           chai.request(app)
//             .put('/api/articles/' + res.body._id)
//             .send({
//               content: '\nnew line',
//             })
//             .end(function(errIn, resIn) {
//               should.not.exist(errIn);
//               resIn.should.have.status(200);
//               resIn.body.should.have.property('message');
//               chai.request(app)
//                 .delete('/api/articles/' + res.body._id)
//                 .end(function(errIn2, resIn2) {
//                   should.not.exist(errIn2);
//                   resIn2.should.have.status(200);
//                   resIn2.body.should.have.property('message');
//                   done();
//                 });
//             });
//         });
//     });
//   });
// TODO: white line
//   describe('categories', function() {
//     it('should get all categories', function(done) {
//       chai.request(app)
//         .get('/api/categories/')
//         .end(function(err, res) {
//           should.not.exist(err);
//           res.should.have.status(200);
//           done();
//         });
//     });
//     it('should get some categories', function(done) {
//       chai.request(app)
//         .get('/api/categories/')
//         .query({q: 'a'})
//         .end(function(err, res) {
//           should.not.exist(err);
//           res.should.have.status(200);
//           done();
//         });
//     });
//   });
// TODO: white line
//   describe('dictionary', function() {
//     var name = 'Tesþorr';
//     it('should create', function(done) {
//       chai.request(app)
//         .post('/api/dictionary')
//         .send({
//           lang: 'wu',
//           val: name,
//           transcription: name,
//           type: 'nom commun',
//           ipa: 'majko',
//           definitions: [{
//             def: 'matière',
//             note: 'inconnu',
//             comment: 'ie. mako',
//           }, {
//             def: 'terre',
//           },],
//         })
//         .end(function(err, res) {
//           should.not.exist(err);
//           res.should.have.status(200);
//           res.body.should.have.property('message');
//           done();
//         });
//     });
//     it('should find, update, delete', function(done) {
//       chai.request(app)
//         .get('/api/dictionary/' + name)
//         .end(function(err, res) {
//           should.not.exist(err);
//           res.should.have.status(200);
//           res.body.should.be.an('array');
//           res.body[0].should.have.property('_id');
//           chai.request(app)
//             .put('/api/dictionary/' + res.body[0]._id)
//             .send({
//               content: '\nnew line',
//             })
//             .end(function(errIn, resIn) {
//               should.not.exist(errIn);
//               resIn.should.have.status(200);
//               resIn.body.should.have.property('message');
//               chai.request(app)
//                 .delete('/api/dictionary/' + res.body[0]._id)
//                 .end(function(errIn2, resIn2) {
//                   should.not.exist(errIn2);
//                   resIn2.should.have.status(200);
//                   resIn2.body.should.have.property('message');
//                   done();
//                 });
//             });
//         });
//     });
//   });
// });
