/**
 * Created by Clint_Batte on 8/6/2015.
 */

angular.module('dellUiComponents')

    .directive('contentGallery', function($timeout,$rootScope){
        // Runs during compile
        return {
            restrict: 'C',
            link: function($scope, $element, iAttrs, controller ) {

                $element.find('.content-gallery-show-more').on('click',function(e){
                    e.preventDefault();

                    var parentLi = $(e.currentTarget).parents('li')[0],
                        allListItems = $element.find('li'),
                        rowWidth= 0,
                        rowMaxWidth = Math.abs($element.parent().innerWidth() - $element.parent().css('padding-left').replace(/px/,'') - $element.parent().css('padding-right').replace(/px/,'')),
                        targetFound,
                        done,
                        content;
                    //bodyMinusContainer = $('body' - $element.innerWidth());

                    if ($(parentLi).hasClass('open')){
                        $element.find('li.details-container').attr('display', 'none').slideUp(250).delay(200).queue(function() {
                            $(this).remove();
                        });
                        $element.find('.open').removeClass('open');
                    } else {
                        $element.find('li.details-container').attr('display', 'none').slideUp(250).delay(200).queue(function() {
                            $(this).remove();
                        });
                        $element.find('.open').removeClass('open');

                        $timeout( function() {

                            $(parentLi).addClass('open');
                            _.each(allListItems, function (i, index) {
                                if (!done) {
                                    var itemWidth = Math.abs(($(i).css('width')).replace(/px/, ''));
                                    if (!targetFound) {
                                        targetFound = $(i).hasClass('open');
                                        content = $(i).find('.content-gallery-details').html();
                                    }

                                    rowWidth = rowWidth + itemWidth;

                                    if (rowWidth >= rowMaxWidth || index === allListItems.length -1) {

                                        if (targetFound) {
                                            console.log("Found target and inserting!!!");

                                            $(i).after('<li class="col-xs-12 details-container"><div class="gallery"><span class="close"><button type="button" class="close">×</button></span>' + content + '</div></li>');
                                            $('.details-container').attr('display', 'block').slideDown(450);

                                            $('body, li.details-container .close').on('click', function(e){
                                                e.preventDefault();
                                                $element.find('li.details-container').attr('display', 'none').slideUp(450).delay(500).queue(function() {
                                                    $(this).remove();
                                                });
                                                $element.find('.open').removeClass('open');
                                            });

                                            $('.details-container').on('click', function(e) {
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

                //---------------------------------------------
            }
        };
    });
