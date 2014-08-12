angular.module('DellDesignLibrary').directive('masthead', function(messages) {
	return {
		restrict: 'A',
		replace: true,
		scope: {

		},
		templateUrl: 'site_files/shared/masthead/masthead.html',
		link: function(scope, element, attrs, fn) {
			scope.version = messages.version;

		}
	};
});
