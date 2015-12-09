
angular.module('demo').controller('productStackCtrl',function($scope,$rootScope) {
	//this is for functionality related to demo code

    $('input[type="checkbox"]').on('click', function () {
            if ($(this).is(':checked')) {
                $(".compare-default").hide();
                $(".compare-active").removeClass('hide').addClass('show');
            } else {
                $(".compare-default").show();
                $(".compare-active").removeClass('show').addClass('hide');
            }
        });

});

angular.module('demo').controller('productStackPLayDemoCtrl',function($scope,$rootScope,$sce) {
	//this is for functionality related to play demo code

});
