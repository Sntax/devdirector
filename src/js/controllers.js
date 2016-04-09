var controllers = angular.module('devpad.controllers', ['ngSanitize']);

// Controller for any functionality specific to post list
controllers.controller('postsListControl', function($scope, $sanitize, $sce, $http, devpad) {

  var redditPosts;

  $scope.reddit = function(after) {
    console.log('Reddit Call: ' + after);
    // Return a promise on a Reddit service call.
    devpad.callRedditAPI(after).then(
      function(data) {
        // Set pagination variable.
        $scope.after = data.data.data.after;
        // Binds newly formatted and sorted results to the posts $scope
        $scope.posts = $scope.updateThumbnails(data);
      }
    );
  };

  // Add placeholder image urls where images are not available.
  $scope.updateThumbnails = function(data) {
    // Create a reference to the sorted posts.
    redditPosts = data.data.data.children;
    console.log(redditPosts);
    // For each post in sorted posts.
    for (var i = 0; i < redditPosts.length; i++) {
      // Store a reference to the current posts image URL.
      var imgURL = redditPosts[i].data.thumbnail;
      // If there is no valid URL in the current post
      if (imgURL === 'self' || imgURL === 'default' || imgURL === 'nsfw' || imgURL === '') {
        // Give it a valid URL to the placeholder image.
        redditPosts[i].data.thumbnail = './dist/img/reddit.svg';
      }
    }
    // Return all posts sorted by number of upvotes and with valid thumbnail image URLs.if (redditPosts) {
     return redditPosts;
  };

  $scope.expand = function(post) {
    post.show = !post.show;
  };

  $scope.reddit();
});

