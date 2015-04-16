
angular.module('demo').controller('tablesCtrl',function($scope,$rootScope,uiGridConstants) {
	//this is for functionality related to demo code

$(document).on('click', 'tr', function (){
    alert($(this).data("index")+1);
});


});

angular.module('demo').controller('tablesPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});
