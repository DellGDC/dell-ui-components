(function($){
    $.dellUIuniversalFooter = function(el,options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("dellUIuniversalFooter", base);
    };
    $.dellUIuniversalFooter.defaultOptions = {
        xsMax: 750,
        smMin: 751,
        smMax: 975,
        mdMin: 974,
        mdMax: 1141,
        dosomething: ""
    };
    $.fn.dellUIuniversalFooter = function(options){
        if(options) {
            $.dellUIuniversalFooter.defaultOptions = $.extend($.dellUIuniversalFooter.defaultOptions, options);
        }
        return this.each(function(){
            (new $.dellUIuniversalFooter(this));
            var options = $.dellUIuniversalFooter.defaultOptions,
            element = $(this),
            containerWidth = element.parent().width(),
            breakpoint = function() {
                var window_size = $(window).width(),
                    breakpoint = {
                        isXS: false,
                        isSM: false,
                        isMD: false,
                        isLG: false
                    };
                switch(true) {
                    case (window_size < options.xsMax):
                        breakpoint.isXS = true;
                        break;
                    case (window_size > options.smMin && window_size < options.smMax):
                        breakpoint.isSM = true;
                        break;
                    case (window_size > options.mdMin && window_size < options.mdMax):
                        breakpoint.isMD = true;
                        break;
                    default:
                        breakpoint.isLG = true;
                        break;
                }
                return breakpoint;
            },
            responsiveElements = function(){
                if(breakpoint().isXS) {
                    $('.footer-gallery').css('display', 'none');
                    $('.gallery-shadow-section').css('display', 'none');
                } else {
                    $('.footer-gallery').css('display', 'block');
                    $('.gallery-shadow-section').css('display', 'block');
                }
            },
            equalizeRows = function() {
                setTimeout (function() {
                    $('.gallery-item').removeAttr('style');
                    var eObj = {
                        highest: 0,
                        columns: $('.gallery-item')
                    };
                    eObj.columns.each(function () {
                        var currColumnHeight = $(this).outerHeight();
                        if (currColumnHeight > eObj.highest) {
                            eObj.highest = currColumnHeight;
                        }
                    });
                    eObj.columns.height(eObj.highest);
                }, 800);
            };
            equalizeRows();
            responsiveElements();
            $(window).resize(function() {
                equalizeRows();
                responsiveElements();
            });
        });
    };

})(jQuery);
