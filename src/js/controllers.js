var controllers = angular.module('devpad.controllers', ['ngSanitize']);

// Controller for any functionality specific to post list
controllers.controller('postsListControl', function($scope, $sanitize, $sce, $http, devpad) {
  // Gets data from various developer sources.
  var getData = {
    // Contains all data collection/manipulation functions.
    init: function() {
      // Collect & manipulate Reddit API data.
      getData.reddit();
      // Collect & manipulate Hacker News API data.
      getData.hackerNews();
      // Collect & manipulate Twitter API data.
      getData.twitter();
    },

    reddit: function() {
      // Return a promise on a Reddit service call.
      devpad.callRedditAPI().then(function(data) {
        // Add placeholder image urls where images are not available.
        function checkThumbnailURLs() {
          // Create a reference to the sorted posts.
          var sortedRedditPosts = utilities.sortOrder(data.data.data.children);
          // For each post in sorted posts.
          for (var i = 0; i < sortedRedditPosts.length; i++) {
            // Store a reference to the current posts image URL.
            var imgURL = sortedRedditPosts[i].data.thumbnail;
            // If there is no valid URL in the current post
            if (imgURL === 'self' || imgURL === 'default' || imgURL === 'nsfw' || imgURL === '') {
              // Give it a valid URL to the placeholder image.
              sortedRedditPosts[i].data.thumbnail = './dist/img/reddit.svg';
            }
          }
          console.log(sortedRedditPosts);
          // Return all posts sorted by number of upvotes and with valid thumbnail image URLs.
          return sortedRedditPosts;
        }
        // Binds newly formatted and sorted results to the posts $scope
        $scope.posts = checkThumbnailURLs();
      });
    },

    hackerNews: function() {
      // ...todo
    },

    twitter: function() {
      // ...todo
    }
  };

  getData.init();

  // Utility Functions.
  var utilities = {
    init: function() {
      utilities.postExpansion();
    },

    sortOrder: function(postData) {
      // Sort reddit posts...
      postData.sort(
        function(a, b) {
          // ...by number of upvotes.
          return parseFloat(b.data.score) - parseFloat(a.data.score);
        }
      );
      // Return all posts sorted by number of upvotes.
      return postData;
    },

    postExpansion: function() {
      $scope.expand = function(post) {
         post.show = !post.show;
      };
    }
  };

  utilities.init();
});

