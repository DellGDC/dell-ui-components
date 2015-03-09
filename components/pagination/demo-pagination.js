
angular.module('demo').controller('paginationCtrl',function($scope,$rootScope) {
	//this is for functionality related to demo code
    $('.pagination').jqPagination({
        paged: function(page) {
            // do something with the page variable
        }
    });

    //
    //$scope.loadingButtonInit = function () {
    //    $('#loading-example-btn').click(function () {
    //        var btn = $(this);
    //        btn.button('loading');
    //        window.setTimeout(function () {
    //            btn.button('reset');
    //        }, 2000);
    //    });
    //};

    $scope.loadingButtonAction = function () {
        event.preventDefault();
        var btn = $(event.currentTarget);
        btn.button('loading');
        $timeout(function () {
            btn.button('reset');
        }, 2000);
    };

});

angular.module('demo').controller('paginationPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});
