
angular.module('demo').controller('carouselCtrl',function($scope,$rootScope) {
	//this is for functionality related to demo code


})

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


//
//angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition'])
//    .controller('CarouselController', function($scope, $timeout, $transition, $q) {})
//    .directive('carousel', function($timeout) {
//        // Runs during compile
//        return {
//            restrict: "C",
//            link: function($scope, iElm, iAttrs, controller) {
//                $timeout(function() {
//                    $(iElm).carousel();
//                });
//            }
//        };
//    });

angular.module('demo').controller('carouselPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});
