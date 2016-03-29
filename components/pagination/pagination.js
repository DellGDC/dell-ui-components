angular.module('dellUiComponents')
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
.directive('loadMore', function() {
    return {
        restrict: 'C',
        link: function($scope, $element, attrs ) {
            var options = {
                lazyLoad: typeof attrs.lazyLoad !== 'undefined' ? attrs.lazyLoad === "true" : false,
                scrollTarget: typeof attrs.scrollTarget !== 'undefined' ? attrs.scrollTarget : window,
                fadeIn: typeof attrs.fadeIn !== 'undefined' ? attrs.fadeIn === "true" : true,
                loadMoreButtonText: typeof attrs.loadMoreButtonText !== 'undefined' ? attrs.loadMoreButtonText : "Load more",
                loadMoreIncrement: typeof attrs.loadMoreIncrement !== 'undefined' ? parseInt(attrs.loadMoreIncrement) : 5,
            };
            $element.dellUIloadMore(options);
        }
    };
});

<<<<<<< Updated upstream
=======
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
                 $element.addClass("hidden");
                 var contentNumber = 0;
                 var i = 0;
                 console.log('doing lazy stuff');
                 function reveal() {
                     var constraintNumber = contentNumber + 2;
                     //IMPORTANT - DO NOT DELETE
                     $(window).trigger('resize');
                     //IMPORTANT - DO NOT DELETE
                     for (i = contentNumber; i < constraintNumber; i++) {
                         //Get the nth div of class content, where n is the contentNumber, and make it shown
                         $element.eq(contentNumber).removeClass("hidden");
                         contentNumber ++;
                     }
                 }

                 //Window scroll function
                 $(window).scroll(function() {
                    if ($(window).scrollTop() === $(document).height() - $(window).height() )
                     {
                         reveal();
                     }
                 });
                 reveal();
             });
         }
     };
>>>>>>> Stashed changes
