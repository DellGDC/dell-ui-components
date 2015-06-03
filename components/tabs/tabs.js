angular.module('dellUiComponents')

    .directive('divHeightEqualize', function($timeout){
        // Runs during compile
        // requires bower_components/slick-1.5.0/slick/slick.js which is bundled in dell-ui-components.js
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller ) {

                $(function() {
                    $('.tab-center-equalize').matchHeight();
                });

                $(function() {
                    $('.tab-justify-equalize').matchHeight();
                });
            }
        };
    });
