/**
 * Created by Clint_Batte on 5/18/2015.
 */


angular.module('dellUiComponents')

    .directive('interactiveProgressBar', function($timeout) {
        return {
            restrict: 'C',
            link: function ($scope, $element, iAttrs, controller) {
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

                console.log('hello timeout');
                $scope.resetFakeAnimation = function() {
                    $scope.fakeAnimationValue = 0;
                    $scope.fakeAnimation();
                    $scope.stripeAnimate = "active";
                };

            }
        };

    });





