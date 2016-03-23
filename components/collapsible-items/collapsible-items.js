angular.module('dellUiComponents')
    .directive('contentGallery', function($timeout,$rootScope){
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller ) {
                $element.dellUIcontentGallery();
            }
        };
    });