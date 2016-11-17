'use strict';

function parseLinks(text) {
  var result = '';
  result = text.replace(/\[art:([^\]]+)\]/, '<a href="/articles/$1">$1</a>');
  result =
    result.replace(/\[dic:([^\]]+)\]/, '<a href="/dictionary/$1">$1</a>');
  return result;
}

function parseWutopian(text) {
  return text.replace(/\[wut:([^\]]+)\]/,
    '<span class="wutopian">$1</span>');
}

function parseNardanskh(text) {
  return text.replace(/\[nar:([^\]]+)\]/,
    '<span class="nardanskh">$1</span>');
}

function parseCalendar(text) {
  return text.replace(/\[ic:([^\]]+)\]/,
    '<a href="/calendar/$1">IC $1</a>');
}

function parse(text) {
  var result = parseLinks(text);
  result = parseWutopian(result);
  result = parseNardanskh(result);
  result = parseCalendar(result);
  return result;
}

angular.module('hano', [
    'ui.bootstrap',
    'ngTagsInput',
    'hc.marked',
  ])
  .config(['markedProvider', function(markedProvider) {
      markedProvider.setOptions({
        gfm: true,
        tables: true,
      });
      markedProvider.setRenderer({
        table: function(header, body) {
          return '<table class="table table-stripped">\n' +
          '<thead>\n' +
          header +
          '</thead>\n' +
          '<tbody>\n' +
          body +
          '</tbody>\n' +
          '</table>\n';
        },
        paragraph: function(text) {
          return '<p>' + parse(text) + '</p>\n';
        },
      });
    },
  ])
  .controller('ArticleListController', function($scope, $attrs, $http) {
    var query = '/api/articles';
    if ($attrs.category !== 'undefined' &&
      typeof $attrs.category === 'string') {
      query += '?q=';
      query += $attrs.category;
    }
    $http.get(query).success(function(data) {
      $scope.articles = data;
      $scope.length = data.length;
    });
  })
  .controller('ArticleFormController', function($scope, $attrs, $http) {
    $scope.update = function() {
      var append = $scope.article.url ? '/' + $scope.article.id : '';
      $http({
        method: $attrs.method,
        url: '/api/articles' + append,
        data: $scope.article,
      }).then(function() {
        console.log('success');
      }, function(err) {
        console.log(err);
      });
    };
    $scope.reset = function() {
      $scope.article = {};
    };
    $scope.loadTags = function(query) {
      return $http.get('/api/categories?query=' + query);
    };
  })
  .controller('ArticleController', function($scope, $attrs, $http) {
    $http.get('/api/articles/' + $attrs.url).success(function(data) {
      $scope.article = data;
    });
    $scope.form = false;
  })
  .controller('UserController', function($scope, $attrs, $http) {
    $http.get('/api/users/' + $attrs.url).success(function(data) {
      $scope.user = data;
      console.log($scope.user);
    });
  })
  .controller('UsersListController', function($scope, $attrs, $http) {
    $http.get('/api/users/').success(function(data) {
      $scope.users = data.users;
    });
  })
  .controller('EntryController', function($scope, $attrs, $http) {
    $scope.entries = {
      entry: {},
    };
    $scope.success = false;
    $scope.failure = false;
    var url = $attrs.url === '*' ? '' : $attrs.url;
    $scope.title = url || 'dictionary';
    $scope.load = function() {
      $http.get('/api/dictionary/' + url)
      .then(function(data) {
        $scope.entries = data.data;
      }, function(err) {
        console.log(err);
      });
    };

    $scope.prepend = function(row) {
      if (row) {
        $scope.entries[row].definitions.push({});
      } else {
        $scope.entry.definitions = [];
        $scope.entry.definitions.push({});
      }
    };

    $scope.update = function(index, id) {
      if (id) {
        var entry = $scope.entries[index];
        $http({
          method: 'put',
          url: '/api/dictionary/' + id,
          data: entry,
        }).then(function() {
          console.log('success');
        }, function(err) {
          console.log(err);
        });
      } else {
        $http({
          method: 'post',
          url: '/api/dictionary',
          data: $scope.entry,
        }).then(function() {
          console.log('success');
        }, function(err) {
          console.log(err);
        });
      }
    };

    $scope.delete = function(id) {
      $http({
        method: 'delete',
        url: '/api/dictionary/' + id,
      }).then(function() {
        $scope.entries[id];
        $scope.load();
        console.log('success');
      }, function(err) {
        console.log(err);
      });
    };
  });
