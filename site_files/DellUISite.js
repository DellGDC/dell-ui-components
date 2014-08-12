console.log("DellUISite")

angular.module('DellUISite', ['ui.bootstrap','ui.utils','ui.router','DellUI', 'ngAnimate']);

angular.module('DellUISite').config(function($stateProvider) {

    $stateProvider.state('welcome', {
        url: '/welcome',
        templateUrl: 'site_files/welcome/welcome.html'
    });
    /* Add New States Above */

});

