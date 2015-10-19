angular.module('dellUiComponents')
    .directive('navTabs', function($rootScope){
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller, transcludeFn) {

                var containerWidth = $element.parent().width(),
                    tabObjs = $element.find('> li'),
                    totalWidth = 0;
                    _.each(tabObjs, function(t,index){
                        totalWidth = totalWidth + $(t).width() +1;
                    });
                if(totalWidth > containerWidth) {
                    $element.dellUIoverflowTab({
                        iconClasses: {
                            left: "icon-ui-arrowleft",
                            right: "icon-ui-arrowright"
                        }
                    });
                }
            }
        };
    });
