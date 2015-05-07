
angular.module('demo').controller('paginationCtrl',function($scope, $rootScope, $timeout) {
	//this is for functionality related to demo code
    $('.pagination').jqPagination({
        paged: function(page) {
        }
    });

});

angular.module('demo').controller('paginationPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});
