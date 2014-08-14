angular.module('dellUiSite').controller('IconsCtrl',function($scope, utils){
    $scope.icons = [];
    utils.getJSON("app/data/icons.json",function(data){
		$scope.icons = data;
    });
    $scope.textColors = [];
    utils.getJSON("app/data/text-colors.json",function(data){
		$scope.textColors = data;
    });

});