angular.module('dellUiComponents').directive('tabs', function() {
	return {
		restrict: 'A',
		link: function($scope, element, attrs,  $state, $timeout, fn) {

            //$scope.initVanishingHeader = function() {
            //    var lastScrollTop = 0;
            //    $(window).scroll(function(event){
            //        var st = $(this).scrollTop();
            //        if (st > lastScrollTop){
            //            $timeout(function(){
            //                $(element).find('.tab-pane-offcanvas').addClass('affix');
            //            },100);
            //        } else {
            //            $('.tab-pane-offcanvas').removeClass('affix');
            //        }
            //        lastScrollTop = st;
            //    });
            //};

		}
	};
});

