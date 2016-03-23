/**
 * Created by Clint_Batte on 5/7/2015.
 */












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
    })

    .directive('lazyLoad', function() {
     return {
         restrict: 'C',
         link: function($scope, $element, attrs ) {
             $(document).ready(function () {
                 //Set intital divs to be hidden
                 $element.find('.lazy-load-content').addClass("hidden");
                 var contentNumber = 0;
                 // var i = 0;
                 
                 // console.log('doing lazy stuff');
                 function reveal() {
                     var constraintNumber = contentNumber + 5;
                     //IMPORTANT - DO NOT DELETE
                     $('.viewing-window').trigger('resize');
                     //IMPORTANT - DO NOT DELETE
                     for (i = contentNumber; i < constraintNumber; i++) {
                         //Get the nth div of class content, where n is the contentNumber, and make it shown
                         $element.find('.lazy-load-content').eq(contentNumber).removeClass("hidden");
                         contentNumber ++;

                         
                     }
                 }

                 //Window scroll function
                 $('.viewing-window').scroll(function() {
                    if ($('.viewing-window').scrollTop() >= $('.large-viewing-window').height() - $('.lazyload').height() - 1 )
                     {
                         reveal();
                     }
                 });
                 reveal();
             });
         }
     };
    });


