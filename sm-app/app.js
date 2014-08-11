angular.module('SherpaManager', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

angular.module('SherpaManager').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('welcome', {
        url: '/welcome',
        templateUrl: 'partials/welcome/welcome.html'
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/welcome');

});

angular.module('SherpaManager').run(function($rootScope) {

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
