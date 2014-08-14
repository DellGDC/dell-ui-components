angular.module('dellUiSite').controller('CarouselCtrl', function($scope) {


});

//TODO for now we need to turn off the angular.ui.bootrap directive
angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition'])
    .controller('CarouselController', function($scope, $timeout, $transition, $q) {})
    .directive('carousel', function($timeout) {
        // Runs during compile
        return {
            restrict: "C",
            link: function($scope, iElm, iAttrs, controller) {
                $timeout(function() {
                    $(iElm).carousel();
                });
            }
        };
    });