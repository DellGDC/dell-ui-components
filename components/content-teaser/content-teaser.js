angular.module('dellUiComponents')

    .directive('contentMatchHeight', function() {
	return {
		restrict: 'ACE',
		link: function($scope, $element, attrs,  $state, $timeout, fn, viewport, window ) {

            $($element).matchHeight({
                byRow: true,
                property: 'height',
                target: null,
                remove: false
            });

		}
	};
});

