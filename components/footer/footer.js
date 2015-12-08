angular.module('dellUiComponents')
    .directive('defaultFooter', function(){
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
