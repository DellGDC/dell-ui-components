
angular.module('demo').controller('paginationCtrl',function($scope, $rootScope, $timeout) {
	//this is for functionality related to demo code
    $('.pagination').jqPagination({
        paged: function(page) {
        }
    });


    //
    //$(document).ready(function () {
    //
    //    $('.news-pagination li').slice(5).hide();
    //
    //    $('#loadmore').jqPagination({
    //        max_page: Math.ceil($('.news-pagination li').length / 5),
    //        paged: function (page) {
    //            $('.news-pagination li').hide();
    //            $('.news-pagination li').slice((page - 1) * 5, (page * 5)).fadeIn('slow');
    //        }
    //    });
    //});





});

angular.module('demo').controller('paginationPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});
