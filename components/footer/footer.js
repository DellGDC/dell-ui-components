angular.module('dellUiComponents')
    .directive('universalFooter', function(){
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller) {
                if ($( window ).resize) {
                    $element.dellUIuniversalFooter({

                    });
                }
            }
        };
    });
