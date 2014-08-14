angular.module('dellUi').directive('dellUiSiteMasthead', function($rootScope, utils) {
	return {
		restrict: 'A',
		replace: true,
		scope: true,
		templateUrl: 'app/shared/masthead/masthead.html',
		link: function(scope, element, attrs, fn) {
			
			utils.getJSON("app/data/messages.json", function(data){
		        scope.version = data.version;
		    });

		}
	};
});
