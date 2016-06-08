angular.module('dellUiComponents', [])
    .directive('siteWideMessaging', function($timeout){
        return {
            restrict: 'C',
            link: function($scope, $element, $attributes, controller) {
                var options = {};

                $timeout(function(){
                    if($attributes.datafile) {
                        options.datafile = $attributes.datafile;
                    }
                    if ($( window ).resize) {
                        $element.dellUIsiteWideMessaging(options);
                    }

                },500);
            }
        };
    });
