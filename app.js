angular.module('dellUi', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'dellUiSite', 'dellUiTheme', 'dellUiTest']);

angular.module('dellUi').config(function($stateProvider, $urlRouterProvider) {


    /* Add New States Above */
    $urlRouterProvider.otherwise('/demo');

});

angular.module('dellUi').run(function($rootScope) {

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
