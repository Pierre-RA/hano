'use strict';

var mysql = require('mysql');
var squel = require('squel');
var connection = mysql.createConnection(process.env.JAWSDB_URL);

module.exports = {
  clean: function(callback) {
    var query = 'DROP TABLE IF EXISTS users, entries, articles, definitions';
    connection.query(query, callback);
  },

  init: function(callback) {
    var query1 = 'CREATE TABLE IF NOT EXISTS users (' +
      module.exports.users.columns.id + ' char(36) NOT NULL, ' +
      module.exports.users.columns.username + ' TEXT, ' +
      module.exports.users.columns.email + '  TEXT, ' +
      module.exports.users.columns.password + ' TEXT, ' +
      'PRIMARY KEY (' + module.exports.users.columns.id + ')' +
      ')';
    var query2 = 'CREATE TABLE IF NOT EXISTS entries (' +
      module.exports.entries.columns.id + ' char(36) NOT NULL, ' +
      module.exports.entries.columns.author + ' char(36) NOT NULL, ' +
      module.exports.entries.columns.lang + ' char(36) NOT NULL, ' +
      module.exports.entries.columns.val + ' TEXT NOT NULL, ' +
      module.exports.entries.columns.type + ' TEXT NOT NULL, ' +
      module.exports.entries.columns.ipa + ' TEXT NOT NULL, ' +
      module.exports.entries.columns.definitions + ' TEXT, ' +
      'PRIMARY KEY (' + module.exports.entries.columns.id + ')' +
      ')';
    var query3 = 'CREATE TABLE IF NOT EXISTS articles (' +
      module.exports.articles.columns.id + ' char(36) NOT NULL, ' +
      module.exports.articles.columns.author + ' char(36), ' +
      module.exports.articles.columns.url + ' varchar(150), ' +
      module.exports.articles.columns.title + ' TEXT NOT NULL, ' +
      module.exports.articles.columns.content + ' TEXT, ' +
      'UNIQUE KEY (' + module.exports.articles.columns.url + '), ' +
      'PRIMARY KEY (' + module.exports.articles.columns.id + ')' +
      ')';
    var query4 = 'CREATE TABLE IF NOT EXISTS definitions (' +
      module.exports.definitions.columns.id + ' char(36) NOT NULL, ' +
      module.exports.definitions.columns.entry + ' char(36) NOT NULL, ' +
      module.exports.definitions.columns.author + ' char(36) NOT NULL, ' +
      module.exports.definitions.columns.position + ' INT(2) NOT NULL, ' +
      module.exports.definitions.columns.def + ' TEXT, ' +
      module.exports.definitions.columns.note + ' TEXT, ' +
      'PRIMARY KEY (' + module.exports.definitions.columns.id + ')' +
      ')';
    // VERBOSE
    // console.log(query1);
    // console.log(query2);
    // console.log(query3);
    // console.log(query4);
    connection.query(query1, function(err) {
      if (err) { return callback(err); }
      connection.query(query2, function(err) {
        if (err) { return callback(err); }
        connection.query(query3, function(err) {
          if (err) { return callback(err); }
          connection.query(query4, function(err) {
            if (err) { return callback(err); }
            callback();
          });
        });
      });
    });
  },

  uuid: function(callback) {
    var query = 'SELECT uuid() AS uuid';
    connection.query(query, callback);
  },

  create: function(table, object, callback) {
    var query = squel.insert()
      .into(table)
      .setFields(object)
      .toString();
    connection.query(query, callback);
  },

  findOne: function(table, key, val, callback) {
    var query = squel.select()
      .from(table)
      .where(key + ' = \'' + val + '\'')
      .limit('1')
      .toString();
    connection.query(query, function(err, rows, fields) {
      if (rows.length === 1) {
        callback(err, rows[0]);
      } else {
        err = err || new Error('Nothing has been found.');
        callback(err);
      }
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
  users: {
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

    update: function(user, callback) {
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

  entries: {
    columns: {
      id: 'id',
      author: 'author',
      lang: 'lang',
      val: 'val',
      type: 'type',
      ipa: 'ipa',
      definitions: 'definitions',
    },

    create: function(entry, callback) {
      module.exports.create('entries', entry, callback);
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

    update: function(entry, callback) {
      module.exports.update('entries', entry, callback);
    },

    delete: function(id, callback) {
      module.exports.delete('entries', id, callback);
    },

    count: function(callback) {
      module.exports.count('entries', callback);
    },
  },

  articles: {
    columns: {
      id: 'id',
      author: 'author',
      url: 'url',
      title: 'title',
      content: 'content',
    },

    create: function(article, callback) {
      module.exports.create('articles', article, callback);
    },

    find: function(key, val, callback) {
      module.exports.find('articles', key, val, callback);
    },

    findOne: function(url, callback) {
      module.exports.findOne('articles', 'url', url, callback);
    },

    search: function(key, val, callback) {
      module.exports.search('articles', key, val, callback);
    },

    update: function(article, callback) {
      module.exports.update('articles', article, callback);
    },

    delete: function(id, callback) {
      module.exports.delete('articles', id, callback);
    },

    count: function(callback) {
      module.exports.count('articles', callback);
    },
  },

  definitions: {
    columns: {
      id: 'id',
      entry: 'entry',
      author: 'author',
      position: 'position',
      def: 'def',
      note: 'note',
    },

    create: function(definition, callback) {
      module.exports.create('definitions', definition, callback);
    },

    find: function(key, val, callback) {
      module.exports.find('definitions', key, val, callback);
    },

    findOne: function(id, callback) {
      module.exports.findOne('definitions', id, callback);
    },

    search: function(key, val, callback) {
      module.exports.search('definitions', key, val, callback);
    },

    update: function(id, definition, callback) {
      module.exports.update('definitions', definition, callback);
    },

    delete: function(id, callback) {
      module.exports.delete('definitions', id, callback);
    },

    count: function(callback) {
      module.exports.count('definitions', callback);
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
