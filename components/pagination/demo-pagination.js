
angular.module('demo').controller('paginationCtrl',function($scope,$rootScope) {
	//this is for functionality related to demo code
    $('.pagination').jqPagination({
        paged: function(page) {
            // do something with the page variable
        }
    });

});

angular.module('demo').controller('paginationPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});
