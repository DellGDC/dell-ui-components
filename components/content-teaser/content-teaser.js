angular.module('dellUiComponents').directive('contentCard', function() {
	return {
		restrict: 'ACE',
		link: function($scope, element, attrs,  $state, $timeout, fn, viewport, window ) {

            $(".view-all").delay(2500).fadeIn();

		}
	};
});

