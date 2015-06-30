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


    .directive('loadMore', function() {
        return {
            restrict: 'C',
            link: function($scope, $element, attrs ) {
                var size_li = $element("li").size();
                var x = 3;
                $element('li:lt('+x+')').show();
                $element('#loadMore').click(function () {
                    x= (x+5 <= size_li) ? x+5 : size_li;
                    $element('li:lt('+x+')').show();
                });
                $('#showLess').click(function () {
                    x=(x-5<0) ? 3 : x-5;
                    $element('li').not(':lt('+x+')').hide();
                });
            }
        };
    });
