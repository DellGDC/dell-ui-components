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

                    //The does not work
                    //$element.find('content-gallery-details').slideDown( "slow");


                    var parentLi = $(e.currentTarget).parents('li')[0],
                        allListItems = $element.find('li'),
                        rowWidth= 0,
                        rowMaxWidth = Math.abs($('.container').css('width').replace(/px/,'')),
                        targetFound,
                        done,
                        //------------
                        content;


                    if ($(parentLi).hasClass('open')){
                        $element.find('li.details-container').attr('display', 'none').slideUp(350).delay(1000).queue(function() { $(this).remove(); });
                        $element.find('.open').removeClass('open');
                    } else {
                        $element.find('li.details-container').attr('display', 'none').slideUp(350).delay(1000).queue(function() { $(this).remove(); });
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
                                    console.log("item width", itemWidth, rowWidth, rowMaxWidth);

                                    if (rowWidth >= rowMaxWidth || index === allListItems.length -1) {

                                        if (targetFound) {
                                            console.log("Found target and inserting!!!");

                                            $(i).after('<li class="col-xs-12 details-container"><span class="close"><i class="icon-ui-close"></i></span>' + content + '</li>');

                                            $('.details-container').attr('display', 'block').slideDown(500);


                                            $('.details-container .close').on('click', function (e) {
                                                e.preventDefault();
                                                $element.find('li.details-container').attr('display', 'none').slideUp(350).delay(1000).queue(function() { $(this).remove(); });
                                                $element.find('.open').removeClass('open');
                                            });
                                            $('.details-container').on('click', function (e) {
                                                e.preventDefault();

                                                $element.find('li.details-container').attr('display', 'none').slideUp(350).delay(1000).queue(function() { $(this).remove(); });
                                                $element.find('.open').removeClass('open');
                                            });
                                            $('.content-gallery-show-more').on('click', function (e) {
                                                e.preventDefault();
                                                $element.find('li.details-container').attr('display', 'none').slideUp(350).delay(1000).queue(function() { $(this).remove(); });
                                                $element.find('.open').removeClass('open');
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

                //--------------------------------------------

                //$element.find('.content-gallery-show-more').on('click',function(e){
                //    e.preventDefault();
                //
                //    var parentLi = $(e.currentTarget).parents('li')[0],
                //        allListItems = $element.find('li'),
                //        rowWidth= 0,
                //        rowMaxWidth = Math.abs($('.container').css('width').replace(/px/,'')),
                //        targetFound,
                //        done,
                //    //------------
                //        content;
                //
                //
                //    if ($(parentLi).hasClass('open')){
                //        $element.find('.open').removeClass('open');
                //        $element.find('li.details-container').slideUp( "slow");
                //    } else {
                //        $element.find('.open').removeClass('open');
                //        $element.find('li.details-container').slideUp("slow");
                //
                //        $timeout( function() {
                //
                //            $(parentLi).addClass('open');
                //            _.each(allListItems, function (i, index) {
                //                if (!done) {
                //                    var itemWidth = Math.abs(($(i).css('width')).replace(/px/, ''));
                //                    if (!targetFound) {
                //                        targetFound = $(i).hasClass('open');
                //                        content = $(i).find('.content-gallery-details').html();
                //                    }
                //
                //                    rowWidth = rowWidth + itemWidth;
                //                    console.log("item width", itemWidth, rowWidth, rowMaxWidth);
                //
                //                    if (rowWidth >= rowMaxWidth || index === allListItems.length -1) {
                //
                //                        if (targetFound) {
                //                            console.log("Found target and inserting!!!");
                //
                //                            $(i).after('<li class="col-xs-12 details-container"><span class="close"><i class="icon-ui-close"></i></span>' + content + '</li>');
                //                            $('.details-container .close').on('click', function (e) {
                //                                e.preventDefault();
                //                                $element.find('.open').removeClass('open');
                //                                $element.find('li.details-container').slideUp( "slow");
                //                            });
                //                            $('.details-container').on('click', function (e) {
                //                                e.preventDefault();
                //                                $element.find('.open').removeClass('open');
                //                                $element.find('li.details-container').slideUp( "slow");
                //                            });
                //                            $('.content-gallery-show-more').on('click', function (e) {
                //                                e.preventDefault();
                //                                $element.find('.open').removeClass('open');
                //                                $element.find('li.details-container').slideUp( "slow");
                //                            });
                //                            done = true;
                //                        } else {
                //                            rowWidth = 0;
                //                        }
                //                    }
                //                }
                //            });
                //        }, 100);
                //    }
                //
                //});



                //---------------------------------------------
                console.log('++++++++++++++++++++ It Fired',$scope, $element, iAttrs, controller );
            }
        };
    });
