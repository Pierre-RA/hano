'use strict';

var mysql = require('mysql');
var squel = require('squel');
var connection = mysql.createConnection(process.env.JAWSDB_URL);

module.exports = {
  clean: function(callback) {
    var query = 'DROP TABLE IF EXISTS users';
    connection.query(query, callback);
  },

  init: function(callback) {
    var query = 'CREATE TABLE IF NOT EXISTS users (' +
      'id char(36) NOT NULL, ' +
      // 'status char(36), ' +
      'username TEXT, ' +
      'email TEXT, ' +
      'password TEXT ' +
      'PRIMARY KEY (id)' +
      '); ' +
      'CREATE TABLE IF NOT EXISTS entries (' +
      'id char(36) NOT NULL, ' +
      'author char(36) NOT NULL, ' +
      'lang char(36) NOT NULL, ' +
      'val TEXT NOT NULL' +
      'type TEXT NOT NULL' +
      'api TEXT NOT NULL' +
      'definitions TEXT, ' +
      'PRIMARY KEY (id)' +
      '); ' +
      'CREATE TABLE IF NOT EXISTS dictionary (' +
      'id char(36) NOT NULL, ' +
      'author char(36), ' +
      'content TEXT, ' +
      'PRIMARY KEY (id)' +
      '); ';
    connection.query(query, callback);
  },

  uuid: function(callback) {
    var query = 'SELECT replace(uuid(),\'-\',\'\') AS uuid';
    connection.query(query, callback);
  },

  create: function(table, object, callback) {
    var query = squel.insert()
      .into(table)
      .setFields(object)
      .toString();
    connection.query(query, callback);
  },

  findOne: function(table, id, callback) {
    var query = squel.select()
      .from(table)
      .where('id = \'' + id + '\'')
      .limit('1')
      .toString();
    connection.query(query, function(err, rows, fields) {
      callback(err, rows[0]);
    });
  },

  search: function(table, key, val, callback) {
    var query = squel.select()
      .from(table)
      .where(key + ' = \'' + val + '\'')
      .toString();
    connection.query(query, callback);
  },

  update: function(table, object, callback) {
    if (!object.id) {
      return callback(new Error('There is no id.'));
    }
    var query = squel.update()
      .table(table)
      .setFields(object)
      .where('id = ?', object.id)
      .toString();
    connection.query(query, callback);
  },

  delete: function(table, id, callback) {
    var query = squel.delete()
      .from(table)
      .where('id = ?', id)
      .toString();
    connection.query(query, callback);
  },

  count: function(table, callback) {
    var query = squel.select()
      .from(table)
      .field('count(*)', 'count')
      .toString();
    connection.query(query, callback);
  },

  user: {
    create: function(user, callback) {
      module.exports.create('users', user, callback);
    },

    findOne: function(id, callback) {
      module.exports.findOne('users', id, callback);
    },

    search: function(key, val, callback) {
      module.exports.search('users', key, val, callback);
    },

    update: function(id, user, callback) {
      module.exports.update('users', user, callback);
    },

    delete: function(id, callback) {
      module.exports.delete('users', id, callback);
    },

    count: function(callback) {
      module.exports.count('users', callback);
    },
  },

  dictionary: {
    create: function(user, callback) {
      module.exports.create('dictionary', user, callback);
    },

    findOne: function(id, callback) {
      module.exports.findOne('dictionary', id, callback);
    },

    search: function(key, val, callback) {
      module.exports.search('dictionary', key, val, callback);
    },

    update: function(id, user, callback) {
      module.exports.update('dictionary', user, callback);
    },

    delete: function(id, callback) {
      module.exports.delete('dictionary', id, callback);
    },

    count: function(callback) {
      module.exports.count('dictionary', callback);
    },
  },

  entries: {
    create: function(user, callback) {
      module.exports.create('entries', user, callback);
    },

    findOne: function(id, callback) {
      module.exports.findOne('entries', id, callback);
    },

    search: function(key, val, callback) {
      module.exports.search('entries', key, val, callback);
    },

    update: function(id, user, callback) {
      module.exports.update('entries', user, callback);
    },

    delete: function(id, callback) {
      module.exports.delete('entries', id, callback);
    },

    count: function(callback) {
      module.exports.count('entries', callback);
    },
  },
};
