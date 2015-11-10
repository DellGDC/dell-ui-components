angular.module('dellUiComponents')
    .directive('universalFooter', function(){
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller) {
                console.log("something");
                if ($( window ).resize) {
                    $element.dellUIuniversalFooter({
                        dosomething: "is this working"

                    });
                }

            }
        };
    });
