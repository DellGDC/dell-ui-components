angular.module('dellUiComponents').directive('toggle', function ($rootScope,$timeout) {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attrs, controller) {
            switch ($attrs.toggle) {
                case "popover":
                    var hidePopover = function() {
                        $element.popover('hide');
                        $element.blur();
                    };
                    if ($attrs.trigger === "hover") {
                        $element.popover({
                            trigger: 'hover'
                        });
                    } else {
                        $element.popover({
                            trigger: 'manual'
                        });
                        $element.on('click',function(e){
                            $element.popover('toggle');
                        });
                        $element.on('shown.bs.popover', function () {


                            $element.next().off('click');
                            $element.next().on('click', function(e){
                                $element.focus();
                            });

                            $('[data-dismiss="popover"]').on('click', function(){
                                $timeout(function(){
                                    $element.blur();
                                },100);
                            });


                            $element.off('blur');
                            $element.on('blur', function(){
                                $timeout(function(){
                                    if(!$element.is(':focus')) {
                                        hidePopover();
                                    }
                                },300);
                            });
                        });
                        $element.on('hidden.bs.popover', function () {
                            $element.on('click', function(){
                                $element.popover('show');
                            });
                        });

                    }
                    break;
                case "tooltip":
                    $element.tooltip();
                    $element.on("click",function(){
                        if($rootScope.bp.isXS){
                            $element.tooltip('show');
                        }
                    });
                    $element.on("mouseenter",function(){
                        if($rootScope.bp.isXS){
                            $element.tooltip('hide');
                        }
                    });
                    break;
                case "offcanvas":
                    $element.on('click', function (event) {
                        event.preventDefault();
                        $element.parents('.row-offcanvas').find('.tab-content').removeClass('active');
                        $element.parents('.row-offcanvas').removeClass('active');
                    });
                    break;
                case "tab":
                    $element.on('click', function (event) {
                        event.preventDefault();
                        $(this).tab('show');
                        $(this).parents('.row-offcanvas').find('.tab-content').addClass('active');
                        $(this).parents('.row-offcanvas').addClass('active');
                    });
                    break;
                case "collapse":
                    $element.on('click', function (event) {
                        event.preventDefault();
                    });
                    break;
                case "load-more":
                    var selector = $attrs.target,
                        size_li = $(selector + " li").size(),
                        x=3;
                    if (!selector) {
                        console.error('You must use data-target when using data-toggle="load-more". ');
                    }

                    $(selector + ' li:lt('+x+')').show();
                    $element.click(function () {
                        x= (x+5 <= size_li) ? x+5 : size_li;
                        $(selector + ' li:lt('+x+')').fadeIn(1500);
                        if ($(selector  + " li:visible").size() === size_li) {
                            $element.hide();
                        }
                        var $this = $(this);
                        $this.button('loading');
                        setTimeout(function() {
                            $this.button('reset');
                        }, 1500);
                    });
                    break;
                case "list-truncated":
                    var target = $attrs.target;
                    if (!target) {
                        target = $element.prev();
                    }

                    if($(target).find("li").length <= 5) {
                        $element.hide();
                    } else {
                        var maxHeight = 0, minHeight = 0;
                        _.each($(target).find("li"), function(listItem,index){
                            if(index < 5) {
                                minHeight = minHeight + $(listItem).height();
                            }
                            maxHeight = maxHeight + $(listItem).height();
                        });

                        $(target).height(minHeight);
                        $element.on('click', function(){
                            var height = minHeight;
                            if($element.hasClass('collapsed')) {
                                height = maxHeight;
                            }
                            $element.toggleClass('collapsed');
                            $(target).animate({
                                height: height
                            }, {
                                duration: 300,
                                specialEasing: {
                                    height: "swing"
                                }
                            });
                        });
                    }
                    break;
            }
        }
    };
});
