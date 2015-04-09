/* globals s */
angular.module('demo', ['ui.utils', 'ui.router', 'ngAnimate', 'dellUiComponents', 'ui.grid']);

angular.module('demo').config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('demo', {
        url: '/:typeId/:componentId',
        templateUrl: 'demo-assets/partials/home/home.html'
    });


    /* Add New States Above */
    $urlRouterProvider.otherwise('/demo/');

});

angular.module('demo').run(function($rootScope) {

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
    _.str = s;

});
