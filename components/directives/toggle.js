angular.module('dellUiComponents').directive('toggle', function () {
    return {
        restrict: 'A',
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
                    });
                    break;
                case "tab":
                    $(element).on('click', function (event) {
                        event.preventDefault();
                        $(this).tab('show');
                        console.log($(this).parents('.row-offcanvas').html());
                        $(this).parents('.row-offcanvas').find('.tab-content').addClass('active');
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
                    });
                    break;
                case "list-truncated":
                    var target = attributes.target;
                    if (!target) {
                        target = $(element).prev();
                    }



                        if($(target).find("li").length < 4) {
                            $(element).hide();
                        } else {
                            var maxHeight = 0, minHeight = 0;
                            setTimeout(function() {
                            _.each($(target).find("li"), function(listItem,index){
                                if(index < 5) {
                                    minHeight = minHeight + $(listItem).height();
                                }
                                maxHeight = maxHeight + $(listItem).height();

                            }, 2000);
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


                            //var height = minHeight;
                            //    if($(element).hasClass('collapsed')) {
                            //        height = maxHeight;
                            //    }
                            //    $(element).toggleClass('collapsed');
                            //    $(target).animate({
                            //        height: height
                            //    }, {
                            //        duration: 300,
                            //        specialEasing: {
                            //            height: "swing"
                            //        }
                            //    });
                            //});
                        }

                    break;
            }
        }
    };
});
