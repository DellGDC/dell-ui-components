angular.module('DellDesignLibrary', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'DellUI', 'DellUISite']);

angular.module('DellDesignLibrary').config(function($stateProvider, $urlRouterProvider) {


    /* Add New States Above */
    $urlRouterProvider.otherwise('/welcome');

});

angular.module('DellDesignLibrary').run(function($rootScope) {

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


});
