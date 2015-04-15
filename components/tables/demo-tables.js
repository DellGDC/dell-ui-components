
angular.module('demo').controller('tablesCtrl',function($scope,$rootScope,uiGridConstants) {
	//this is for functionality related to demo code

$("thead tr th").click(function(){
    alert ($(this).html());
});


});

angular.module('demo').controller('tablesPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});
