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
                widthLeftToTheRight,
                widthOfVisibleTabs = $element.parent().width()-58,// <== CHANGED THIS to (29 * 2) for subtracting arrow buttons, was 60
                widthOfPartiallyHiddenTab,
                homePosition = 29,
                offsetTotal = 29,
                leftPosition = 29,
                isHome = false,
                isTooFar = false,
                leftMostTab = {},
                nextTab,
                maxTabHeight = 42,
                changeHeight,
                initTabs = function() {

                    _.each(tabObjs, function(t,index){
                        totalWidth = totalWidth + $(t).width() +1;
                        var tObj = {
                            index: index,
                            label: _.str.clean($(t).text()),
                            offset: offsetTotal,
                            width: $(t).width(),
                            height: $(t).height(),
                            visibility: 1
                        };
                       
                        if(tabObjs.length === index + 1) {
                           // console.log("offset total",offsetTotal, totalWidth, tObj);
                        } else {
                            offsetTotal = offsetTotal - tObj.width - 1;
                        }
                        if(tObj.height > maxTabHeight) {
                           maxTabHeight = tObj.height;
                        }


                       // console.log(leftPosition,$element.css("left"));

                        if(totalWidth < containerWidth) {
                            visibleIndex = index;
                           // widthOfVisibleTabs = widthOfVisibleTabs + $(t).width() + 1;
                        }
                        tabs.push(tObj);
                    });    

                },
                slideIt = function(backDirection,tabInContext) {

                    var indexOffset = 1,
                        isToofar;

                    if(backDirection) {
                        indexOffset = -1;
                    }

                    leftPosition = parseInt($element.css('left'));


                    if(!leftMostTab) {
                        leftMostTab = tabs[0];
                    }

                    isHome = homePosition === leftPosition;



                    if(backDirection) {
                        leftMostTab.visibility = 1;
                    } else {
                        leftMostTab.visibility = 0;
                    }

                    leftMostTab = tabs[leftMostTab.index + indexOffset];


                    widthLeftToTheRight = _.reduce(
                        _.pluck(
                            _.filter(tabs, function(tb){
                                return tb.visibility === 1;
                            }),'width'
                        ),
                        function(memo, num){
                            return memo + num;
                        },
                    0);

                    if (isToofar) {
                        isToofar = false;
                    } else if(tabInContext) {
                        if(tabInContext.lastTab) {
                            isToofar = true;
                        }
                    } else {
                        isToofar = widthLeftToTheRight < containerWidth;
                    }

                    if(leftMostTab) {
                        if(isToofar) {
                            leftPosition = (containerWidth - totalWidth) - 29;
                            $element.parent().find('> .next').addClass('disabled');

                        } else {
                            console.log("MADE IT HERE");
                            $element.parent().find('> .next').removeClass('disabled');
                            leftPosition = leftMostTab.offset;
                        }
                        if(tabInContext && !isToofar){
                            //if this the last tab on the right do nothing different
                            if(tabInContext.index !== tabs.length-1) {
                                //not the last tab on the right need to adjust the left offset
                                leftPosition = tabInContext.tabContainerWidth - tabInContext.rightMostPoint -60 ;
                                console.log("need to adjust leftMostTab ",tabInContext.tabContainerWidth - tabInContext.rightMostPoint - 60);
                            }
                        }
                        $element.css('left',leftPosition + "px");
                    } else {
                        isHome = true;
                    }

                    if(isHome) {
                        $element.parent().find('> .prev').addClass('disabled');
                    } else {
                        $element.parent().find('> .prev').removeClass('disabled');
                    }

                };

                initTabs();
                
                leftMostTab = tabs[0];
                
                $scope.isOverflow = totalWidth > containerWidth;

                if($scope.isOverflow) {

                    //need to set up for xs breakpoint

                    $element.width(totalWidth+200);
                    $element.css("left", "29px");

                    $element.parent().addClass('nav-tabs-overflow-container');
                    $element.before('<div class="prev disabled"><a href="javascript:;"><i class="icon-ui-arrowleft"></i></a></div>');
                    $element.after('<div class="next"><a href="javascript:;"><i class="icon-ui-arrowright"></i></a></div>');
                    
                    changeHeight = function(h){
                        if(h) {
                            $element.css("height", (h+2)+"px");
                            $element.find("> li").find("a").css("height", h+"px");
                            $element.parent().find(".prev,.next").find("a").css("height", (h)+"px");
                            $element.parent().find(".prev,.next").find("a").css("padding-top", (h/2 - 8)+"px");                            
                        } else {
                            $element.removeAttr("style").width(totalWidth+200);
                            $element.find("> li").find("a").removeAttr("style");
                            $element.parent().find(".prev,.next").find("a").removeAttr("style");  
                        }
                    };

                    if(maxTabHeight > 42 && !$rootScope.bp.isXS) {
                        changeHeight(maxTabHeight);
                    } else {
                        changeHeight();
                    }
                    $rootScope.$watch('bp', function(bp){
                        if(bp.isXS) {
                            changeHeight();
                        } else {
                            changeHeight(maxTabHeight);
                        }
                    });

                    tabObjs.on('click',function(e){
                        var t = {
                                self: e.currentTarget,
                                rightMostPoint: e.currentTarget.offsetLeft + e.currentTarget.offsetWidth,
                                leftMostPoint: e.currentTarget.offsetLeft + e.currentTarget.offsetWidth - $(e.currentTarget).width() - 2,
                                tabContainerWidth: $(e.currentTarget).parents('.nav-tabs-overflow-container').width(),
                                tabContainerOffset: $(e.currentTarget).parent()[0].offsetLeft,
                                index: $(e.currentTarget).index()
                            };
                            console.log("tab clicked",t);

                        if((t.tabContainerWidth - t.rightMostPoint) - t.tabContainerOffset < 30) {
                            
                            if(t.index === tabs.length-1) {
                                // last tab, make sure it is not already at the end
                                if(t.rightMostPoint + t.tabContainerOffset + 28 < t.tabContainerWidth) {
                                    slideIt(false,t); 
                                } else if(t.rightMostPoint + t.tabContainerOffset + 28 > t.tabContainerWidth) {
                                    t.lastTab = true; //let slide function that it is the last tab
                                    slideIt(false,t); 
                                } //otherwise if it is right on the last spot dont slide it
                            } else {
                              slideIt(false,t);  
                            }
                        } else if(t.leftMostPoint + t.tabContainerOffset < 0) {
                            console.log("should slide backwards ", t);
                            slideIt(true);  
                        }
                    });
                    $element.parent().find('> .prev').on('click',function(e){
                        //console.log("prev click happened");
                        if(!$(e.currentTarget).hasClass('disabled')) {
                            slideIt(true);
                        }

                    });
                    $element.parent().find('> .next').on('click',function(e){

                        if(!$(e.currentTarget).hasClass('disabled')) {
                            slideIt();
                        }

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
