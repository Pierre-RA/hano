'use strict';

function parseLinks(text) {
  var result = '';
  result = text.replace(/\[art:([^\]]+)\]/g, '<a href="/articles/$1">$1</a>');
  result =
    result.replace(/\[dic:([^\]]+)\]/g, '<a href="/dictionary/$1">$1</a>');
  return result;
}

function parseWutopian(text) {
  return text.replace(/\[wut:([^\]]+)\]/g, function(str, p1) {
    if (p1) {
      p1 = p1.replace(/rr\b/g, '-');
      return '<span class="wutopian">' + p1 + '</span>';
    }
  });
}

function parseNardanskh(text) {
  return text.replace(/\[wut:([^\]]+)\]/g, function(str, p1) {
    if (p1) {
      p1 = p1.replace(/rr\b/g, '-');
      return '<span class="nardanskh">' + p1 + '</span>';
    }
  });
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
    $scope.alerts = [];
    $scope.update = function() {
      var append = $scope.article.url ? '/' + $scope.article.id : '';
      $http({
        method: $attrs.method,
        url: '/api/articles' + append,
        data: $scope.article,
      }).then(function() {
        $scope.alerts.push({
          type: 'success', msg: 'Article has been created.',
        });
      }, function(err) {
        console.log(err);
      });
    };
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
    $scope.reset = function() {
      $scope.article = {};
    };
    $scope.loadTags = function(query) {
      return $http.get('/api/categories?query=' + query);
    };
  })
  .controller('ArticleController', function($scope, $attrs, $http, $location) {
    $scope.alerts = [];
    $http.get('/api/articles/' + $attrs.url).success(function(data) {
      $scope.article = data;
    });
    $scope.form = false;
    $scope.delete = function(id, page) {
      if (!confirm('Do you really want to remove this article?')) {
        return;
      }
      $http({
        method: 'delete',
        url: '/api/articles/' + id,
      }).then(function() {
        $location.path('/articles');
      }, function(err) {
        $scope.alerts.push({
          type: 'danger', msg: 'Couldn\'t delete this article. ' +
            'An error has occured',
        });
        console.log(err);
      });
    };
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  })
  .controller('UserController', function($scope, $attrs, $http) {
    $http.get('/api/users/' + $attrs.url).success(function(data) {
      $scope.user = data;
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
    $scope.alerts = [];
    $scope.success = false;
    $scope.failure = false;
    var url = $attrs.url === '*' ? '' : $attrs.url;
    $scope.title = url || 'dictionary';

    $scope.load = function() {
      var page = $scope.currentPage;
      $http.get('/api/dictionary/count')
        .then(res => {
          $scope.totalItems = res.data.count;
          return $http.get('/api/dictionary/' + url + '?page=' + page);
        })
        .then(function(res) {
          $scope.entries = res.data;
          $scope.currentPage = page;
          $scope.maxSize = res.data.length;
        }, function(err) {
          $scope.alerts.push({
            type: 'danger', msg: 'Couldn\'t load these entries. ' +
              'An error has occured',
          });
          console.log(err);
        });
    };

    $scope.currentPage = $scope.currentPage || 1;
    $scope.$watch('currentPage', function() {
      $scope.load();
    });

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.prepend = function(row) {
      row = 0 || row;
      $scope.entries[row].definitions = $scope.entries[row].definitions || [];
      $scope.entries[row].definitions.push({});
    };

    $scope.update = function(index, id) {
      if (id) {
        var entry = $scope.entries[index];
        $http({
          method: 'put',
          url: '/api/dictionary/' + id,
          data: entry,
        }).then(function() {
          $scope.alerts.push({
            type: 'success', msg: 'Entry has been updated.',
          });
        }, function(err) {
          $scope.alerts.push({
            type: 'danger', msg: 'Couldn\'t update this entry. ' +
              'An error has occured',
          });
          console.log(err);
        });
      } else {
        $http({
          method: 'post',
          url: '/api/dictionary',
          data: $scope.entry,
        }).then(function() {
          $scope.alerts.push({
            type: 'success', msg: 'Entry has been added.',
          });
        }, function(err) {
          $scope.alerts.push({
            type: 'danger', msg: 'Couldn\'t create this entry. ' +
              'An error has occured',
          });
          console.log(err);
        });
      }
    };

    $scope.delete = function(id, page) {
      if (!confirm('Do you really want to remove this entry?')) {
        return;
      }
      $http({
        method: 'delete',
        url: '/api/dictionary/' + id,
      }).then(function() {
        $scope.entries[id];
        $scope.load(page);
      }, function(err) {
        $scope.alerts.push({
          type: 'danger', msg: 'Couldn\'t delete this entry. ' +
            'An error has occured',
        });
        console.log(err);
      });
    };
  })
  .filter('outputResult', function() {
    return function(x) {
      if (x) {
        return x.replace(/rr\b/, '-');
      }
    };
  })
  .filter('parseLinks', function() {
    return function(text) {
      if (text) {
        return parseLinks(text);
      }
    };
  })
  .filter('extract', function() {
    return function(value) {
      if (!angular.isString(value)) {
        return value;
      }

      var dots = '';
      if (value.length > 200) {
        dots = '...';
      }

      return value.slice(0, 200) + dots;
    };
  });
