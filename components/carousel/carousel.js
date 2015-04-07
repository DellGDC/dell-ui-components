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

            $('.variable-width').slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                centerMode: true,
                variableWidth: true
            });
        }
    };
})

.directive('responsiveFilmstrip', function($timeout){
    // Runs during compile
    return {
        restrict: 'AC',
        link: function($scope, $element, iAttrs, controller) {
            $('.responsive-filmstrip').slick({
                dots: true,
                infinite: false,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 4,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            });
        }
    };
})

//.directive('variableWidth', function($timeout){
//    // Runs during compile
//    return {
//        restrict: 'AC',
//        link: function($scope, $element, iAttrs, controller) {
//            $('.variable-width').slick({
//                dots: true,
//                infinite: true,
//                speed: 300,
//                slidesToShow: 1,
//                centerMode: true,
//                variableWidth: true
//            });
//        }
//    };
//})


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
