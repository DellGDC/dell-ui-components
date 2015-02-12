angular.module('demo').controller('PlayCtrl',function($scope,$rootScope,$state){


    var init = function (componentId) {
        if (componentId) {
            $scope.componentPlayUrl = "components/" + componentId + "/demo-play-" + componentId + ".html";
            $rootScope.activeComponent = _.find($rootScope.components, function (c) {
                return c.id === componentId;
            });
        }
    };
    init($state.params.componentId);

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        init(toParams.componentId);
    });

});