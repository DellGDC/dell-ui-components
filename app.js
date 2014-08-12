angular.module('DellDesignLibrary', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

angular.module('DellDesignLibrary').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('welcome', {
        url: '/welcome',
        templateUrl: 'site_files/welcome/welcome.html'
    });
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
