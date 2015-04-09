
angular.module('demo').controller('alertsCtrl',function($scope,$rootScope) {
	//this is for functionality related to demo code

})
.directive('alertCollapsible', function () {
	return {
		restrict: 'C',
		link: function ($scope, $element, $attrs) {
			//toggle x
			$element.find('.close').on('click',function(){
				$(event.currentTarget).parent().addClass('collapsed');
			});
			$element.find('> .show-collapsed').on('click',function(){
				$(event.currentTarget).parent().removeClass('collapsed');
								console.log("hello",$(event.currentTarget).parent());

			});
		}
	};
})

angular.module('demo').controller('alertsPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});