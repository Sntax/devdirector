var services =  angular.module('devpad.services', []);

services.factory('devpad', function($http){
  return {
    callRedditAPI: function() {
      return $http.jsonp('http://www.reddit.com/r/accessibility+css+frontend+html+javascript+angularjs+usability+web_design+webdev/.json?&jsonp=JSON_CALLBACK');
    }
  };
});
