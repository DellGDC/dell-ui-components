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
                maxTabHeight = 42;



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
                function slideIt(backDirection,tabInContext) {

                    var indexOffset = 1;
                    if(backDirection) {
                        indexOffset = -1;
                       // isToofar = false; CHANGED THIS it wasn't resetting the variable
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

                    // CHANGED THIS because it made the last click (last tab) go past the flush point
                    //widthLeftToTheRight = widthLeftToTheRight + _.last(tabs).width;

                    //CHANGED THIS to a condition that resets isToofar to false after tabs are set flush right, otherwise the first click on previous won't work
                    if (isToofar) {
                        isToofar = false;
                    } else {
                        isToofar = widthLeftToTheRight < containerWidth;
                    }

                    if(leftMostTab) {
                        //console.log("pluck", _.pluck(_.filter(tabs, function(tb){
                        //        return tb.visibility === 0;
                        //   }),"label"));
                        //console.log("leftMostTab", leftMostTab);
                        if(isToofar) {

                            //CHANGED THIS to the simple equation I initially showed you on my whiteboard
                            // leftPosition = leftMostTab.offset + containerWidth - widthLeftToTheRight  + 29 - tabs.length + 2;
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

                }

                
                leftMostTab = tabs[0];
                var isToofar;
                $scope.isOverflow = totalWidth > containerWidth;
                if($scope.isOverflow) {



                    $element.width(totalWidth+200);
                    $element.css("left", "29px");

                    $element.parent().addClass('nav-tabs-overflow-container');
                    $element.before('<div class="prev disabled"><a href="javascript:;"><i class="icon-ui-arrowleft"></i></a></div>');
                    $element.after('<div class="next"><a href="javascript:;"><i class="icon-ui-arrowright"></i></a></div>');
                    if(maxTabHeight > 42) {
                        $element.css("height", (maxTabHeight+2)+"px");
                        $element.find("> li").find("a").css("height", maxTabHeight+"px");
                        $element.parent().find(".prev,.next").find("a").css("height", (maxTabHeight)+"px");
                        $element.parent().find(".prev,.next").find("a").css("padding-top", (maxTabHeight/2 - 8)+"px");
                    }

                    $element.find('> li').on('click',function(e){
                        var t = {
                                self: e.currentTarget,
                                rightMostPoint: e.currentTarget.offsetLeft + e.currentTarget.offsetWidth,
                                tabContainerWidth: $(e.currentTarget).parents('.nav-tabs-overflow-container').width(),
                                tabContainerOffset: $(e.currentTarget).parent()[0].offsetLeft,
                                index: $(e.currentTarget).index()
                            };

                        if((t.tabContainerWidth - t.rightMostPoint) - t.tabContainerOffset < 30) {
                            console.log("should move to the left by ", t.tabContainerOffset, (t.tabContainerWidth - t.rightMostPoint) - t.tabContainerOffset < 30, "ne value = ",(t.tabContainerWidth - t.rightMostPoint -30) - t.tabContainerOffset);
                            //$(thisTab).parent().css("left",(tabContainerWidth - rightMostPoint -30) + tabContainerOffset);
                            slideIt(false,t);
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
