angular.module('dellUi').directive('dellUiSiteMasthead', function(messages) {
	return {
		restrict: 'A',
		replace: true,
		scope: {

		},
		templateUrl: 'app/shared/masthead/masthead.html',
		link: function(scope, element, attrs, fn) {
			scope.version = messages.version;

		}
	};
});
