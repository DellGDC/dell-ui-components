angular.module('dellUiComponents').directive('scroll', function() {
    return {
        restrict: 'C',
        link: function($scope, $element, $attr, fn) {
            $element.click(function(event){
                event.preventDefault();
                $.scrollTo($attr.href,300,  {axis:'y'});
            });

        }
    };
});
