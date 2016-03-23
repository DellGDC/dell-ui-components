angular.module('dellUiComponents').directive('toggle', function () {
    return {
        restrict: 'AC',
        link: function ($scope, element, attributes, controller) {
            switch (attributes.toggle) {
                case "popover":
                    var destroy = function () {
                        $('[data-toggle="popover"]').popover('destroy');
                    };
                    if (attributes.trigger === "hover") {

                        $(element).mouseover(function (event) {
                            event.preventDefault();
                            destroy();
                            $(this).popover('show');
                        });
                    } else {
                        $(element).popover({
                            trigger: 'manual'
                        });
                        $(element).click(function (event) {
                            event.preventDefault();
                            destroy();
                            $(this).popover('show');
                            $('[data-dismiss="popover"]').bind('click', function (event) {
                                event.preventDefault();
                                destroy();
                            });
                        });
                    }
                    break;
                case "tooltip":
                    $(element).tooltip();
                    break;
                case "offcanvas":
                    $(element).on('click', function (event) {
                        event.preventDefault();
                        $(element).parents('.row-offcanvas').find('.tab-content').removeClass('active');
                        $(element).parents('.row-offcanvas').removeClass('active');
                    });
                    break;
                case "tab":
                    $(element).on('click', function (event) {
                        event.preventDefault();
                        $(this).tab('show');
                        $(this).parents('.row-offcanvas').find('.tab-content').addClass('active');
                        $(this).parents('.row-offcanvas').addClass('active');
                    });
                    break;

                case "collapse":
                    $(element).on('click', function (event) {
                        event.preventDefault();
                    });
                    break;
                case "load-more":
                    var selector = attributes.target,
                        size_li = $(selector + " li").size(),
                        x=3;
                    if (!selector) {
                        console.error('You must use data-target when using data-toggle="load-more". ');
                    }

                    $(selector + ' li:lt('+x+')').show();
                    $(element).click(function () {
                        x= (x+5 <= size_li) ? x+5 : size_li;
                        $(selector + ' li:lt('+x+')').fadeIn(1500);
                        if ($(selector  + " li:visible").size() === size_li) {
                            $(element).hide();
                        }
                        var $this = $(this);
                        $this.button('loading');
                        setTimeout(function() {
                            $this.button('reset');
                        }, 1500);
                    });
                    break;
// -------Content Teaser------- //
                case "list-truncated":
                    var target = attributes.target;
                    if (!target) {
                        target = $(element).prev();
                    }

                        if($(target).find("li").length <= 5) {
                            $(element).hide();
                        } else {
                            var maxHeight = 0, minHeight = 0;
                            _.each($(target).find("li"), function(listItem,index){
                                if(index < 5) {
                                    minHeight = minHeight + $(listItem).height();
                                }
                                maxHeight = maxHeight + $(listItem).height();
                            });

                            $(target).height(minHeight);
                            $(element).on('click', function(){
                                var height = minHeight;
                                if($(element).hasClass('collapsed')) {
                                    height = maxHeight;
                                }
                                $(element).toggleClass('collapsed');
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

                case "div-link":
                    $(element).on('hover', function (event) {
                        //event.preventDefault();


                        //window.open($(this).find("a:first").attr("href"));
                        //console.log('im active')
                        //return false;
                    });

                    //$(".box1").click(function () {
                    //    window.open($(this).find("a:first").attr("href"));
                    //    return false;
                    //});

                     //Or use this to Open link in same window (similar to target=_blank)
                    //$(element).click(function(){
                    //    window.location = $(this).find("a:first").attr("href");
                    //    return false;
                    //});
                    //
                    //// Show URL on Mouse Hover
                    //$(element).hover(function () {
                    //    window.status = $(this).find("a:first").attr("href");
                    //    console.log('im active');
                    //}, function () {
                    //    window.status = "";
                    //});
                    break;
            }
        }
    };
});
