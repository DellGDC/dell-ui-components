angular.module('dellUiTest').controller('TestPageCtrl',function($scope, utils){

    $scope.components = [];
    utils.getJSON("app/data/components.json",function(data){
		_.each(data, function(c, index){
			c.url = "app/demo-components/"+c.id+"/"+c.id+".html";
			$scope.components[index] = c;
		});
    });

});