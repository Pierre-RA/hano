'use strict';

var mysql = require('mysql');
var squel = require('squel');
var connection = mysql.createConnection(process.env.JAWSDB_URL);

module.exports = {
  clean: function(callback) {
    var query = 'DROP TABLE IF EXISTS users, entries, dictionary';
    connection.query(query, callback);
  },

  init: function(callback) {
    var query1 = 'CREATE TABLE IF NOT EXISTS users (' +
      module.exports.user.id + ' char(36) NOT NULL, ' +
      module.exports.user.username + ' TEXT, ' +
      module.exports.user.email + '  TEXT, ' +
      module.exports.user.password + ' TEXT, ' +
      'PRIMARY KEY (' + module.exports.user.id + ')' +
      ')';
    var query2 = 'CREATE TABLE IF NOT EXISTS entries (' +
      module.exports.entries.id + ' char(36) NOT NULL, ' +
      module.exports.entries.author + ' char(36) NOT NULL, ' +
      module.exports.entries.lang + ' char(36) NOT NULL, ' +
      module.exports.entries.val + ' TEXT NOT NULL, ' +
      module.exports.entries.type + ' TEXT NOT NULL, ' +
      module.exports.entries.ipa + ' TEXT NOT NULL, ' +
      module.exports.entries.definitions + ' TEXT, ' +
      'PRIMARY KEY (' + module.exports.entries.id + ')' +
      ')';
    var query3 = 'CREATE TABLE IF NOT EXISTS dictionary (' +
      module.exports.dictionary.id + ' char(36) NOT NULL, ' +
      module.exports.dictionary.author + ' char(36), ' +
      module.exports.dictionary.content + ' TEXT, ' +
      'PRIMARY KEY (' + module.exports.dictionary.id + ')' +
      ')';
    connection.query(query1, function(err) {
      if (err) { return callback(err); }
      connection.query(query2, function(err) {
        if (err) { return callback(err); }
        connection.query(query3, function(err) {
          if (err) { return callback(err); }
          callback();
        });
      });
    });
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

  find: function(table, key, val, callback) {
    var query = squel.select()
      .from(table)
      .where(key + ' = \'' + val + '\'')
      .toString();
    connection.query(query, callback);
  },

  search: function(table, key, val, callback) {
    var query = squel.select()
      .from(table)
      .where(key + ' LIKE \'%' + val + '%\'')
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

  /* USER */
  user: {
    columns: {
      id: 'id',
      username: 'username',
      email: 'email',
    },

    create: function(user, callback) {
      var cleaned = module.exports.strip('user', user);
      module.exports.create('users', cleaned, callback);
    },

    findOne: function(id, callback) {
      module.exports.findOne('users', id, callback);
    },

    find: function(key, val, callback) {
      module.exports.find('users', key, val, callback);
    },

    search: function(key, val, callback) {
      module.exports.search('users', key, val, callback);
    },

    update: function(id, user, callback) {
      var cleaned = module.exports.strip('user', user);
      module.exports.update('users', cleaned, callback);
    },

    delete: function(id, callback) {
      module.exports.delete('users', id, callback);
    },

    count: function(callback) {
      module.exports.count('users', callback);
    },
  },

  dictionary: {
    columns: {
      id: 'id',
      author: 'author',
      lang: 'lang',
      val: 'val',
      type: 'type',
      ipa: 'ipa',
      definitions: 'definitions',
    },

    create: function(user, callback) {
      module.exports.create('dictionary', user, callback);
    },

    find: function(key, val, callback) {
      module.exports.find('dictionary', key, val, callback);
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
    columns: {
      id: 'id',
      author: 'author',
      content: 'content',
    },

    create: function(user, callback) {
      module.exports.create('entries', user, callback);
    },

    find: function(key, val, callback) {
      module.exports.find('entries', key, val, callback);
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

  strip: function(type, array) {
    var res = {};
    var cols = Object.keys(module.exports[type].columns);

    for (var i = 0; i < cols.length; i++) {
      if (array[cols[i]]) {
        res[cols[i]] = array[cols[i]];
      }
    }
    return res;
  },
};
