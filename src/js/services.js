var services = angular.module('devdirector.services', []);

services.factory('devdirector', function($http) {
  return {
    callRedditAPI: function(forward, before, after) {
      function formatRedditUrl() {
        var base = 'http://www.reddit.com/r/';
        var subredditsArray = [
          'accessibility',
          'web_design',
          'javascript',
          'angularjs',
          'usability',
          'frontend',
          'webdev',
          'html',
          'css'
        ];
        var subreddits = subredditsArray.join('+');
        var jsonCallback = '.json?&jsonp=JSON_CALLBACK';
        var maxCount = '&count=25';
        var formattedURL = base + subreddits + jsonCallback + maxCount;

        if (forward === true) {
          return formattedURL + '&after=' + after;
        } else if (forward === false) {
          return formattedURL + '&before=' + before;
        } else {
          return formattedURL;
        }
      }
      return $http.jsonp(formatRedditUrl());
    }
  };
});
