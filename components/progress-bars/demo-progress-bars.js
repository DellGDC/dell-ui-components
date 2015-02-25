
angular.module('demo').controller('progressBarsCtrl',function($scope,$timeout,$rootScope) {
	//this is for functionality related to demo code

    $scope.fakeAnimationValue = 0;
    $scope.fakeAnimation = function() {
        $scope.fakeAnimationId = $timeout(function(){
            if($scope.fakeAnimationValue < 100) {
                $scope.fakeAnimationValue = $scope.fakeAnimationValue + 1;
                $scope.fakeAnimationSteps = Math.round($scope.fakeAnimationValue/20);
                console.log($scope.fakeAnimationValue,$scope.fakeAnimationSteps);
                $scope.stripeAnimate = "active";
                $scope.fakeAnimation();
            }
        },_.random(100,500));
    };

    $scope.pauseFakeAnimation = function() {
        $timeout.cancel($scope.fakeAnimationId);
        $scope.fakeAnimationId = undefined;
        $scope.stripeAnimate = "";
    };
    $scope.resetFakeAnimation = function() {
        $scope.fakeAnimationValue = 0;
        $scope.fakeAnimation();
        $scope.stripeAnimate = "active";
    };

});

angular.module('demo').controller('progressBarsPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});
