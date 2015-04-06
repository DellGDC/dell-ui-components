//asumes that angular-ui-bootstrap is loaded
angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition'])
    .controller('CarouselController', function ($scope, $timeout, $transition, $q) {})
    .directive('carousel', function() { return {};})
    .directive('slide', function() { return {};});


angular.module('dellUiComponents')
.directive('carousel', function($timeout){
	// Runs during compile
	return {
		restrict: 'C',
		link: function($scope, $element, iAttrs, controller) {
			$element.carousel();
		}
	};
})

.directive('filmstripCarousel', function($timeout){
    // Runs during compile
    return {
        restrict: 'AC',
        link: function($scope, $element, iAttrs, controller) {
            $($element).slick({
                dots: true,
                speed: 500
            });
        }
    };
})

.directive('slide', function($timeout){
	// Runs during compile
	return {
		restrict: 'A',
		link: function($scope, $element, $attr, controller) {
			$element.on('click', function(event) {
				event.preventDefault();
			});
			$element.carousel($attr.slide);
		}
	};
});
