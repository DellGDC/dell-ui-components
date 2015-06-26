
angular.module('demo').controller('contentTeaserCtrl',function($scope,$rootScope) {
	//this is for functionality related to demo code

    $scope.viewAll = {};
    $scope.$watch('viewAll', function( newValue ){
        console.log( newValue );
    });

});

angular.module('demo').controller('contentTeaserPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});
