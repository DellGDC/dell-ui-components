angular.module('dellUiTest', ['ui.bootstrap','ui.utils','ui.router','ngAnimate','dellUiSite']);

angular.module('dellUiTest').config(function($stateProvider) {


    $stateProvider.state('test-page', {
        url: '/test-page',
        templateUrl: 'app/dell-ui-test/test-page/test-page.html'
    });
    /* Add New States Above */

});



