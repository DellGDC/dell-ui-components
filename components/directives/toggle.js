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
            }
        }
    };
});
