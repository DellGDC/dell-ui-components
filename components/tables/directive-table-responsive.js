console.log("hello there");
angular.module('dellUiComponents').directive('tableResponsive', function($timeout){
    // Runs during compile
    return {
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        link: function($scope, $element, $attrs, controller) {
        	console.log("hello");
            $element.rtResponsiveTables();
        }
    };
});
