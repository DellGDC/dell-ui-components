(function($){
    $.dellUIloadMore = function(el,options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("dellUIloadMore", base);

    };

    $.dellUIloadMore.defaultOptions = {
        lazyLoad: false,
        scrollTarget: window,
        fadeIn: true,
        loadMoreButtonText: "Load more",
        loadMoreIncrement: 5
    };


    $.fn.dellUIloadMore = function(options){

        if(options) {
            $.dellUIloadMore.defaultOptions = $.extend($.dellUIloadMore.defaultOptions, options);
        }

        return this.each(function(){
            (new $.dellUIloadMore(this));
            var options = $.dellUIloadMore.defaultOptions,
                element = $(this),
                visibleCount = 0,
                items = element.find('li'),
                elementId = typeof $(this).attr('id') !== 'undefined' ? $(this).attr('id') : Math.random(1 + Math.random()*(100000000000)),
                button = '<p><button id="load-more-button-'+elementId+'" rel="'+elementId+'" type="button" class="btn btn-block">'+options.loadMoreButtonText+'</button></p>',
                loadMore = function() {
                    visibleCount = visibleCount + options.loadMoreIncrement;
                    items = element.find('li');
                    items.each(function(index){
                        if(index < visibleCount && $(items[index]).is(":hidden")) {

                            $(this).addClass('in');
                            if(index + 1 === items.length) {
                                $('#load-more-button-'+elementId).remove();
                            }
                        }
                    });
                },
                initPagination = function() {
                    if(element.hasClass('load-more-lazy')) {
                        options.lazyLoad = true;
                    }
                    if(options.fadeIn) {
                        items.addClass('fade');
                    }

                    loadMore();
                    if(!options.lazyLoad) {
                        element.after(button);
                        $('#load-more-button-'+elementId).click(function(){
                            loadMore();
                        });
                    } else {
                        if(options.scrollTarget === window) {
                            $(options.scrollTarget).scroll(function() {
                                if($(options.scrollTarget).scrollTop() + $(options.scrollTarget).height() === $(document).height()) {
                                    loadMore();
                                }
                            });
                        } else {
                            $(options.scrollTarget).scroll(function(){
                                if($(this).scrollTop() + $(this).height() === $(this)[0].scrollHeight) {
                                    loadMore();
                                }
                            });
                        }
                    }
                };

            initPagination();

        });
    };

})(jQuery);
