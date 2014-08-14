angular.module('dellUi').directive('dellUiSiteMasthead', function($rootScope) {
	return {
		restrict: 'A',
		replace: true,
		scope: true,
		templateUrl: 'app/shared/masthead/masthead.html',
		link: function(scope, element, attrs, fn) {
			scope.version = $rootScope.messages.version;
		}
	};
});
