'use strict';

angular.module('hano', ['ui.bootstrap', 'ngTagsInput'])
  .controller('ArticleListController', function($scope, $http) {
    $http.get('/api/articles').success(function(data) {
      $scope.articles = data.articles;
      $scope.length = data.articles.length;
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
      $scope.article = data.article;
    });
    $scope.form = false;
  })
  .controller('EntryController', function($scope, $attrs, $http) {
    $scope.showEntry = !$attrs.form;
    $scope.showEdition = $attrs.form;
    $scope.entries = {};
    if ($attrs.new === 'false') {
      $http.get('/api/dictionary/' + $attrs.url)
        .then(function(data) {
          $scope.entries = data.data;
          console.log($scope.entries);
        }, function(err) {
          console.log(err);
        });
    }
    $scope.update = function(id) {
      for (var i = 0; i < $scope.entries.length; i++) {
        if ($scope.entries[i].id === id) {
          console.log($scope.entries[i]);
        }
      }
    };
  });
