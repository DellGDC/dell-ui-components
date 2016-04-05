angular.module('demo').controller('GuideCtrl',function($scope, $rootScope, $state){

    var init = function (componentId) {
        if (componentId) {
            $scope.componentGuideUrl = "components/" + componentId + "/demo-guide-" + componentId + ".html";
        }
    };
    init($state.params.componentId);

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        init(toParams.componentId);
    });

});