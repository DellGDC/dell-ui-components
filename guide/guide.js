angular.module('demo').controller('GuideCtrl',function($scope,$state){

	$scope.section = $state.params.section;

});