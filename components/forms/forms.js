/**
 * Created by Clint_Batte on 3/24/2015.
 */
angular.module('dellUiComponents')

.directive('listTree', function () {
    return {
        restrict: 'C',
        link: function ($scope, $element, $attr) {
            $element.find('.checkbox input').on('click', function(){
                if($(this).is(':checked')) {    
                    $(this).parent().addClass('open');
                } else {
                    $(this).parent().removeClass('open');
                }
            });
        }
    };
});

//
//.directive('tree', function(){
//    $(function () {
//        $('.tree li:has(ul)').addClass('parent_li').find(' > input').attr('title', 'Collapse this branch');
//        $('.tree li.parent_li > input').on('click', function (e) {
//            var children = $(this).parent('li.parent_li').find(' > ul > li');
//            if (children.is(":visible")) {
//                children.hide('fast');
//                //$(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
//            } else {
//                children.show('fast');
//                //$(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
//            }
//            e.stopPropagation();
//        })
//    })
//});
//

//
//
//.directive('tree', function($timeout){
//    $(function () {
//        $('.tree li:has(ul)').addClass('parent_li').find(' > input').attr('title', 'Collapse this branch');
//        $('.tree li.parent_li > input').on('click', function (e) {
//            var children = $(this).parent('li.parent_li').find(' > ul > li');
//            if (children.is(":visible")) {
//                children.hide('fast');
//                //$(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
//            } else {
//                children.show('fast');
//                //$(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
//            }
//            e.stopPropagation();
//        })
//    })
