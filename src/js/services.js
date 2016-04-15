var services = angular.module('devdirector.services', []);

services.factory('devdirector', function($http) {
  return {
    callRedditAPI: function(after) {

      function formatRedditUrl(){
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
        var formattedURL;

        if (after) {
          return base + subreddits + jsonCallback + '&after=' + after;
        } else {
          return base + subreddits + jsonCallback;
        }
      }

      return $http.jsonp(formatRedditUrl());
    }
  };
});

