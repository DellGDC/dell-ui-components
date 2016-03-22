/**
 * Created by Clint_Batte on 5/7/2015.
 */
angular.module('dellUiComponents')

    .directive('tapToLoad', function() {
        return {
            restrict: 'C',
            link: function($scope, $element, attrs ) {

                $(document).ready(function () {

                    $('.news-pagination li').slice(5).hide();

                    $('#loadmore').jqPagination({
                        max_page: Math.ceil($('.news-pagination li').length / 5),
                        paged: function (page) {
                            $('.news-pagination li').hide();
                            $('.news-pagination li').slice((page - 1) * 5, (page * 5)).fadeIn('slow');
                        }
                    });
                });

            }
        };
    })

    .directive('pagination', function() {
        return {
            restrict: 'C',
            link: function($scope, $element, attrs ) {

                $('.pagination').jqPagination({
                    paged: function(page) {
                    }
                });
            }
        };
    })

    .directive('lazyLoad', function() {
     return {
         restrict: 'C',
         link: function($scope, $element, attrs ) {
             $(document).ready(function () {
                 //Set intital divs to be hidden
                 $(".lazy-load-content").addClass("hidden");
                 var contentNumber = 0;
                 var i = 0;
                 
                 console.log('doing lazy stuff');
                 function reveal() {
                     var constraintNumber = contentNumber + 5;
                     //IMPORTANT - DO NOT DELETE
                     $(window).trigger('resize');
                     //IMPORTANT - DO NOT DELETE
                     for (i = contentNumber; i < constraintNumber; i++) {
                         //Get the nth div of class content, where n is the contentNumber, and make it shown
                         $('.lazy-load-content').eq(contentNumber).removeClass("hidden").delay(2000).fadeIn('slow');
                         contentNumber ++;
                     }
                 }

                 //Window scroll function
                 $('.viewing-window').scroll(function() {
                    if ($('.viewing-window').scrollTop() === $('.large-viewing-window').height() - $('.lazyload').height() )
                     {
                         reveal();
                     }
                 });
                 reveal();
             });
         }
     };
    });


