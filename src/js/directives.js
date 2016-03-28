var directives = angular.module('devpad.directives', []);

directives.directive('preview', function() {
  return {
    restrict: 'E',
    template:'<p>{{ post.data.selftext_html }}</p>'
  };
});
