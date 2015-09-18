/* globals s */
angular.module('demo', ['ui.utils', 'ui.router', 'ngAnimate', 'dellUiComponents']);

angular.module('demo').config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('demo', {
        url: '/:typeId/:componentId',
        templateUrl: 'demo-assets/partials/home/home.html'
    });


    /* Add New States Above */
    $urlRouterProvider.otherwise('/demo/');

});

angular.module('demo').run(function($rootScope) {
    _.str = s;
});
