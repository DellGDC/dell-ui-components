//angular.module('dellUiComponents').directive('responsiveTable', function($timeout){
//    // Runs during compile
//    return {
//        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
//        link: function($scope, $element, $attrs, controller) {
//            var selector = $attrs.responsiveTable;
//            if(selector) {
//                $timeout(function(){
//                    $(selector).rtResponsiveTables();
//                },300);
//            } else {
//                console.error('responsive-table usage error. Must include css selector to identify objects to equalize. Example: responsive-table=".classname"');
//            }
//        }
//    };
//});
//
//
////$("table").rtResponsiveTables({
////    containerBreakPoint: 300
////});
