var services = angular.module('devpad.services', []);

services.factory('devpad', function($http) {
  return {
    callRedditAPI: function() {

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
        return base + subreddits + jsonCallback;
      }

      return $http.jsonp(formatRedditUrl());
    }
  };
});

