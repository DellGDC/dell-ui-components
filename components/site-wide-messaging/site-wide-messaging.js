angular.module('dellUiComponents')
    .directive('siteWideMessaging', function(){
        return {
            restrict: 'C',
            link: function($scope, $element, $attributes, controller) {
                var options = {};

                if($attributes.datafile) {
                    options.datafile = $attributes.datafile;
                }
                if ($( window ).resize) {
                    $element.dellUIsiteWideMessaging(options);
                }
            }
        };
    });
