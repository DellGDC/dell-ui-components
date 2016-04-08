
angular.module('demo').controller('bannerCtrl',function($scope,$rootScope,$timeout) {
	//this is for functionality related to demo code
	$scope.initOptions = function() {
		$(".jumbotron a>p+p").hide();
		$(".jumbotron h5").removeClass('visible-lg').hide();

		$('[name="bannerOptions"]').on('click',function(){
			console.log($(this).val());
			switch($(this).val()) {
				case 'eventTitle': 
				$(".jumbotron h5").addClass('visible-lg').show();
				$(".jumbotron a>p+p").hide();
				break;
				case 'legal':
				$(".jumbotron h5").removeClass('visible-lg').hide();
				$(".jumbotron a>p+p").show();	
				break;
				default:
				$(".jumbotron a>p+p").hide();
				$(".jumbotron h5").removeClass('visible-lg').hide();		
			}
		});

	};
});

angular.module('demo').controller('bannerPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code


});