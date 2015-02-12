angular.module('demo').controller('HomeCtrl',function($scope,$rootScope,$http,$state,$timeout){

    $rootScope.activeComponent = "";
    $rootScope.pageType = "demo";
    var init;
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
            init = function (componentId) {
                console.log("activeComponent>>>",componentId);
                if (componentId) {
                    $rootScope.componentDemoUrl = "components/" + componentId + "/demo-" + componentId + ".html";
                    $rootScope.componentPlayUrl = "components/" + componentId + "/demo-play-" + componentId + ".html";
                    console.log("componentId>>>",componentId);
                    $rootScope.activeComponent = _.find($rootScope.components, function (c) {
                        return c.id === componentId;
                    });

                }
                $timeout(function(){
                    $rootScope.pageType = $state.params.typeId;
                });

            };
            init($state.params.componentId);

        });





    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        init(toParams.componentId);
    });


});