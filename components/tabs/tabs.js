angular.module('dellUiComponents')
    .directive('navTabs', function($rootScope){
        // runs on Bootstraps nav-tabs class to make sure the heigh
        // requires bower_components/slick-1.5.0/slick/slick.js which is bundled in dell-ui-components.js
        return {
            restrict: 'C',
/*            replace: true,
            transclude: true,
            template: '<div><div class="tabs-overflow-container" ng-if="isOverflow">'+
            '<div class="prev disabled"><a href="javascript:;"><i class="icon-ui-arrowleft"></i></a></div>'+
            '<ul ng-transclude></ul>'+
            '<div class="next"><a href="javascript:;"><i class="icon-ui-arrowright"></i></a></div>>'+
            '</div><ul ng-transclude ng-if="!isOverflow"></ul></div>',*/
            link: function($scope, $element, iAttrs, controller, transcludeFn) {
                var containerWidth = $element.parent().width(),
                tabObjs = $element.find('> li'),
                tabs = [],
                totalWidth = 0,
                visibleIndex,
                widthOfVisibleTabs = $element.parent().width()-60,
                widthOfPartiallyHiddenTab,
                homePosition = 29,
                offsetTotal = 29,
                leftPosition = 29,
                isHome = false,
                leftMostTab = {},
                nextTab;

                $element.css("left", "29px");

                _.each(tabObjs, function(t,index){
                    totalWidth = totalWidth + $(t).width() + 1;
                    var tObj = {
                        index: index,
                        offset: offsetTotal,
                        width: $(t).width(),
                        visibility: 0
                    };
                    offsetTotal = offsetTotal - tObj.width - 1;
                    console.log(leftPosition,$element.css("left"));

                    if(totalWidth < containerWidth) {
                        visibleIndex = index;
                       // widthOfVisibleTabs = widthOfVisibleTabs + $(t).width() + 1;
                    }
                    tabs.push(tObj);
                });

                leftMostTab = tabs[0];


                
                $element.width(totalWidth+200);
                $scope.isOverflow = totalWidth > containerWidth;
                if($scope.isOverflow) {
                    $element.parent().addClass('nav-tabs-overflow-container');
                    $element.before('<div class="prev disabled"><a href="javascript:;"><i class="icon-ui-arrowleft"></i></a></div>');
                    $element.after('<div class="next"><a href="javascript:;"><i class="icon-ui-arrowright"></i></a></div>');

                    function slideIt(backDirection) {

                        var indexOffset = 1;
                        if(backDirection) {
                            indexOffset = -1;
                        }

                        leftPosition = parseInt($element.css('left'));

                        console.log("bad?",totalWidth-leftMostTab.offset < widthOfVisibleTabs);


                        if(!leftMostTab) {
                            leftMostTab = tabs[0];
                        }
                        isHome = homePosition === leftPosition;

                        leftMostTab = tabs[leftMostTab.index + indexOffset];
                        if(leftMostTab) {
                            leftPosition = leftMostTab.offset;

                            $element.css('left',leftPosition + "px");
                                                      
                        } else {
                            isHome = true;
                        }

                        if(isHome) {
                            $element.parent().find('> .prev').addClass('disabled');
                        } else {
                            $element.parent().find('> .prev').removeClass('disabled');
                        }  

                    }
                    $element.parent().find('> .prev').on('click',function(){
                            console.log("prev click happened");
                            slideIt(true);

                    });
                    $element.parent().find('> .next').on('click',function(){

                        slideIt();

                        //find out which tab is left most
                       //widthOfPartiallyHiddenTab = $(tabs[visibleIndex + 1]).width();
                        //console.log("next click happened",leftPosition,widthOfPartiallyHiddenTab,widthOfVisibleTabs,containerWidth);
                    });
                }
            }
        };
    });
    /*
    .directive('rowOffcanvas', function($timeout,$rootScope){
        // Assures that when a nav item is clicked in a row-off-canvas element the element gets set to active so proper animation is rendered.
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller ) {
                console.log($rootScope.bp);
                if($rootScope.bp.isXS){
                    $element.find('[data-toggle=tab]').on("click",function(){
                        $element.toggleClass('active');
                    });
                    $element.find('[data-toggle=offcanvas]').on("click",function(){
                        $element.toggleClass('active');
                    });                    
                }
            }
        };
    })*/