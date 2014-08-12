'use strict';

/* Design Library Directives */


angular.module('sherpaApp.desLibDirectives', []).
  directive('blankDirective', ['blankDirective', function() {
    return function($scope, $element, $attr) {
      $element.text("hello blankDirective");
    };
  }])