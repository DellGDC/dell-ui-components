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
                widthOfVisibleTabs = $element.parent().width()-60,
                widthOfPartiallyHiddenTab,
                homePosition = 29,
                offsetTotal = 29,
                leftPosition = 29,
                isHome = false,
                isTooFar = false,
                leftMostTab = {},
                nextTab;

                

                _.each(tabObjs, function(t,index){
                    totalWidth = totalWidth + $(t).width() + 1;
                    var tObj = {
                        index: index,
                        label: _.str.clean($(t).text()),
                        offset: offsetTotal,
                        width: $(t).width(),
                        visibility: 1
                    };
                    
                    if(tabObjs.length === index + 1) {
                        console.log("offset total",offsetTotal, totalWidth, tObj);
                    } else {
                        offsetTotal = offsetTotal - tObj.width - 1;
                    }

                    console.log(leftPosition,$element.css("left"));

                    if(totalWidth < containerWidth) {
                        visibleIndex = index;
                       // widthOfVisibleTabs = widthOfVisibleTabs + $(t).width() + 1;
                    }
                    tabs.push(tObj);
                });

                leftMostTab = tabs[0];

                function slideIt(backDirection) {

                    var indexOffset = 1;
                    if(backDirection) {
                        indexOffset = -1;
                        isToofar = false;
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
                    widthLeftToTheRight = widthLeftToTheRight + _.last(tabs).width;



                    isToofar = widthLeftToTheRight < containerWidth;


                    
                    if(leftMostTab) {
                        console.log(_.pluck(_.filter(tabs, function(tb){ 
                                return tb.visibility === 0; 
                            }),"label"));
                        if(isToofar) {


                            leftPosition = leftMostTab.offset+ containerWidth - widthLeftToTheRight  + 30 - tabs.length + 6;
                            console.log("leftPosition", leftPosition);

                            $element.parent().find('> .next').addClass('disabled');   
                        } else {
                            $element.parent().find('> .next').removeClass('disabled');
                            leftPosition = leftMostTab.offset;
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
                
                
                $scope.isOverflow = totalWidth > containerWidth;
                if($scope.isOverflow) {
                    $element.width(totalWidth+200);
                    $element.css("left", "29px");

                    $element.parent().addClass('nav-tabs-overflow-container');
                    $element.before('<div class="prev disabled"><a href="javascript:;"><i class="icon-ui-arrowleft"></i></a></div>');
                    $element.after('<div class="next"><a href="javascript:;"><i class="icon-ui-arrowright"></i></a></div>');

                    
                    $element.parent().find('> .prev').on('click',function(e){
                        console.log("prev click happened");
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