angular.module('dellUiSite', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate']);

angular.module('dellUiSite').config(function($stateProvider) {

    $stateProvider.state('demo', {
        url: '/demo',
        templateUrl: 'app/demo/demo.html'
    });
    $stateProvider.state('alerts', {
        url: '/demo/alerts',
        templateUrl: 'app/demo-components/alerts/alerts.html'
    });
    $stateProvider.state('breadcrumbs', {
        url: '/demo/breadcrumbs',
        templateUrl: 'app/demo-components/breadcrumbs/breadcrumbs.html'
    });
    $stateProvider.state('buttons', {
        url: '/demo/buttons',
        templateUrl: 'app/demo-components/buttons/buttons.html'
    });
    $stateProvider.state('carousel', {
        url: '/demo/carousel',
        templateUrl: 'app/demo-components/carousel/carousel.html'
    });
    $stateProvider.state('collapsible-items', {
        url: '/demo/collapsible-items',
        templateUrl: 'app/demo-components/collapsible-items/collapsible-items.html'
    });
    $stateProvider.state('colors', {
        url: '/demo/colors',
        templateUrl: 'app/demo-components/colors/colors.html'
    });
    $stateProvider.state('containers', {
        url: '/demo/containers',
        templateUrl: 'app/demo-components/containers/containers.html'
    });
    $stateProvider.state('forms', {
        url: '/demo/forms',
        templateUrl: 'app/demo-components/forms/forms.html'
    });
    $stateProvider.state('modals', {
        url: '/demo/modals',
        templateUrl: 'app/demo-components/modals/modals.html'
    });
    $stateProvider.state('offsets', {
        url: '/demo/offsets',
        templateUrl: 'app/demo-components/offsets/offsets.html'
    });
    $stateProvider.state('pagers', {
        url: '/demo/pagers',
        templateUrl: 'app/demo-components/pagers/pagers.html'
    });
    $stateProvider.state('popovers', {
        url: '/demo/popovers',
        templateUrl: 'app/demo-components/popovers/popovers.html'
    });
    $stateProvider.state('progress-bars', {
        url: '/demo/progress-bars',
        templateUrl: 'app/demo-components/progress-bars/progress-bars.html'
    });
    $stateProvider.state('responsive-utilities', {
        url: '/demo/responsive-utilities',
        templateUrl: 'app/demo-components/responsive-utilities/responsive-utilities.html'
    });
    $stateProvider.state('tables', {
        url: '/demo/tables',
        templateUrl: 'app/demo-components/tables/tables.html'
    });
    $stateProvider.state('tabs', {
        url: '/demo/tabs',
        templateUrl: 'app/demo-components/tabs/tabs.html'
    });
    $stateProvider.state('typography', {
        url: '/demo/typography',
        templateUrl: 'app/demo-components/typography/typography.html'
    });

    $stateProvider.state('icons', {
        url: '/demo/icons',
        templateUrl: 'app/demo-components/icons/icons.html'
    });
    $stateProvider.state('labels-and-badges', {
        url: '/demo/labels-and-badges',
        templateUrl: 'app/demo-components/labels-and-badges/labels-and-badges.html'
    });
    $stateProvider.state('lists', {
        url: '/demo/lists',
        templateUrl: 'app/demo-components/lists/lists.html'
    });
    $stateProvider.state('tooltips', {
        url: '/demo/tooltips',
        templateUrl: 'app/demo-components/tooltips/tooltips.html'
    });
    $stateProvider.state('pagination', {
        url: '/demo/pagination',
        templateUrl: 'app/demo-components/pagination/pagination.html'
    });
    /* Add New States Above */

});

angular.module('dellUiSite').run(function($rootScope, utils) {

});
