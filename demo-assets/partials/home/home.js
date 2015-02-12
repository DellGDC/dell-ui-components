angular.module('demo').controller('HomeCtrl',function($scope,$rootScope,$http,$state){

    $rootScope.activeComponent = "";
    $http.get('components/components-list.json').
        success(function(data) {
            $rootScope.components =[];
            _.each(data,function(component){
                var componentObj = {
                    label: _.str.titleize(component),
                    id: _.str.dasherize(component)
                };
                $rootScope.components.push(componentObj);
                if($state.params.componentId){
                    $rootScope.activeComponent = componentObj;
                }
            });
        });


    var init = function (componentId) {
        if (componentId) {
            $scope.componentDemoUrl = "components/" + componentId + "/demo-" + componentId + ".html";
            $scope.componentPlayUrl = "components/" + componentId + "/demo-play-" + componentId + ".html";
            $rootScope.activeComponent = _.find($rootScope.components, function (c) {
                return c.id === componentId;
            });
        }
        $rootScope.pageType = $state.params.typeId;
    };
    init($state.params.componentId);

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        init(toParams.componentId);
    });


});