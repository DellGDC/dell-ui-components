angular.module('dellUiComponents').directive('equalizeHeight', function($timeout,$rootScope){
    // Runs during compile
    return {
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        link: function($scope, $element, $attrs, controller) {
            var selector = $attrs.equalizeHeight;
            if(selector) {
                $timeout(function(){
                    $(selector).matchHeight();
                },300);
            } else {
                console.error('equalize-height usage error. Must include css selector to identify objects to equalize. Example: cequalize-height=".classname"');
            }   
        }
    };
});