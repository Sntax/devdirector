var controllers = angular.module('devpad.controllers', []);

// Application level controller for any global functionality. 
controllers.controller('appControl', function($scope) {
});

// Controller for any functionality specific to post list
controllers.controller('postsListControl', function($scope, $http, $sce, devpad) {

  function init() {
    redditData();
  }

  init();

  function redditData() {
    devpad.reddit().then(function(data) {

      console.log(data);

      // Sorts results by number of "upvotes" or "points"
      function sortResults() {
        // Create a new Array to store results from API
        var results = data.data.data.children;
        // Sorting function.
        results.sort(
          function(a, b) {
            return parseFloat(b.data.ups) - parseFloat(a.data.ups);
          }
        );
        return results;
      }
      // Binds newly formatted and sorted results to the posts $scope
      $scope.posts = sortResults();
    });
  }
});
