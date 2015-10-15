angular.module('dellUiComponents')
    .directive('navTabs', function($rootScope){
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller, transcludeFn) {
                var containerWidth = $element.parent().width(),
                    tabObjs = $element.find('> li'),
                    tabs = [],
                    totalWidth = 0,
                    widthLeftToTheRight,
                    homePosition = 29,
                    offsetTotal = 29,
                    leftPosition = 29,
                    isHome = false,
                    isTooFar = false,
                    leftMostTab = {},
                    nextTab,
                    maxTabHeight = 42,
                    changeHeight,
                    isOverflow = false,
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
                            } else {
                                offsetTotal = offsetTotal - tObj.width - 1;
                            }
                            if(tObj.height > maxTabHeight) {
                               maxTabHeight = tObj.height;
                            }
                            tabs.push(tObj);
                        });
                        leftMostTab = tabs[0];
                        isOverflow = totalWidth > containerWidth;
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
                                leftPosition = (containerWidth - totalWidth) - homePosition;
                                $element.parent().find('> .next').addClass('disabled');

                            } else {
                                $element.parent().find('> .next').removeClass('disabled');
                                leftPosition = leftMostTab.offset;
                            }
                            if(tabInContext && !isToofar){
                                //if this the last tab on the right do nothing different
                                if(tabInContext.index !== tabs.length-1) {
                                    //not the last tab on the right need to adjust the left offset
                                    leftPosition = tabInContext.tabContainerWidth - tabInContext.rightMostPoint -60 ;
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

                if(isOverflow) {
                    $element.width(totalWidth+1); //add 1 so that it doesn't drop the last tab to a second line
                    $element.css("left", homePosition+"px"); //compensates for the left arrow that will be added

                    $element.parent().addClass('nav-tabs-overflow-container'); //css wrapper for styling
                    $element.before('<div class="prev disabled"><a href="javascript:;"><i class="icon-ui-arrowleft"></i></a></div>'); //left arrow
                    $element.after('<div class="next"><a href="javascript:;"><i class="icon-ui-arrowright"></i></a></div>'); //right arrow
                    
                    changeHeight = function(h){
                        if(h) {
                            $element.css("height", (h+2)+"px");//2 pixels account for top and bottom border
                            $element.find("> li").find("a").css("height", h+"px");
                            $element.parent().find(".prev,.next").find("a").css("height", (h)+"px");
                            $element.parent().find(".prev,.next").find("a").css("padding-top", (h/2 - 8)+"px"); //moves the arrow to center when the content pushes the height beyond default (42px)                            
                        } else {
                            //if no height is provided everything is reset.
                            $element.removeAttr("style").width(totalWidth+200); //removes height and resets width
                            $element.find("> li").find("a").removeAttr("style");//removes height
                            $element.parent().find(".prev,.next").find("a").removeAttr("style");  //removes height
                        }
                    };

                    if(maxTabHeight > 42 && !$rootScope.bp.isXS) {
                        //$rootScope.bp is part of dell-ui-components angular module
                        changeHeight(maxTabHeight);
                    } else {
                        changeHeight();
                    }

                    $rootScope.$watch('bp', function(bp){
                        if(bp.isXS) {
                            changeHeight(); //if it is mobile (xs) clear all height values
                        } else {
                            changeHeight(maxTabHeight);
                        }
                    });

                    tabObjs.on('click',function(e){
                        var t = {
                                rightMostPoint: e.currentTarget.offsetLeft + e.currentTarget.offsetWidth,
                                leftMostPoint: e.currentTarget.offsetLeft + e.currentTarget.offsetWidth - $(e.currentTarget).width() - 2,
                                tabContainerWidth: $(e.currentTarget).parents('.nav-tabs-overflow-container').width(),
                                tabContainerOffset: $(e.currentTarget).parent()[0].offsetLeft,
                                index: $(e.currentTarget).index()
                            };
                        if((t.tabContainerWidth - t.rightMostPoint) - t.tabContainerOffset < 30) {
                            if(t.index === tabs.length-1) {
                                // last tab, make sure it is not already at the end
                                if(t.rightMostPoint + t.tabContainerOffset + 28 < t.tabContainerWidth) {
                                    slideIt(false,t); //false sets it as a forward move with the tab in context
                                } else if(t.rightMostPoint + t.tabContainerOffset + 28 > t.tabContainerWidth) {
                                    t.lastTab = true; //let slide function that it is the last tab
                                    slideIt(false,t); //false sets it as a forward move with the tab in context
                                } //otherwise if it is right on the last spot dont slide it
                            } else {
                              slideIt(false,t); //false sets it as a forward move with the tab in context
                            }
                        } else if(t.leftMostPoint + t.tabContainerOffset < 0) {
                            slideIt(true);  //true sets it as a backward move
                        }
                    });
                    $element.parent().find('> .prev').on('click',function(e){
                        if(!$(e.currentTarget).hasClass('disabled')) {
                            slideIt(true);//true sets it as a backward move
                        }
                    });
                    $element.parent().find('> .next').on('click',function(e){

                        if(!$(e.currentTarget).hasClass('disabled')) {
                            slideIt(); //no argument (false) sets it as a forward move
                        }
                    });
                }
            }
        };
    });
