/**
 * Created by Clint_Batte on 5/18/2015.
 */


angular.module('dellUiComponents')

    .directive('anchoredNavAffixed', function($timeout) {
        return {
            restrict: 'C',
            link: function ($scope, $element, iAttrs, controller) {
                $('.anchored-nav-affixed').affix({
                });

            }
        };

    });

    //.directive('anchoredNavScrollspy', function($timeout) {
    //    return {
    //        restrict: 'C',
    //        link: function ($scope, $element, iAttrs, controller) {
    //            $(document).ready(function (){
    //                $('body').scrollspy({ target: 'anchored-nav-scrollspy' });
    //            });
    //
    //        }
    //    };
    //
    //});





