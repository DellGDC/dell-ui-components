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
