angular.module('dellUiSite').directive('dellUiSiteSideBar', function(utils) {
	return {
		restrict: 'A',
		replace: true,
		scope: true,
		templateUrl: 'app/shared/side-bar/side-bar.html',
		link: function(scope, element, attrs, fn) {
			utils.getJSON("app/data/components.json", function(data){
				scope.components = data;
			});
		}
	};
});
