var controllers = angular.module('devpad.controllers', []);

// Application level controller for any global functionality. 
controllers.controller('appControl', function($scope) {
});

// Controller for any functionality specific to post list
controllers.controller('postsListControl', function($scope, $sce, $http, devpad) {

  var getData = {

    init: function() {
      getData.reddit();
    },

    reddit: function() {
      devpad.redditAPI().then(function(data) {
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

        // Add placeholder image urls where images are not available.
        function finalData() {

          var sortedResults = sortResults();

          for (var i = 0; i<sortedResults.length; i++) {

            var imgURL = sortedResults[i].data.thumbnail;

            if (imgURL === 'self' || imgURL === 'default' || imgURL === '') {
              sortedResults[i].data.thumbnail = '/img/reddit.svg';
            }
          }

          return sortedResults;
        }

        // Binds newly formatted and sorted results to the posts $scope
        $scope.posts = finalData();
      });
    }
  };
  getData.init();
});
