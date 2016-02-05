angular.module('dellUiComponents').directive('scroll', function() {
    return {
        restrict: 'C',
        link: function($scope, $element, $attr, fn) {
            $element.click(function(event){
                //console.log("hello")
                event.preventDefault();
                $.scrollTo($attr.href,300,  {axis:'y'});
            });

        }
    };
});
