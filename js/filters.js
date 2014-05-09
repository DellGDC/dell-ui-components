'use strict';

/* Filters */

angular.module('sherpaApp.desLibFilters', [])
  .filter('blankFilter', function() {
    //TODO this has a dependency on underscore string so we will have to put in requirejs define here eventually
    // Examples: 
    // Simple {{ string_variable | _.str: 'capitalize' }}
    // multiple {{ string_variable | _.str: 'capitalize,titleize' }}
    // This filter does not work with parameters - such as _.str.prune("whatever string",10)

    return function(str, fn, params) {
      return str;
    };
  });
