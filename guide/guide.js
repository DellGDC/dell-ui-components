angular.module('demo').controller('GuideCtrl',function($scope,$state){

	$scope.section = $state.params.section;

}).directive('scroll', function() {
	return {
		restrict: 'C',
		link: function($scope, $element, $attr, fn) {
            $element.click(function(event){
	            event.preventDefault();
	            if($($attr.href)[0]) {
	            	$("html, body").animate({ scrollTop: $($attr.href).offset().top-72 }, 300);
	            }
			});
		}
	};
}).directive('sideBar', function() {
	return {
		restrict: 'C',
		link: function($scope, $element, $attr, fn) {
			$element.width($element.parent().width());
			$(window).resize(function(){
				$element.width($element.parent().width());
			});
		}
	};
});