
angular.module('demo').controller('dateSelectorCtrl',function($scope,$rootScope) {
	//this is for functionality related to demo code

})
.controller('DatepickerDemoCtrl', function ($scope) {
		$scope.today = function() {
			$scope.dt = new Date();
		};
		// $scope.today();

		$scope.clear = function () {
			$scope.dt = null;
		};

		// Disable weekend selection
		$scope.disabled = function(date, mode) {
			return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		};

		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};
		// $scope.toggleMin();

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		$("thead > tr > th").addClass("theader");
	});

angular.module('demo').controller('dateSelectorPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});