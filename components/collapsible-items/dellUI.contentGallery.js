(function($){
    $.dellUIcontentGallery = function(el){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("dellUIcontentGallery", base);

    };

    $.fn.dellUIcontentGallery = function(){

        return this.each(function(){
            (new $.dellUIcontentGallery(this));
            var element = $(this),
                allListItems = element.find('li'),
                showMoreToggle = element.find('.content-gallery-show-more'),
                initGallery = function() {
                    showMoreToggle.on('click',function(e){
                        var parentLi = $($(e.currentTarget).parents('li')[0]),
                            rowWidth= 0,
                            rowMaxWidth = Math.abs(element.parent().innerWidth() - element.parent().css('padding-left').replace(/px/,'') - element.parent().css('padding-right').replace(/px/,'')),
                            targetFound,
                            targetIndex,
                            done,
                            content;
                        if(parentLi.hasClass('open')){
                            element.find('li.details-container').attr('display', 'none').slideUp(250).delay(200).queue(function() {
                                $(this).remove();
                            });
                            element.find('.open').removeClass('open');
                        } else {
                            element.find('li.details-container').attr('display', 'none').slideUp(250).delay(200).queue(function() {
                                $(this).remove();
                            });
                            element.find('.open').removeClass('open');

                            setTimeout(function(){
                                parentLi.addClass('open');
                                $.each(allListItems, function (index, i) {
                                    if (!done) {
                                        var itemWidth = $(i).outerWidth();
                                        if (!targetFound) {
                                            targetFound = $(i).hasClass('open');
                                            targetIndex = index;
                                            content = '<li class="col-xs-12 details-container"><div class="gallery"><span class="close"><button type="button" class="close">×</button></span>' + $(i).find('.content-gallery-details').html() + '</div></li>';
                                        }

                                        rowWidth = rowWidth + itemWidth;

                                        if (rowWidth >= rowMaxWidth || index === allListItems.length -1) {

                                            if (targetFound) {

                                                $(i).after(content);

                                                element.find('.details-container').attr('display', 'block').slideDown(450);

                                                element.find('.details-container .close').on('click', function(e){
                                                    e.preventDefault();
                                                    element.find('li.details-container').attr('display', 'none').slideUp(450).delay(500).queue(function() {
                                                        $(this).remove();
                                                    });
                                                    element.find('.open').removeClass('open');
                                                });

                                                element.find('.details-container').on('click', function(e) {
                                                    e.stopPropagation();
                                                });

                                                done = true;
                                            } else {
                                                rowWidth = 0;
                                            }
                                        }
                                    }
                                });
                            }, 100);
                        }
                    });
                };

            initGallery();

        });
    };

})(jQuery);

// code below only is to help these render in WordPress

(function($){

    $('[data-target="#truncated-list-sample"] .show-collapsed, [data-target="#truncated-list-sample-expand"] .show-collapsed').click(function(e){
        $(e.currentTarget).parents('.equalize').height('auto');
    });

})(jQuery);
