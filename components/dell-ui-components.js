angular.module('dellUiComponents', []);

angular.module('dellUiComponents')
	.config(function() {})
	.run(function($rootScope) {

	    $rootScope.safeApply = function(fn) {
	        var phase = $rootScope.$$phase;
	        if (phase === '$apply' || phase === '$digest') {
	            if (fn && (typeof(fn) === 'function')) {
	                fn();
	            }
	        } else {
	            this.$apply(fn);
	        }
	    };

		function calculateBreakPointStatus() {
        	var window_size = $(window).width();
			$rootScope.bp = {
				isXS: false, 
				isSM: false, 
				isMD: false, 
				isLG: false
			};        
            switch(true) {
            	case (window_size < 750):
            		$rootScope.bp.isXS = true;
            		break;
            	case (window_size > 751 && window_size < 975):
            		$rootScope.bp.isSM = true;
            		break;
            	case (window_size > 974 && window_size < 1141):
            		$rootScope.bp.isMD = true;
            		break;
            	default:
            		$rootScope.bp.isLG = true;
            		break;
            }
    	}
    	calculateBreakPointStatus();
	    $(window).resize(function () {
	        calculateBreakPointStatus();
	        $rootScope.safeApply();
	    });
	});

